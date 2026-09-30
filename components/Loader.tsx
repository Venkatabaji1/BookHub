export default function Loader() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#8c6a3d]/30 border-t-[#6f3b20]" />

        <p className="font-serif text-[#4b3925]">
          Loading books...
        </p>
      </div>
    </div>
  );
}