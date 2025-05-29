import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#8B0000] to-[#000000] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Welcome{" "}
          <span className="cookie text-[8rem] text-[hsl(0,100%,50%)]">
            Clifford
          </span>
          , your new email pet.
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-red-900/20"
            href=""
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Get started by adding your first email address.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-red-900/20"
            href=""
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Documentation →</h3>
            <div className="text-lg">
              Learn how to use Clifford to find and monitor BNPL orders.
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
