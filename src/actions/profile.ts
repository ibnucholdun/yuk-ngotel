"use server";

import { auth } from "../../auth";
import { prisma } from "@/lib/prisma";
import { ProfileSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";

export async function updateProfile(prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return { message: "Unauthorized" };
  }

  const validatedFields = ProfileSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, phone } = validatedFields.data;
  const imageFile = formData.get("image") as File;

  // Fetch latest user data from DB to ensure we have the current image
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  const currentImage = dbUser?.image;
  let newImage = currentImage;

  try {
    if (imageFile && imageFile.size > 0) {
      if (process.env.BLOB_READ_WRITE_TOKEN) {
        // Delete old image ONLY if it exists and is a Vercel Blob URL
        if (
          currentImage &&
          currentImage.includes("public.blob.vercel-storage.com")
        ) {
          try {
            await del(currentImage);
          } catch (error) {
            console.warn("Failed to delete old image:", error);
          }
        }

        const filename = `photo-profile/${session.user.id}-${uuidv4()}-${
          imageFile.name
        }`;
        const blob = await put(filename, imageFile, {
          access: "public",
        });
        newImage = blob.url;
      } else {
        console.warn("BLOB_READ_WRITE_TOKEN not found, skipping image upload");
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        phone,
        image: newImage,
      },
    });

    revalidatePath("/my-dashboard/profile");
    return { success: "Profile updated successfully!", user: updatedUser };
  } catch (error) {
    console.error("Profile update error:", error);
    return { message: "Failed to update profile" };
  }
}
