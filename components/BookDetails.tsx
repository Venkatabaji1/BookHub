"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import { bookshelvesList } from "@/constants/bookshelves";

interface Book {
  id: string;
  title: string;
  author_name: string;
  cover_pic: string;
  rating?: number;
  rating_count?: number;
  description?: string;
  pages?: number;
  published_date?: string;
  category?: string;
  about_author?: string;
  read_status?: string;
}

interface BookDetailsResponse {
  book?: Book;
  book_details?: Book;
  data?: Book;
  message?: string;
  error?: string;
}

const STORAGE_KEY = "bookhub_book_state";

function normalizeShelfValue(
  value: string | null | undefined
): string {
  const raw = value?.trim();

  if (!raw) {
    return "";
  }

  const upper = raw.toUpperCase();

  if (upper === "CURRENTLY READING") {
    return "CURRENTLY_READING";
  }

  if (upper === "WANT TO READ") {
    return "WANT_TO_READ";
  }

  if (upper === "READ") {
    return "READ";
  }

  if (upper === "FAVORITES") {
    return "FAVORITES";
  }

  return upper;
}

export default function BookDetails() {
  const router = useRouter();
  const params = useParams();

  const bookId = params.id as string;

  const [book, setBook] = useState<Book | null>(null);

  const [shelf, setShelf] = useState("");
  const [isRead, setIsRead] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [showShelfMenu, setShowShelfMenu] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  const saveBookState = useCallback(
    (
      nextShelf: string,
      nextRead: boolean,
      nextFavorite: boolean
    ) => {
      if (!bookId || !book) {
        return;
      }

      try {
        const existing = JSON.parse(
          localStorage.getItem(STORAGE_KEY) || "{}"
        );

        existing[bookId] = {
          shelf: normalizeShelfValue(nextShelf),
          read: nextRead,
          favorite: nextFavorite,

          book: {
            id: book.id,
            title: book.title,
            author_name: book.author_name,
            cover_pic: book.cover_pic,
            rating: book.rating,
            rating_count: book.rating_count,
            read_status: nextRead
              ? "Read"
              : book.read_status || "",
          },
        };

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(existing)
        );

        
        window.dispatchEvent(
          new CustomEvent("bookhub-state-updated")
        );
      } catch (error) {
        console.error(
          "Failed to save book state:",
          error
        );
      }
    },
    [book, bookId]
  );

 
  const fetchBookDetails = useCallback(async () => {
    if (!bookId) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token =
        window.localStorage.getItem("bookhub_token");

      if (!token) {
        router.replace("/login");
        return;
      }

      const response = await fetch(
        `/api/books/${bookId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      const data: BookDetailsResponse =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Failed to fetch book details."
        );
      }

      const bookData =
        data.book ||
        data.book_details ||
        data.data;

      if (!bookData) {
        throw new Error(
          "Book details were not received."
        );
      }

      setBook(bookData);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );

      setBook(null);
    } finally {
      setLoading(false);
    }
  }, [bookId, router]);

  
  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);

 
  useEffect(() => {
    if (!bookId || !book) {
      return;
    }

    try {
      const existing = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}"
      );

      const saved = existing[bookId];

      
      if (!saved) {
        const apiIsRead =
          book.read_status?.toLowerCase() === "read";

        setShelf(apiIsRead ? "READ" : "");
        setIsRead(apiIsRead);
        setIsFavorite(false);

        return;
      }

      const savedShelf = normalizeShelfValue(
        saved.shelf
      );

      const savedRead = Boolean(saved.read);
      const savedFavorite = Boolean(saved.favorite);

      setShelf(savedShelf);
      setIsRead(savedRead);
      setIsFavorite(savedFavorite);
    } catch (error) {
      console.error(
        "Failed to load saved book state:",
        error
      );

      const apiIsRead =
        book.read_status?.toLowerCase() === "read";

      setShelf(apiIsRead ? "READ" : "");
      setIsRead(apiIsRead);
      setIsFavorite(false);
    }
  }, [book, bookId]);

  
  const handleShelfSelect = (value: string) => {
    const normalizedValue =
      normalizeShelfValue(value);

   
    const nextRead =
      normalizedValue === "READ";

    const nextFavorite =
      normalizedValue === "FAVORITES";

    setShelf(normalizedValue);
    setIsRead(nextRead);
    setIsFavorite(nextFavorite);

    saveBookState(
      normalizedValue,
      nextRead,
      nextFavorite
    );

    setShowShelfMenu(false);
  };

 
  const handleMarkAsRead = () => {
    setShelf("READ");
    setIsRead(true);

   
    saveBookState(
      "READ",
      true,
      isFavorite
    );
  };

  const handleToggleFavorite = () => {
    const nextFavorite = !isFavorite;

    setIsFavorite(nextFavorite);

    
    if (nextFavorite) {
      setShelf("FAVORITES");

      saveBookState(
        "FAVORITES",
        isRead,
        true
      );

      return;
    }

   
    const nextShelf = isRead
      ? "READ"
      : "";

    setShelf(nextShelf);

    saveBookState(
      nextShelf,
      isRead,
      false
    );
  };

  
  if (loading) {
    return (
      <main
        className="flex min-h-screen items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/bookdetails.png')",
        }}
      >
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#7b2e18] border-t-transparent" />

          <p className="mt-4 font-serif text-sm text-[#5c4835]">
            Loading book details...
          </p>
        </div>
      </main>
    );
  }

  
  if (error) {
    return (
      <main
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/bookdetails.png')",
        }}
      >
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#c9ad7d] bg-[#f8ecd2]/90">
            <svg
              className="h-8 w-8 text-[#7b2e18]"
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
                d="M10.3 3.7 2.5 17a2 2 0 0 0 1.7 3L13.7 3.7a2 2 0 0 0-3.4 0Z"
              />
            </svg>
          </div>

          <h1 className="font-serif text-3xl text-[#3a2418]">
            Something went wrong
          </h1>

          <p className="mt-3 max-w-md text-sm text-[#665747]">
            We couldn't load the book details right now.
            Please try again.
          </p>

          <button
            type="button"
            onClick={fetchBookDetails}
            className="mt-6 rounded-md bg-[#7b2e18] px-7 py-3 text-xs font-semibold tracking-wide text-white shadow-md transition hover:bg-[#652514]"
          >
            TRY AGAIN
          </button>
        </div>
      </main>
    );
  }

  if (!book) {
    return null;
  }


  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('/images/bookdetails.png')",
      }}
    >
      <Header />

      <div className="px-6 pb-10 md:px-8">
        {/* Back */}
        <button
          type="button"
          onClick={() => router.push("/shelves")}
          className="mb-5 flex items-center gap-1 text-xs text-[#5c4835] transition hover:text-[#7b2e18]"
        >
          ← Back to Bookshelves
        </button>

        {/* Book Information */}
        <section className="grid grid-cols-1 gap-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-12">
          {/* Cover */}
          <div className="mx-auto w-[180px] md:mx-0 md:w-[200px]">
            <div className="overflow-hidden rounded-lg border border-[#b89560] shadow-[0_8px_20px_rgba(70,45,20,0.25)]">
              <img
                src={book.cover_pic}
                alt={book.title}
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="font-serif text-3xl font-semibold text-[#1f1813]">
              {book.title}
            </h1>

            <p className="mt-1 text-sm text-[#665747]">
              {book.author_name}
            </p>

            {/* Rating */}
            {book.rating !== undefined && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm tracking-wide text-[#a66a14]">
                  ★
                </span>

                <span className="text-xs text-[#4d4035]">
                  {book.rating}
                </span>

                {book.rating_count !== undefined && (
                  <span className="text-xs text-[#665747]">
                    ({book.rating_count} ratings)
                  </span>
                )}
              </div>
            )}

            {/* Category */}
            {book.category && (
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded border border-[#bda783] bg-[#f5e5c7] px-3 py-1 text-[10px] text-[#514437]">
                  {book.category}
                </span>
              </div>
            )}

            {/* Description */}
            {book.description && (
              <p className="mt-4 max-w-[760px] text-xs leading-5 text-[#514437]">
                {book.description}
              </p>
            )}

            {/* Book information */}
            <div className="mt-5 flex flex-wrap gap-6">
              {book.pages !== undefined && (
                <div>
                  <p className="text-[10px] text-[#8a765e]">
                    Pages
                  </p>

                  <p className="mt-1 text-xs font-medium text-[#3d3025]">
                    {book.pages}
                  </p>
                </div>
              )}

              {book.published_date && (
                <div>
                  <p className="text-[10px] text-[#8a765e]">
                    Published
                  </p>

                  <p className="mt-1 text-xs font-medium text-[#3d3025]">
                    {book.published_date}
                  </p>
                </div>
              )}

              {book.category && (
                <div>
                  <p className="text-[10px] text-[#8a765e]">
                    Category
                  </p>

                  <p className="mt-1 text-xs font-medium text-[#3d3025]">
                    {book.category}
                  </p>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-2">
              {/* Shelf */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setShowShelfMenu(
                      (value) => !value
                    )
                  }
                  className="rounded-md bg-[#7b2e18] px-5 py-2.5 text-[10px] font-semibold tracking-wide text-white shadow-md transition hover:bg-[#652514]"
                >
                  {shelf
                    ? `ADDED: ${shelf}`
                    : "ADD TO SHELF"}
                </button>

                {showShelfMenu && (
                  <div className="absolute left-0 z-10 mt-2 w-52 rounded-md border border-[#d3bd96] bg-[#fffaf1] p-2 shadow-lg">
                    {bookshelvesList
                      .filter(
                        (item) =>
                          item.value !== "ALL"
                      )
                      .map((item) => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() =>
                            handleShelfSelect(
                              item.value
                            )
                          }
                          className="flex w-full items-center justify-between rounded px-3 py-2 text-left text-xs text-[#4d4035] transition hover:bg-[#f4e5c4]"
                        >
                          <span>
                            {item.label}
                          </span>

                          {shelf ===
                            item.value && (
                            <span>✓</span>
                          )}
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {/* Read */}
              <button
                type="button"
                onClick={handleMarkAsRead}
                className="rounded-md border border-[#bda783] bg-[#f8ecd2] px-5 py-2.5 text-[10px] font-semibold tracking-wide text-[#5c3927] transition hover:bg-[#ead7b4]"
              >
                {isRead
                  ? "✓ READ"
                  : "✓ MARK AS READ"}
              </button>

              {/* Favorite */}
              <button
                type="button"
                onClick={
                  handleToggleFavorite
                }
                aria-label="Add to favorites"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#bda783] bg-[#f8ecd2] text-[#7b2e18] transition hover:bg-[#ead7b4]"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill={isFavorite ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                >
                  <path d="M20.8 8.7c0 5.3-8.8 10.3-8.8 10.3S3.2 14 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* About Author */}
        {book.about_author && (
          <section className="mt-10 max-w-[760px] md:ml-[248px]">
            <h2 className="font-serif text-base font-semibold tracking-wide text-[#5b2415]">
              ABOUT THE AUTHOR
            </h2>

            <div className="mt-3 flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c49a68] bg-[#ead5ad]">
                <svg
                  className="h-7 w-7 text-[#7a4a32]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="3"
                  />

                  <path
                    strokeLinecap="round"
                    d="M5 20a7 7 0 0 1 14 0"
                  />
                </svg>
              </div>

              <div>
                <h3 className="font-serif text-base font-semibold text-[#5b2415]">
                  {book.author_name}
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#6b5747]">
                  {book.about_author}
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}