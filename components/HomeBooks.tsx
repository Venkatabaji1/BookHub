"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Book {
  id: string;
  author_name: string;
  cover_pic: string;
  title: string;
}

interface BooksResponse {
  books: Book[];
  total: number;
}

export default function HomeBooks() {
  const router = useRouter();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTopRatedBooks = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = window.localStorage.getItem("bookhub_token");

      if (!token) {
        router.replace("/login");
        return;
      }

      const response = await fetch("/api/books/top-rated", {
        method: "GET",

        // Send cookies with the request
        credentials: "include",

        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data: BooksResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          "Failed to fetch top rated books."
        );
      }

      setBooks(data.books);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );

      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopRatedBooks();
  }, [fetchTopRatedBooks]);


  if (loading) {
    return (
      <section className="px-6 pb-10 md:px-8">
        <div className="flex min-h-[250px] items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#7b2e18] border-t-transparent" />

            <p className="mt-4 font-serif text-sm text-[#5c4835]">
              Loading books...
            </p>
          </div>
        </div>
      </section>
    );
  }

  
  if (error) {
    return (
      <section className="px-6 pb-10 md:px-8">
        <div className="flex min-h-[250px] flex-col items-center justify-center text-center">

          {/* Error Icon */}
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#c9ad7d] bg-[#f8ecd2]">
            <svg
              className="h-7 w-7 text-[#7b2e18]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4"
              />

              <path
                strokeLinecap="round"
                d="M12 17h.01"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.3 3.7 2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z"
              />
            </svg>
          </div>

          <h2 className="font-serif text-2xl text-[#3a2418]">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-[#665747]">
            We couldn't load the books right now.
          </p>

          <button
            type="button"
            onClick={fetchTopRatedBooks}
            className="mt-6 rounded-md bg-[#7b2e18] px-6 py-3 text-xs font-semibold tracking-wide text-white shadow-md transition hover:bg-[#632412] hover:shadow-lg"
          >
            TRY AGAIN
          </button>
        </div>
      </section>
    );
  }

  
  if (books.length === 0) {
    return (
      <section className="px-6 pb-10 md:px-8">
        <div className="flex min-h-[250px] flex-col items-center justify-center text-center">

          <svg
            aria-hidden="true"
            className="mb-4 h-16 w-16 text-[#a7835b]"
            fill="none"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-[#eadcc8]"
              d="M12 14.5A4.5 4.5 0 0 1 16.5 10H30v38H16.5a4.5 4.5 0 0 0-4.5 4.5v-38Z"
            />
            <path
              className="fill-[#f5ecdf]"
              d="M52 14.5A4.5 4.5 0 0 0 47.5 10H34v38h13.5a4.5 4.5 0 0 1 4.5 4.5v-38Z"
            />
            <path
              d="M12 52.5V14.5A4.5 4.5 0 0 1 16.5 10H30v38H16.5A4.5 4.5 0 0 0 12 52.5Zm40 0V14.5A4.5 4.5 0 0 0 47.5 10H34v38h13.5A4.5 4.5 0 0 1 52 52.5ZM30 14h4M17 18h9M17 23h9M38 18h9M38 23h9"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />
          </svg>

          <h2 className="font-serif text-2xl text-[#3a2418]">
            No books found
          </h2>

          <p className="mt-2 text-sm text-[#665747]">
            We couldn't find any books at the moment.
          </p>

          <button
            type="button"
            onClick={() => router.push("/shelves")}
            className="mt-6 rounded-md bg-[#7b2e18] px-6 py-3 text-xs font-semibold tracking-wide text-white shadow-md transition hover:bg-[#632412]"
          >
            FIND BOOKS
          </button>
        </div>
      </section>
    );
  }

  
  return (
    <section className="px-6 pb-10 md:px-8">

      {/* Section Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold text-[#33251b]">
          TOP RATED BOOKS
        </h2>

        <button
          type="button"
          onClick={() => router.push("/shelves")}
          className="text-xs font-medium text-[#7b2e18] transition hover:underline"
        >
          View All →
        </button>
      </div>

     
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {books.map((book) => (
          <button
            key={book.id}
            type="button"
            onClick={() =>
              router.push(`/books/${book.id}`)
            }
            className="group text-left"
          >
            {/* Cover */}
            <div className="overflow-hidden rounded-md border border-[#d7bf96] bg-[#ead5ad] shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
              <img
                src={book.cover_pic}
                alt={book.title}
                className="aspect-[3/4] w-full object-cover"
              />
            </div>

            {/* Title */}
            <h3 className="mt-2 line-clamp-1 font-serif text-sm font-semibold text-[#33251b]">
              {book.title}
            </h3>

            {/* Author */}
            <p className="mt-1 line-clamp-1 text-[10px] text-[#665747]">
              {book.author_name}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}