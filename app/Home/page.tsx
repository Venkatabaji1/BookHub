"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import HomeBooks from "@/components/HomeBooks";

export default function HomePage() {
  const router = useRouter();

  return (
    <main
      className="min-h-screen bg-[#f3e2c0] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/home.png')",
      }}
    >
      <div className="min-h-screen bg-[#f3e2c0]/10">
        <Header />

        <section className="px-6 pt-8 md:px-8 md:pt-10">
          <div className="max-w-[350px]">
            <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-[#1f1813] md:text-5xl">
              DISCOVER
              <br />
              YOUR NEXT
              <br />
              GREAT READ
            </h1>

            <div className="mt-3 h-[2px] w-12 bg-[#7b2e18]" />

            <p className="mt-4 max-w-[280px] text-xs leading-5 text-[#514437]">
              Thousands of books, endless knowledge.
              <br />
              Start your journey today.
            </p>

            <button
              type="button"
              onClick={() => router.push("/shelves")}
              className="mt-4 rounded-md bg-[#7b2e18] px-5 py-2.5 text-[10px] font-semibold tracking-wide text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#652514] hover:shadow-lg active:translate-y-0"
            >
              FIND BOOKS
            </button>
          </div>
        </section>

        <div className="mt-12 md:mt-16">
          <HomeBooks />
        </div>
      </div>
    </main>
  );
}