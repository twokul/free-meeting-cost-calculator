export function Footer() {
  return (
    <footer className="py-6 text-center text-sm text-neutral-500 px-2">
      Meeting data is processed locally. No data is stored. Free Meeting Cost
      Calculator by{" "}
      <a
        href="https://x.com/twokul"
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-700 hover:text-black transition-colors"
      >
        @twokul
      </a>
      . © {new Date().getFullYear()}
    </footer>
  );
}
