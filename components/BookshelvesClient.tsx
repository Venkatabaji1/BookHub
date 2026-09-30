"use client";

import { useCallback, useEffect, useState } from "react";

import Header from "./Header";
import Loader from "./Loader";
import FailureView from "./FailureView";
import NoBooksView from "./NoBooksView";
import BookCard from "./BookCard";

import { bookshelvesList } from "@/constants/bookshelves";
import { Book } from "@/types/book";

type Status = "loading" | "success" | "failure";

const STORAGE_KEY = "bookhub_book_state";

interface LocalBookState {
  shelf?: string;
  read?: boolean;
  favorite?: boolean;
  book?: {
    id: string;
    title: string;
    author_name?: string;
    author?: string;
    cover_pic?: string;
    coverPic?: string;
    rating?: number;
    rating_count?: number;
    read_status?: string;
  };
}

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


function getLocalBooks(): Book[] {
  try {
    const state: Record<
      string,
      LocalBookState
    > = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "{}"
    );

    return Object.values(state)
      .filter(
        (entry) => entry?.book?.id
      )
      .map((entry) => {
        const book = entry.book!;

        return {
          id: book.id,

          title: book.title,

          author:
            book.author_name ||
            book.author ||
            "Unknown author",

          coverPic:
            book.cover_pic ||
            book.coverPic ||
            "",

          rating:
            Number(book.rating) || 0,

          readStatus: entry.read
            ? "READ"
            : normalizeShelfValue(
                entry.shelf
              ),
        } as Book;
      });
  } catch (error) {
    console.error(
      "Failed to read local books:",
      error
    );

    return [];
  }
}


function isBookInShelf(
  bookId: string,
  shelf: string
): boolean {
  try {
    const state: Record<
      string,
      LocalBookState
    > = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "{}"
    );

    const saved = state[bookId];

    
    if (!saved) {
      return false;
    }

    const savedShelf =
      normalizeShelfValue(
        saved.shelf
      );

    const isRead = Boolean(
      saved.read
    );

    const isFavorite = Boolean(
      saved.favorite
    );

    const normalizedShelf =
      normalizeShelfValue(shelf);


    if (normalizedShelf === "ALL") {
      return true;
    }

    
    if (normalizedShelf === "READ") {
      return isRead;
    }

    
    if (
      normalizedShelf === "FAVORITES"
    ) {
      return isFavorite;
    }

    
    if (
      normalizedShelf ===
      "CURRENTLY_READING"
    ) {
      return (
        savedShelf ===
        "CURRENTLY_READING"
      );
    }

    
    if (
      normalizedShelf ===
      "WANT_TO_READ"
    ) {
      return (
        savedShelf ===
        "WANT_TO_READ"
      );
    }

    return (
      savedShelf ===
      normalizedShelf
    );
  } catch {
    return false;
  }
}


function getLocalBooksForShelf(
  shelf: string,
  searchValue: string
): Book[] {
  const localBooks =
    getLocalBooks();

  const normalizedSearch =
    searchValue
      .trim()
      .toLowerCase();

  return localBooks.filter(
    (book) => {
      
      if (
        !isBookInShelf(
          book.id,
          shelf
        )
      ) {
        return false;
      }

      
      if (!normalizedSearch) {
        return true;
      }

      const title =
        book.title
          ?.toLowerCase() || "";

      const author =
        book.author
          ?.toLowerCase() || "";

      return (
        title.includes(
          normalizedSearch
        ) ||
        author.includes(
          normalizedSearch
        )
      );
    }
  );
}

