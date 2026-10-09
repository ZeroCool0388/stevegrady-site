import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Arrow } from "@/components/arrow";
export default function NotFound() {
  return (
    <>
      <div className="curtain" aria-hidden="true" />
      <Navigation />
      <main id="main" className="shell not-found">
        <h1>404</h1>
        <h2>This page took a wrong turn.</h2>
        <p>
          The page you&apos;re looking for isn&apos;t here. Let&apos;s get you
          back to the work.
        </p>
        <Link href="/" className="button">
          Back to home
          <Arrow />
        </Link>
      </main>
    </>
  );
}
