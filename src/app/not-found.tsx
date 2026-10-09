import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found">
      <p className="error-number">404</p>
      <h1>Page not found</h1>
      <Link href="/">
        Back to home <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
