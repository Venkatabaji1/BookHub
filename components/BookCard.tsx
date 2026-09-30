"use client";

import { Book } from "@/types/book";
import { useRouter } from "next/navigation";

interface BookCardProps {
  book: Book;
}

export default function BookCard({
  book,
}: BookCardProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/books/${book.id}`)}
      className="group text-left"
    >
      <div className="overflow-hidden rounded-md">
        <img
          src={book.coverPic}
          alt={book.title}
          className="h-[220px] w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <h3 className="mt-2 line-clamp-2 font-serif text-sm font-semibold text-[#3c2b1b]">
        {book.title}
      </h3>

      <p className="text-xs text-[#75634d]">
        {book.author}
      </p>

      <div className="mt-1 flex items-center gap-1 text-xs">
        <span
          aria-label="5 out of 5 stars"
          className="flex items-center gap-0.5 text-[#b86a00]"
          role="img"
        >
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
              aria-hidden="true"
              className="h-3 w-3 shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m12 1.5 3.24 6.57 7.26 1.06-5.25 5.12 1.24 7.23L12 18.07l-6.49 3.41 1.24-7.23L1.5 9.13l7.26-1.06L12 1.5Z" />
            </svg>
          ))}
        </span>

        <span className="text-[#6d5a43]">
          {book.rating}
        </span>
      </div>
    </button>
  );
}