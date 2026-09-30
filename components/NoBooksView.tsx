export default function NoBooksView() {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
      <svg
        aria-hidden="true"
        className="h-16 w-16 text-[#a7835b]"
        fill="none"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-[#eadcc8]"
          d="M12 14.5A4.5 4.5 0 0 1 16.5 10H30v38H16.5a4.5 4.5 0 0 0-4.5 4.5v-38Z"
        />
        <path
          className="fill-[#f5ecdf]"
          d="M52 14.5A4.5 4.5 0 0 0 47.5 10H34v38h13.5a4.5 4.5 0 0 1 4.5 4.5v-38Z"
        />
        <path
          d="M12 52.5V14.5A4.5 4.5 0 0 1 16.5 10H30v38H16.5A4.5 4.5 0 0 0 12 52.5Zm40 0V14.5A4.5 4.5 0 0 0 47.5 10H34v38h13.5A4.5 4.5 0 0 1 52 52.5ZM30 14h4M17 18h9M17 23h9M38 18h9M38 23h9"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>

      <h2 className="mt-4 font-serif text-2xl font-bold text-[#3b2b1d]">
        No Books Found
      </h2>

      <p className="mt-2 text-sm text-[#705d47]">
        Try another bookshelf or search.
      </p>
    </div>
  );
}