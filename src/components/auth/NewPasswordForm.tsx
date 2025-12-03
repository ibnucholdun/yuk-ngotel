"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa";

import { NewPasswordSchema } from "@/lib/zod";
import { newPassword } from "@/actions/new-password";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Enter new password
      </h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                {...form.register("password")}
                disabled={isPending}
                placeholder="******"
                type={showPassword ? "text" : "password"}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                {...form.register("confirmPassword")}
                disabled={isPending}
                placeholder="******"
                type={showConfirmPassword ? "text" : "password"}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {form.formState.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-2 space-y-1">
          <div
            className={`flex items-center text-xs ${
              form.watch("password")?.length >= 8
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {form.watch("password")?.length >= 8 ? (
              <FaCheck className="mr-1" />
            ) : (
              <FaTimes className="mr-1" />
            )}
            At least 8 characters
          </div>
          <div
            className={`flex items-center text-xs ${
              /[A-Z]/.test(form.watch("password") || "")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {/[A-Z]/.test(form.watch("password") || "") ? (
              <FaCheck className="mr-1" />
            ) : (
              <FaTimes className="mr-1" />
            )}
            At least one uppercase letter
          </div>
          <div
            className={`flex items-center text-xs ${
              /[!@#$%^&*(),.?":{}|<>]/.test(form.watch("password") || "")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {/[!@#$%^&*(),.?":{}|<>]/.test(form.watch("password") || "") ? (
              <FaCheck className="mr-1" />
            ) : (
              <FaTimes className="mr-1" />
            )}
            At least one special character
          </div>
        </div>
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-600 p-3 rounded-md text-sm">
            {success}
          </div>
        )}
        <button
          disabled={isPending}
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
        >
          {isPending ? "Resetting password..." : "Reset password"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link
          href="/sign-in"
          className="text-sm text-orange-600 hover:underline"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
};
