"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "/Home";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("bookhub_token");
    document.cookie =
      "jwt_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    await fetch("/api/logout", { method: "POST" });

    router.replace("/login");
  };

  return (
    <header className="flex min-w-0 flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:px-8">
      {/* Logo */}
      <Link
        href="/"
        className="flex min-w-0 shrink-0 items-center gap-2"
        aria-label="Book Hub Home"
      >
        {/* Book icon */}
        <svg
          className="h-8 w-8 text-[#6f2918]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path
            d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z"
            fill="currentColor"
            stroke="none"
          />

          <path
            d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z"
            stroke="#4d1b10"
            strokeWidth="1"
          />

          <path
            d="M7 5h10"
            stroke="#f8ecd2"
            strokeWidth="1"
          />
        </svg>

        <div>
          <h1 className="font-serif text-lg font-semibold tracking-wide text-[#33251b]">
            BOOK HUB
          </h1>

          <p className="text-[8px] tracking-wide text-[#6d5a46]">
            Discover · Read · Grow
          </p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex min-w-0 flex-wrap items-center gap-3 sm:gap-5 md:gap-7">
        <Link
          href="/"
          className={`relative py-2 text-[10px] font-medium text-[#33251b] transition hover:text-[#7b2e18] sm:text-xs ${
            isActiveLink("/")
              ? "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-[#7b2e18]"
              : ""
          }`}
        >
          Home
        </Link>

        <Link
          href="/shelves"
          className={`py-2 text-[10px] font-medium text-[#33251b] transition hover:text-[#7b2e18] sm:text-xs ${
            isActiveLink("/shelves")
              ? "relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-[#7b2e18]"
              : ""
          }`}
        >
          Bookshelves
        </Link>

        <Link
          href="/about"
          className={`py-2 text-[10px] font-medium text-[#33251b] transition hover:text-[#7b2e18] sm:text-xs ${
            isActiveLink("/about")
              ? "relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-[#7b2e18]"
              : ""
          }`}
        >
          About Us
        </Link>
      </nav>

      {/* Right side */}
      <div className="flex items-center justify-end gap-4">
        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          title="Logout"
          aria-label="Logout"
          className="rounded-md bg-[#8f3f2a] px-3 py-2 text-[10px] font-medium text-[#fff8ea] transition hover:bg-[#6f2d1d] sm:text-xs"
        >
          Logout
        </button>
      </div>
    </header>
  );
}