import Link from 'next/link';

export default function Home() {
  return (
    <main className="page">
      <nav className="m-4">
        <div className="flex flex-col items-center gap-4">
          <img
            src="https://res.cloudinary.com/dtkhwq0je/image/upload/v1765938056/thecderaisdead.com_eqfkoo.png"
            alt="Logo"
            className="h-12 w-auto"
          />
          <p className="text-white text-sm md:text-base">
            Who said hand to hand combat had to stop
          </p>
        </div>
      </nav>

      {/* Login content area - add your login components here */}
      <div className="flex-1 flex items-center justify-center w-full px-4">
        {/* You can add login form or content here */}
      </div>

      {/* Bottom-centered buttons */}
      <div className="absolute left-1/2 bottom-6 transform -translate-x-1/2 flex flex-col gap-3 items-center justify-center">
        <Link href="/login">
          <button className="bg-[#eeec33] text-black font-semibold px-6 py-3 hover:opacity-90 transition-opacity">
            Create an account
          </button>
        </Link>
        <button className="text-white bg-transparent border-none outline-none appearance-none p-0 m-0 font-inherit hover:underline">
          How does it work?
        </button>
      </div>
    </main>
  );
}