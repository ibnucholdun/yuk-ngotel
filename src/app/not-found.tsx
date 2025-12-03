import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-orange-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Oops! The page you are looking for does not exist.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
