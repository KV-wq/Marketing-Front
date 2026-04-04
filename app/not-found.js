import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <Link href="/" className="font-display text-2xl font-light tracking-[0.3em] uppercase mb-16 text-black/40">
        FORMA
      </Link>
      <p className="font-display text-[120px] md:text-[180px] font-light leading-none text-black/5 select-none">
        404
      </p>
      <h1 className="font-display text-3xl font-light mb-4 -mt-4">Page Not Found</h1>
      <p className="text-sm text-black/40 mb-10">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-black text-white px-10 py-4 text-xs tracking-widest uppercase hover:bg-black/80 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
