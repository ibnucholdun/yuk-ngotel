import { array, coerce, object, string } from "zod";

export const ContactSchema = object({
  name: string().min(6, "Name at least 6 characters"),
  email: string().min(6, "Email at least 6 characters").email("Invalid email"),
  subject: string().min(6, "Subject at least 6 characters"),
  message: string()
    .min(50, "Message at least 50 characters")
    .max(200, "Message at most 200 characters"),
});

export const RoomSchema = object({
  name: string().min(1),
  description: string().min(50),
  capacity: coerce.number().gt(0),
  price: coerce.number().gt(0),
  amenities: array(string()).nonempty(),
});

export const ReservationSchema = object({
  guests: coerce.number().min(1).int(),
});

export const RegisterSchema = object({
  name: string().min(1, "Name is required"),
  email: string().email("Invalid email address"),
  password: string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const ProfileSchema = object({
  name: string().min(1, "Name is required"),
  phone: string().optional().nullable(),
});

export const ResetSchema = object({
  email: string().email("Email is required"),
});

export const NewPasswordSchema = object({
  password: string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const NewsletterSchema = object({
  email: string().email("Invalid email address"),
});
