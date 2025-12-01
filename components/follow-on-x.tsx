"use client";

export function FollowOnX() {
  return (
    <a
      href="https://x.com/twokul"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-neutral-800 transition-colors"
      aria-label="Follow @twokul on X"
    >
      {/* X Logo */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="w-5 h-5 fill-current"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>

      <span className="text-sm font-medium">Follow</span>
    </a>
  );
}
