import { useRouter } from "next/router";
import Link from "next/link";

import { requests } from "~/features/tmdb/requests";

export const Nav = () => {
  const router = useRouter();
  return (
    <nav className="relative">
      <div className="flex overflow-x-scroll py-2 space-x-10 whitespace-nowrap scrollbar-hide">
        {Object.entries(requests).map(([key, { title }]) => (
          <h2
            key={key}
            className="transition duration-100 transform cursor-pointer hover:scale-125 active:text-red-400"
            onClick={() => router.push(`/?genre=${key}`)}
          >
            {title}
          </h2>
        ))}
        <Link href="/my-list">
          <a className="transition duration-100 transform cursor-pointer hover:scale-125 active:text-red-400">
            My List
          </a>
        </Link>
      </div>
      <div className="absolute top-0 right-0 w-1/12 h-10 bg-gradient-to-l from-white" />
    </nav>
  );
};
