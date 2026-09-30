"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { setToken } from "@/lib/auth";

interface LoginResponse {
  token?: string;
  accessToken?: string;
  jwt_token?: string;
  message?: string;
  error?: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        setError(data.message || data.error || "Invalid username or password.");
        return;
      }

      const token = data.token || data.accessToken || data.jwt_token;

      if (!token) {
        setError("Authentication token was not received.");
        return;
      }

      setToken(token);
      router.replace("/");
      router.refresh();
    } catch {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-contain bg-center bg-no-repeat px-4 sm:bg-cover"
      style={{ backgroundImage: "url('/images/login.png')" }}
    >
      <div className="w-full max-w-[420px] rounded-2xl border border-[#cdb487] bg-[#f8ecd2]/95 px-7 py-8 shadow-[0_12px_40px_rgba(70,45,20,0.25)] sm:px-9">

        {/* Header */}
        <div className="mb-7 text-center">
          <h1 className="font-serif text-3xl font-bold tracking-wide text-[#5b2415]">
            Book Hub
          </h1>

          <p className="mt-2 font-serif text-sm italic text-[#80664a]">
            A good book opens a new world.
          </p>

          <div className="mx-auto mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-[#b99563]" />
            <span className="text-sm text-[#8b6540]">✦</span>
            <span className="h-px w-12 bg-[#b99563]" />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg border border-[#c97b6d] bg-[#fff1ed] px-4 py-3 text-sm text-[#9b2c1f]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-semibold text-[#33251b]"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              required
              className="w-full rounded-lg border border-[#d8c19a] bg-[#fdf6e7] px-3 py-3 text-sm text-[#33251b] outline-none placeholder:text-[#8f806c] focus:border-[#7b2e18] focus:ring-2 focus:ring-[#7b2e18]/10"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#33251b]"
            >
              Password
            </label>

            <div className="flex items-center rounded-lg border border-[#d8c19a] bg-[#fdf6e7] px-3 focus-within:border-[#7b2e18] focus-within:ring-2 focus-within:ring-[#7b2e18]/10">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full bg-transparent py-3 text-sm text-[#33251b] outline-none placeholder:text-[#8f806c]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-[#665747] hover:text-[#7b2e18]"
                aria-label="Toggle password visibility"
              >
                {showPassword ? "◉" : "◌"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg border border-[#5e2113] bg-gradient-to-r from-[#6f2918] via-[#8b351d] to-[#6f2918] py-3.5 text-sm font-bold tracking-[0.18em] text-[#fff8e9] shadow-[0_5px_0_#4d1b10,0_8px_18px_rgba(75,30,15,0.25)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>
        </form>
      </div>
    </main>
  );
}
