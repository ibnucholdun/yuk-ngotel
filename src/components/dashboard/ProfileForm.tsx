"use client";

import { updateProfile } from "@/actions/profile";
import Image from "next/image";
import { useActionState, useState, useRef, useEffect } from "react";
import { FaCamera, FaSpinner } from "react-icons/fa";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  phone?: string | null;
  role?: string | null;
}

export default function ProfileForm({ user }: { user: User }) {
  const [state, action, isPending] = useActionState(updateProfile, null);
  const [preview, setPreview] = useState<string | null>(user.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (state?.success && state.user && session?.user) {
      // Only update if the session data is actually different
      if (
        session.user.name !== state.user.name ||
        session.user.image !== state.user.image
      ) {
        update({
          name: state.user.name,
          image: state.user.image,
        });
        router.refresh();
      }
    }
  }, [state, session, update, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  return (
    <form action={action} className="space-y-6">
      <div className="flex items-center gap-6 mb-8">
        <div className="relative w-24 h-24 group">
          <Image
            src={preview || "/avatar.svg"}
            alt="Profile"
            fill
            className="rounded-full object-cover border-4 border-gray-50"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-white"
          >
            <FaCamera size={24} />
          </button>
          <input
            type="file"
            name="image"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full uppercase">
            {user.role}
          </span>
        </div>
      </div>

      {state?.message && (
        <div className="bg-red-100 text-red-600 p-3 rounded-md text-sm">
          {state.message}
        </div>
      )}
      {state?.success && (
        <div className="bg-green-100 text-green-600 p-3 rounded-md text-sm">
          {state.success}
        </div>
      )}

      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={user.name || ""}
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {state?.errors?.name && (
            <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={user.email || ""}
            disabled
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">Email cannot be changed.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            defaultValue={user.phone || ""}
            placeholder="+62..."
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {state?.errors?.phone && (
            <p className="text-red-500 text-sm mt-1">{state.errors.phone[0]}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isPending && <FaSpinner className="animate-spin" />}
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
