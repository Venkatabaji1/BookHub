interface FailureViewProps {
  onRetry: () => void;
}

export default function FailureView({
  onRetry,
}: FailureViewProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#c9ad7d] bg-[#f8ecd2]">
        <svg
          aria-hidden="true"
          className="h-8 w-8 text-[#7b2e18]"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.3 3.7 2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path
            d="M12 9v4M12 17h.01"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.8"
          />
        </svg>
      </div>

      <h2 className="font-serif text-2xl font-bold text-[#3b2b1d]">
        Something went wrong
      </h2>

      <p className="mt-2 text-sm text-[#705d47]">
        We couldn&apos;t fetch the books.
      </p>

      <button
        onClick={onRetry}
        className="mt-5 rounded-md bg-[#6f2f1f] px-6 py-2 text-sm text-white"
      >
        Try Again
      </button>
    </div>
  );
}