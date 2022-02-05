import { useRouter } from "next/router";
import Link from "next/link";

import { requests } from "~/backend/tmdb/requests";

export const Nav = () => {
  const router = useRouter();
  return (
    <nav className="relative">
      <div className="scrollbar-hide flex space-x-10 overflow-x-scroll whitespace-nowrap py-2">
        {Object.entries(requests).map(([key, { title }]) => (
          <h2
            key={key}
            className="transform cursor-pointer transition duration-100 hover:scale-125 active:text-red-400"
            onClick={() => router.push(`/?genre=${key}`)}
          >
            {title}
          </h2>
        ))}
        <Link href="/my-list">
          <a className="transform cursor-pointer transition duration-100 hover:scale-125 active:text-red-400">
            My List
          </a>
        </Link>
      </div>
      <div className="absolute top-0 right-0 h-10 w-1/12 bg-gradient-to-l from-white" />
    </nav>
  );
};
