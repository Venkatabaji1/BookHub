import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#ead9b8] px-6">
      <div className="text-center">
        <h1 className="font-serif text-7xl font-bold text-[#6f2f1f]">
          404
        </h1>

        <h2 className="mt-4 font-serif text-3xl font-bold text-[#2d2419]">
          Page Not Found
        </h2>

        <p className="mt-3 text-[#705d47]">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-[#6f2f1f] px-6 py-3 text-sm font-medium text-white"
        >
          Go to Home
        </Link>
      </div>
    </main>
  );
}