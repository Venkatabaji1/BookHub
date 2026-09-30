export async function GET(request: Request) {
  const apiUrl =
    process.env.NEXT_PUBLIC_TOP_RATED_BOOKS_API_URL ??
    "https://apis.ccbp.in/book-hub/top-rated-books";
  const authorization = request.headers.get("authorization");

  if (!authorization) {
    return Response.json(
      { error: "Authentication is required." },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        Authorization: authorization,
      },
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