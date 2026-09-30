import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

function mapShelfToApiValue(shelf: string | null) {
  if (!shelf || shelf === "ALL") {
    return null;
  }

  const shelfMap: Record<string, string> = {
    CURRENTLY_READING: "Currently Reading",
    WANT_TO_READ: "Want to Read",
    READ: "Read",
    FAVORITES: "Favorites",
  };

  return shelfMap[shelf] ?? shelf;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const shelf = searchParams.get("shelf");
    const search = searchParams.get("search");

    const cookieStore = await cookies();
    const jwtToken =
      cookieStore.get("jwt_token")?.value ||
      cookieStore.get("bookhub_token")?.value;

    if (!jwtToken) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const params = new URLSearchParams();

    const mappedShelf = mapShelfToApiValue(shelf);

    if (mappedShelf) {
      params.append("shelf", mappedShelf);
    }

    if (search) {
      params.append("search", search);
    }

    const response = await fetch(
      `https://apis.ccbp.in/book-hub/books?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch books" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const books = Array.isArray(data?.books)
      ? data.books.map((book: any) => ({
          id: book.id,
          title: book.title,
          author: book.author_name,
          coverPic: book.cover_pic,
          rating: book.rating,
          readStatus: book.read_status,
        }))
      : [];

    return NextResponse.json({
      ...data,
      books,
    });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}