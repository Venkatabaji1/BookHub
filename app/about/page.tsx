import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat text-[#2a1e17]"
      style={{
        backgroundImage: "url('/images/bookshelves.png')",
      }}
    >
      {/* Overlay */}
      <div className="min-h-screen bg-[#f5e7c9]/85">
        <Header />

        <section className="mx-auto max-w-5xl px-6 py-12 md:px-10">
          {/* Page Heading */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7b2e18]">
              Our Story
            </p>

            <h1 className="mt-3 font-serif text-4xl font-bold text-[#2d2419]">
              About Us
            </h1>
          </div>

          {/* Main Cards */}
          <div className="grid gap-8 md:grid-cols-2">
            
            {/* Our Story */}
            <div className="rounded-2xl border border-[#d8c29a] bg-[#fffaf1]/95 p-6 shadow-sm">
              <h2 className="mb-3 font-serif text-2xl font-semibold text-[#3a2418]">
                Discover books that fit your life
              </h2>

              <p className="text-sm leading-7 text-[#5a4638]">
                BookHub is built for readers who want to explore meaningful
                titles, track what they are reading, and keep their next
                favorite book close at hand. We believe reading should feel
                personal, inspiring, and easy.
              </p>
            </div>

            {/* Why BookHub */}
            <div className="rounded-2xl border border-[#d8c29a] bg-[#f1dfb4]/95 p-6 shadow-sm">
              <h2 className="mb-3 font-serif text-2xl font-semibold text-[#3a2418]">
                Why readers love us
              </h2>

              <ul className="space-y-3 text-sm text-[#4f3d2d]">
                <li>• Personal shelves for reading progress</li>
                <li>• Easy discovery of new authors and genres</li>
                <li>• A warm, minimalist reading experience</li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-10 rounded-2xl border border-[#d8c29a] bg-[#f8ecd2]/95 p-8 text-center">
            <h2 className="font-serif text-3xl font-semibold text-[#2d2419]">
              Read more. Grow more.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5a4638]">
              From thoughtful classics to modern favorites, BookHub helps you
              build a library that reflects your curiosity, your pace, and
              your next chapter.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}