export default function BookshelvesClient() {
  const [books, setBooks] =
    useState<Book[]>([]);

  const [selectedShelf, setSelectedShelf] =
    useState("ALL");

  const [searchInput, setSearchInput] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState<Status>("loading");

  
  const fetchBooks = useCallback(
    async (
      shelf: string,
      searchValue: string
    ) => {
      setStatus("loading");

      try {
        
        let apiBooks: Book[] = [];

        try {
          const response =
            await fetch(
              "/api/books",
              {
                method: "GET",
                cache: "no-store",
              }
            );

          if (response.ok) {
            const data =
              await response.json();

            apiBooks =
              data.books || [];
          }
        } catch {
         
          apiBooks = [];
        }

        
        const localBooks =
          getLocalBooks();

      
        const mergedMap =
          new Map<string, Book>();

        apiBooks.forEach(
          (book) => {
            mergedMap.set(
              book.id,
              book
            );
          }
        );

        localBooks.forEach(
          (book) => {
            mergedMap.set(
              book.id,
              book
            );
          }
        );

        const mergedBooks =
          Array.from(
            mergedMap.values()
          );

        
        const filteredBooks =
          mergedBooks.filter(
            (book) => {
              
              if (
                normalizeShelfValue(
                  shelf
                ) === "ALL"
              ) {
                if (
                  !searchValue.trim()
                ) {
                  return true;
                }

                const title =
                  book.title
                    ?.toLowerCase() ||
                  "";

                const author =
                  book.author
                    ?.toLowerCase() ||
                  "";

                const searchText =
                  searchValue
                    .trim()
                    .toLowerCase();

                return (
                  title.includes(
                    searchText
                  ) ||
                  author.includes(
                    searchText
                  )
                );
              }

              
              if (
                !isBookInShelf(
                  book.id,
                  shelf
                )
              ) {
                return false;
              }

              if (
                !searchValue.trim()
              ) {
                return true;
              }

              const title =
                book.title
                  ?.toLowerCase() ||
                "";

              const author =
                book.author
                  ?.toLowerCase() ||
                "";

              const searchText =
                searchValue
                  .trim()
                  .toLowerCase();

              return (
                title.includes(
                  searchText
                ) ||
                author.includes(
                  searchText
                )
              );
            }
          );

        setBooks(filteredBooks);
        setStatus("success");
      } catch (error) {
        console.error(
          "Failed to fetch books:",
          error
        );

       
        const localBooks =
          getLocalBooksForShelf(
            shelf,
            searchValue
          );

        setBooks(localBooks);

       
        if (localBooks.length > 0) {
          setStatus("success");
        } else {
          setStatus("failure");
        }
      }
    },
    []
  );

  
  useEffect(() => {
    fetchBooks("ALL", "");
  }, [fetchBooks]);


  useEffect(() => {
    const reloadBooks =
      () => {
        fetchBooks(
          selectedShelf,
          search
        );
      };

    window.addEventListener(
      "bookhub-state-updated",
      reloadBooks
    );

    return () => {
      window.removeEventListener(
        "bookhub-state-updated",
        reloadBooks
      );
    };
  }, [
    fetchBooks,
    selectedShelf,
    search,
  ]);

  
  const handleShelfClick = (
    value: string
  ) => {
    setSelectedShelf(value);

    fetchBooks(
      value,
      search
    );
  };

  
  const handleSearch = () => {
    setSearch(
      searchInput
    );

    fetchBooks(
      selectedShelf,
      searchInput
    );
  };

  
  const selectedShelfLabel =
    bookshelvesList.find(
      (item) =>
        item.value ===
        selectedShelf
    )?.label ||
    "All Books";

  const heading =
    selectedShelf === "ALL"
      ? "All Books"
      : `${selectedShelfLabel} Books`;

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#ead9b8]">
      <div
        className="min-h-screen w-full bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('/bookshelves-bg.png')",
        }}
      >
        <div className="mx-auto min-h-screen w-full max-w-[1400px] min-w-0 bg-[#f2e3c5]/85">
          <Header />

          <section className="w-full min-w-0 px-6 py-8 md:px-10">
            {/* Heading */}
            <h1 className="font-serif text-3xl font-bold uppercase tracking-wide text-[#2d2419]">
              BOOKSHELVES
            </h1>

            <div className="mt-2 h-[2px] w-24 bg-[#6f2f1f]" />

            {/* Search */}
            <div className="mt-7 flex min-w-0 gap-4">
              <div className="flex min-w-0 flex-1 items-center rounded-md border border-[#b99b70] bg-[#f7ebd2]/70 px-4">
                <input
                  type="text"
                  placeholder="Search books by title, author, or genre..."
                  value={
                    searchInput
                  }
                  onChange={(e) =>
                    setSearchInput(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key ===
                      "Enter"
                    ) {
                      handleSearch();
                    }
                  }}
                  className="min-w-0 w-full bg-transparent py-3 text-sm text-[#2d2419] placeholder:text-[#7b6958] outline-none"
                />

                <button
                  type="button"
                  onClick={
                    handleSearch
                  }
                  className="shrink-0 text-xl"
                  aria-label="Search"
                >
                  ⌕
                </button>
              </div>

              <button
                type="button"
                className="rounded-md border border-[#b99b70] bg-[#e8d4ad] px-5 text-sm"
              >
                Filters
              </button>
            </div>

            
            <div className="mt-4 flex flex-wrap gap-2">
              {bookshelvesList.map(
                (shelf) => (
                  <button
                    key={
                      shelf.value
                    }
                    type="button"
                    onClick={() =>
                      handleShelfClick(
                        shelf.value
                      )
                    }
                    className={`rounded-md border px-5 py-2 text-sm font-medium transition ${
                      selectedShelf ===
                      shelf.value
                        ? "border-[#6f2f1f] bg-[#6f2f1f] text-[#fffaf3]"
                        : "border-[#d3bd96] bg-[#ead9b8]/70 text-[#3d3022] hover:bg-[#dfc89e]"
                    }`}
                  >
                    {shelf.label}
                  </button>
                )
              )}
            </div>

          
            <div className="mt-8">
              <h2 className="font-serif text-xl font-semibold text-[#302519]">
                {heading}
              </h2>
            </div>

           
            <div className="mt-5">
              {status ===
                "loading" && (
                <Loader />
              )}

              {status ===
                "failure" && (
                <FailureView
                  onRetry={() =>
                    fetchBooks(
                      selectedShelf,
                      search
                    )
                  }
                />
              )}

              {status ===
                "success" &&
                books.length ===
                  0 && (
                  <NoBooksView />
                )}

              {status ===
                "success" &&
                books.length > 0 && (
                  <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {books.map(
                      (book) => (
                        <BookCard
                          key={
                            book.id
                          }
                          book={
                            book
                          }
                        />
                      )
                    )}
                  </div>
                )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}