import { LoginGoogleButton } from "@/components/LoginButton";
import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In to your account",
};
const SignInPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ callbackUrl?: string }>;
}) => {
  const params = (await searchParams)?.callbackUrl;

  let callbackUrl;
  if (!params) {
    callbackUrl = "/";
  } else {
    callbackUrl = `/${params}`;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <LoginForm callbackUrl={callbackUrl} />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        <div>
          <LoginGoogleButton callbackUrl={callbackUrl} />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
