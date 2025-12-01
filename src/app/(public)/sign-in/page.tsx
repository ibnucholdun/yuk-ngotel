import { LoginGoogleButton } from "@/components/LoginButton";
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
    <div className="min-h-screen flex items-center">
      <div className="bg-white w-96 mx-auto rounded-sm shadow p-8">
        <h1 className="text-4xl font-bold mb-1">Sign In</h1>
        <p className="font-medium mb-5 text-gray-500">
          Sign In to your account
        </p>
        <div className="py-4 text-center">
          <LoginGoogleButton callbackUrl={callbackUrl} />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
