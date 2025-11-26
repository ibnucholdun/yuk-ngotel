import { Prisma } from "@prisma/client";

export type ReservationProps = Prisma.ReservationGetPayload<{
  include: {
    Room: {
      select: {
        name: true;
        image: true;
        price: true;
      };
    };
    User: {
      select: {
        name: true;
        email: true;
        phone: true;
      };
    };
    payments: true;
  };
}>;
