import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import lang from 'common/lang.json'
import { Lang } from 'common/types'
import { motion } from "framer-motion";

export const activeClassName =
  "relative content-[' '] absolute -top-0.5 -right-2 after:w-1.5 after:h-1.5 after:bg-[#0d00fc] after:rounded-full after:shadow-active-menu-item";

type RoutePath = "/" | "/projects" | "/about" | "/services" | "/contact";

function MenuItem({ route }: { route: RoutePath }) {
  const { locale, route: currentRoute } = useRouter();
  const t = lang[locale as Lang];

  const variants = {
    show: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const transition = {
    opacity: {
      duration: 0.7,
      type: "spring",
    },
  };

  return (
    <li className="relative">
      <Link href={route}>
        {(t.header as any)[route === "/" ? "home" : route.replace("/", "")]}
      </Link>
      <motion.span
        animate={route === currentRoute ? "show" : "hidden"}
        transition={transition}
        variants={variants}
        className="absolute -top-0.5 -right-2 w-1.5 h-1.5 bg-[#0d00fc] rounded-full shadow-active-menu-item"
      />
    </li>
  );
}

export default function Header({ children }: { children: ReactNode }) {
  return (
    <header className="flex justify-between pointer-events-auto mt-4 items-center">
      <nav>
        <ul className="flex gap-6 ml-20 text-black dark:text-white">
          <MenuItem route="/" />
          <MenuItem route="/projects" />
          <MenuItem route="/about" />
          <MenuItem route="/services" />
          <MenuItem route="/contact" />
        </ul>
      </nav>
      <div className="flex gap-x-5 justify-end pr-6 pointer-events-auto text-black dark:text-white dark:mix-blend-exclusion">
        {children}
      </div>
    </header>
  );
}
