"use client";

import { register } from "@/actions/register";
import Link from "next/link";
import { useActionState, useState } from "react";
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa";
import { RegisterSchema } from "@/lib/zod";

export default function RegisterForm() {
  const [state, action, isPending] = useActionState(register, null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [clientErrors, setClientErrors] = useState<{
    password?: string[];
    confirmPassword?: string[];
  }>({});

  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    hasUppercase: false,
    hasSpecialChar: false,
  });

  const validatePassword = (pass: string) => {
    const result = RegisterSchema.shape.password.safeParse(pass);

    // Update criteria state
    setPasswordCriteria({
      minLength: pass.length >= 8,
      hasUppercase: /[A-Z]/.test(pass),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
    });

    if (!result.success) {
      setClientErrors((prev) => ({
        ...prev,
        password: result.error.flatten().formErrors,
      }));
    } else {
      setClientErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  const validateConfirmPassword = (confirm: string, pass: string) => {
    if (confirm !== pass) {
      setClientErrors((prev) => ({
        ...prev,
        confirmPassword: ["Passwords don't match"],
      }));
    } else {
      setClientErrors((prev) => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    validatePassword(val);
    if (confirmPassword) validateConfirmPassword(confirmPassword, val);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value;
    setConfirmPassword(val);
    validateConfirmPassword(val, password);
  };

  return (
    <form action={action} className="space-y-4">
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
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        />
        {state?.errors?.name && (
          <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        />
        {state?.errors?.email && (
          <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="mt-2 space-y-1">
          <div
            className={`flex items-center text-xs ${
              passwordCriteria.minLength ? "text-green-600" : "text-red-500"
            }`}
          >
            {passwordCriteria.minLength ? (
              <FaCheck className="mr-1" />
            ) : (
              <FaTimes className="mr-1" />
            )}
            At least 8 characters
          </div>
          <div
            className={`flex items-center text-xs ${
              passwordCriteria.hasUppercase ? "text-green-600" : "text-red-500"
            }`}
          >
            {passwordCriteria.hasUppercase ? (
              <FaCheck className="mr-1" />
            ) : (
              <FaTimes className="mr-1" />
            )}
            At least one uppercase letter
          </div>
          <div
            className={`flex items-center text-xs ${
              passwordCriteria.hasSpecialChar
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {passwordCriteria.hasSpecialChar ? (
              <FaCheck className="mr-1" />
            ) : (
              <FaTimes className="mr-1" />
            )}
            At least one special character
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {(clientErrors.confirmPassword || state?.errors?.confirmPassword) && (
          <p className="text-red-500 text-sm mt-1">
            {clientErrors.confirmPassword?.[0] ||
              state?.errors?.confirmPassword?.[0]}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={
          isPending || !!clientErrors.password || !!clientErrors.confirmPassword
        }
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
      >
        {isPending ? "Creating account..." : "Sign Up"}
      </button>
      <div className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-orange-600 hover:text-orange-500">
          Sign In
        </Link>
      </div>
    </form>
  );
}
