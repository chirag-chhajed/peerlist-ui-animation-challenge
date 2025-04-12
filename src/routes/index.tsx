import { createFileRoute, Link } from "@tanstack/react-router";
import { Menu, MenuItem } from "react-aria-components";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-medium text-zinc-800 mb-10">
        Peerlist UI Animation Challenge
      </h1>

      <nav className="w-full max-w-sm space-y-2">
        {[1, 2, 3, 4, 5].map((day) => (
          <Link
            key={day}
            to={`/day-${day}`}
            className="block px-4 py-3 rounded-lg hover:bg-white transition-colors duration-200 text-zinc-600 hover:text-zinc-900"
          >
            Day {day}
          </Link>
        ))}
      </nav>
      <a
        href="https://github.com/chirag-chhajed"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-8 text-zinc-400 hover:text-zinc-600 transition-colors inline-flex gap-2 items-center"
      >
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
        <span>Made by Chirag Chhajed</span>
      </a>
    </div>
  );
}
