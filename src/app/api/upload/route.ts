import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const PUT = async (request: Request) => {
  const form = await request.formData();
  const file = form.get("file") as File;

  if (file.size === 0 || file.size === undefined) {
    return NextResponse.json({ message: "File is Required" }, { status: 400 });
  }

  if (file.size > 4000000) {
    return NextResponse.json({ message: "File is too large" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { message: "File is not an image" },
      { status: 400 }
    );
  }

  const filename = `room-image/${uuidv4()}-${file.name}`;
  const blob = await put(filename, file, {
    access: "public",
    multipart: true,
  });

  return NextResponse.json(blob);
};

export const DELETE = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("imageUrl") as string;
  await del(imageUrl);
  return NextResponse.json({ status: 200 });
};
