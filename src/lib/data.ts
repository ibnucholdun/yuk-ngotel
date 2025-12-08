import { redirect } from "next/navigation";
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

export const getAllAmenities = async () => {
  try {
    const result = await prisma.amenities.findMany();
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getRooms = async ({
  page = 1,
  limit,
}: {
  page?: number;
  limit?: number;
} = {}) => {
  try {
    if (!limit) {
      const result = await prisma.room.findMany({
        orderBy: { createdAt: "desc" },
      });
      return { rooms: result, total: result.length };
    }

    const [result, total] = await prisma.$transaction([
      prisma.room.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: (page - 1) * limit,
      }),
      prisma.room.count(),
    ]);

    return { rooms: result, total };
  } catch (error) {
    console.log(error);
    return { rooms: [], total: 0 };
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

export const getRevenueAndReservation = async () => {
  const session = await auth();
  if (
    !session ||
    !session.user ||
    !session.user.id ||
    session.user.role !== "admin"
  )
    redirect("/");

  try {
    const result = await prisma.reservation.aggregate({
      _count: true,
      _sum: { price: true },
      where: {
        payments: { status: { not: "failure" } },
      },
    });
    return {
      revenue: result._sum.price || 0,
      reservation: result._count,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getTotalCustomers = async () => {
  const session = await auth();
  if (
    !session ||
    !session.user ||
    !session.user.id ||
    session.user.role !== "admin"
  )
    redirect("/");
  try {
    const result = await prisma.reservation.findMany({
      distinct: ["userId"],
      where: {
        payments: { status: { not: "failure" } },
      },
      select: {
        userId: true,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getReservations = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
} = {}) => {
  const session = await auth();

  if (
    !session ||
    !session.user ||
    !session.user.id ||
    session.user.role !== "admin"
  )
    redirect("/");

  try {
    const skip = (page - 1) * limit;
    const [reservations, total] = await prisma.$transaction([
      prisma.reservation.findMany({
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
        take: limit,
        skip: skip,
      }),
      prisma.reservation.count(),
    ]);

    return { reservations, total };
  } catch (error) {
    console.log(error);
    return { reservations: [], total: 0 };
  }
};

export const getSimilarRooms = async (roomId: string) => {
  try {
    const currentRoom = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!currentRoom) return [];

    const result = await prisma.room.findMany({
      where: {
        id: { not: roomId },
        OR: [
          { capacity: currentRoom.capacity },
          {
            price: {
              gte: currentRoom.price * 0.7,
              lte: currentRoom.price * 1.3,
            },
          },
        ],
      },
      take: 3,
      orderBy: {
        price: "asc",
      },
    });

    if (result.length < 3) {
      const additionalRooms = await prisma.room.findMany({
        where: {
          id: { notIn: [roomId, ...result.map((r) => r.id)] },
        },
        take: 3 - result.length,
        orderBy: { createdAt: "desc" },
      });
      return [...result, ...additionalRooms];
    }

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getUserPhone = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { phone: true },
    });
    return user?.phone;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getContacts = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
} = {}) => {
  const session = await auth();
  if (
    !session ||
    !session.user ||
    !session.user.id ||
    session.user.role !== "admin"
  )
    redirect("/");

  try {
    const skip = (page - 1) * limit;
    const [contacts, total] = await prisma.$transaction([
      prisma.contact.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: skip,
      }),
      prisma.contact.count(),
    ]);

    return { contacts, total };
  } catch (error) {
    console.log(error);
    return { contacts: [], total: 0 };
  }
};

export const getSubscribers = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
} = {}) => {
  const session = await auth();
  if (
    !session ||
    !session.user ||
    !session.user.id ||
    session.user.role !== "admin"
  )
    redirect("/");

  try {
    const skip = (page - 1) * limit;
    const [subscribers, total] = await prisma.$transaction([
      prisma.subscriber.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: skip,
      }),
      prisma.subscriber.count(),
    ]);

    return { subscribers, total };
  } catch (error) {
    console.log(error);
    return { subscribers: [], total: 0 };
  }
};

export const getUsers = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
} = {}) => {
  const session = await auth();
  if (
    !session ||
    !session.user ||
    !session.user.id ||
    session.user.role !== "admin"
  )
    redirect("/");

  try {
    const skip = (page - 1) * limit;
    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: skip,
      }),
      prisma.user.count(),
    ]);

    return { users, total };
  } catch (error) {
    console.log(error);
    return { users: [], total: 0 };
  }
};
