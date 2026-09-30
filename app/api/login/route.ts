export async function POST(request: Request) {
  const apiUrl =
    process.env.NEXT_PUBLIC_LOGIN_API_URL ?? "https://apis.ccbp.in/login";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(await request.json()),
    });

    const data = await response.json();
    const token = data.token || data.accessToken || data.jwt_token;
    const result = Response.json(data, { status: response.status });

    if (response.ok && token) {
      result.headers.set(
        "Set-Cookie",
        `bookhub_token=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400${process.env.NODE_ENV === "production" ? "; Secure" : ""}`
      );
    }

    return result;
  } catch {
    return Response.json(
      { error: "Unable to connect to the login service." },
      { status: 502 }
    );
  }
}