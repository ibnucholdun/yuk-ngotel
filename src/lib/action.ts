"use server";

import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import {
  ContactSchema,
  NewsletterSchema,
  ReservationSchema,
  RoomSchema,
} from "./zod";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "../../auth";
import { differenceInCalendarDays } from "date-fns";

export const ContactMessage = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = ContactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };

  const { name, email, subject, message } = validatedFields.data;

  try {
    await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    return {
      success: true,
      message: "Thank you for your message. We will get back to you soon.",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong. Please try again later.",
    };
  }
};

export const saveRoom = async (
  image: string,
  prevState: unknown,
  formData: FormData
) => {
  if (!image) return { message: "Image is required" };

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    price: formData.get("price"),
    amenities: formData.getAll("amenities"),
  };

  const validatedFields = RoomSchema.safeParse(rawData);
  if (!validatedFields.success)
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };

  const { name, description, capacity, price, amenities } =
    validatedFields.data;

  try {
    await prisma.room.create({
      data: {
        name,
        description,
        image,
        price,
        capacity,
        RoomAmenities: {
          createMany: {
            data: amenities.map((item) => ({ amenitiesId: item })),
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }

  redirect("/admin/dashboard/rooms");
};

// Delete Room
export const deleteRoom = async (id: string, image: string) => {
  try {
    await del(image);
    await prisma.room.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/admin/dashboard/rooms");
};

// update Room
export const updateRoom = async (
  image: string,
  roomId: string,
  prevState: unknown,
  formData: FormData
) => {
  if (!image) return { message: "Image is required" };

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    price: formData.get("price"),
    amenities: formData.getAll("amenities"),
  };

  const validatedFields = RoomSchema.safeParse(rawData);
  if (!validatedFields.success)
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };

  const { name, description, capacity, price, amenities } =
    validatedFields.data;

  try {
    await prisma.$transaction([
      prisma.room.update({
        where: { id: roomId },
        data: {
          name,
          description,
          image,
          price,
          capacity,
          RoomAmenities: {
            deleteMany: {},
          },
        },
      }),
      prisma.roomAmenities.createMany({
        data: amenities.map((item) => ({ amenitiesId: item, roomId })),
      }),
    ]);
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/admin/dashboard/rooms");
  redirect("/admin/dashboard/rooms");
};

// createREservation
export const createReservation = async (
  roomId: string,
  price: number,
  startDate: Date,
  endDate: Date,
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();
  if (!session || !session.user || !session.user.id)
    redirect(`/sign-in?callbackUrl=rooms/${roomId}`);

  const rawData = {
    guests: formData.get("guests"),
  };

  const validatedFields = ReservationSchema.safeParse(rawData);
  if (!validatedFields.success)
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };

  const { guests } = validatedFields.data;

  const room = await prisma.room.findUnique({
    where: { id: roomId },
    select: { capacity: true },
  });

  if (!room) return { messageDate: "Room not found" };
  if (guests > room.capacity) {
    return {
      error: {
        guests: [`Max guests allowed is ${room.capacity}`],
      },
    };
  }

  const night = differenceInCalendarDays(endDate, startDate);
  if (night <= 0) return { messageDate: "Date must be at least 1 night" };

  const total = price * night;

  let reservationId: string | null = null;
  try {
    await prisma.$transaction(async (tx) => {
      const reservation = await tx.reservation.create({
        data: {
          startDate,
          endDate,
          price,
          roomId,
          guests,
          userId: session.user.id as string,
          payments: {
            create: {
              amount: total,
            },
          },
        },
      });

      reservationId = reservation.id;
    });
  } catch (error) {
    console.log(error);
  }

  redirect(`/checkout/${reservationId}`);
};

export const subscribeNewsletter = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = NewsletterSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email } = validatedFields.data;

  try {
    await prisma.subscriber.create({
      data: {
        email,
      },
    });

    return {
      success: true,
      message: "Thank you for subscribing!",
    };
  } catch (error) {
    // Check for unique constraint violation (P2002)
    if ((error as any).code === "P2002") {
      return {
        error: {
          email: ["You are already subscribed."],
        },
      };
    }
    console.log(error);
    return {
      error: {
        email: ["Something went wrong. Please try again."],
      },
    };
  }
};

// Delete Contact
export const deleteContact = async (id: string) => {
  try {
    await prisma.contact.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/admin/dashboard/contact");
};

// Delete Subscriber
export const deleteSubscriber = async (id: string) => {
  try {
    await prisma.subscriber.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/admin/dashboard/subscribers");
};
