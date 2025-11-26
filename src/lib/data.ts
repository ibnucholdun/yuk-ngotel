import { auth } from "../../auth";
import { prisma } from "./prisma";

export const getAmenities = async () => {
  const session = await auth();

  if (!session || !session.user) throw new Error("Unauthorized");

  try {
    const result = await prisma.amenities.findMany();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRooms = async () => {
  try {
    const result = await prisma.room.findMany({
      orderBy: { createdAt: "desc" },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRoomById = async (roomId: string) => {
  try {
    const result = await prisma.room.findUnique({
      where: { id: roomId },
      include: { RoomAmenities: { select: { amenitiesId: true } } },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRoomDetailById = async (roomId: string) => {
  try {
    const result = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        RoomAmenities: {
          include: {
            Amenities: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getReservationById = async (reservationId: string) => {
  try {
    const result = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: {
        Room: {
          select: {
            name: true,
            image: true,
            price: true,
          },
        },
        User: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        payments: true,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getDisabledRoomById = async (roomId: string) => {
  try {
    const result = await prisma.reservation.findMany({
      select: {
        startDate: true,
        endDate: true,
      },
      where: {
        roomId: roomId,
        payments: { status: { not: "failure" } },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const getReservationByUserId = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id)
    throw new Error("Unauthorized");

  try {
    const result = await prisma.reservation.findMany({
      where: { userId: session.user.id },
      include: {
        Room: {
          select: {
            name: true,
            image: true,
            price: true,
          },
        },
        User: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        payments: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
