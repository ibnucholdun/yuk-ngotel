"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { BeatLoader } from "react-spinners";
import Link from "next/link";

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>(
    !token ? "Missing token!" : undefined
  );
  const [success, setSuccess] = useState<string | undefined>();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;

    if (!token) return;

    hasRun.current = true;

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Confirming your verification
        </h2>
        <div className="flex items-center justify-center w-full">
          {!success && !error && <BeatLoader />}
          {success && (
            <div className="p-3 rounded-md bg-green-100 text-green-500">
              {success}
            </div>
          )}
          {error && (
            <div className="p-3 rounded-md bg-red-100 text-red-500">
              {error}
            </div>
          )}
        </div>
        <div>
          <Link
            href="/sign-in"
            className="text-sm text-orange-600 hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};
