export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const apiUrl =
    process.env.NEXT_PUBLIC_BOOK_DETAILS_API_URL ??
    "https://apis.ccbp.in/book-hub/books/{bookId}";
  const authorization = request.headers.get("authorization");
  const { id } = await params;

  if (!authorization) {
    return Response.json(
      { error: "Authentication is required." },
      { status: 401 }
    );
  }

  try {
    const endpoint = apiUrl.includes("{bookId}")
      ? apiUrl.replace("{bookId}", encodeURIComponent(id))
      : `${apiUrl.replace(/\/$/, "")}/${encodeURIComponent(id)}`;

    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/json",
        Authorization: authorization,
      },
      cache: "no-store",
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch {
    return Response.json(
      { error: "Unable to connect to the books service." },
      { status: 502 }
    );
  }
}