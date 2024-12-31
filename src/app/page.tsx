import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-10 row-start-2 items-center ">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Welcome to</h1>
          <h1 className="text-4xl font-bold text-primary">Recipe Explorer</h1>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Link href="/api/recipes" className="text-xl px-6 py-2 rounded text-secondry border-secondry border hover:bg-secondry hover:text-customText" >
            Start
          </Link>
        </div>
      </main>
    </div>
  );
}
