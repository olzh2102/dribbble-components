import { ReactNode, useContext } from "react";

import { CursorContext } from "~contexts/cursor-provider";

import MenuItem from "./menu-item";

export default function Header({ children }: { children: ReactNode }) {
  const { onMouseOver, onMouseOut } = useContext(CursorContext);

  return (
    <header className="absolute w-full h-full px-5 flex justify-between items-center">
      <div className="text-center text-secondary-400 dark:text-secondary-300 mix-blend-exclusion">
        {children}
      </div>
      <nav>
        <ul
          className="text-primary-200 dark:text-secondary-300 text-end text-3xl font-medium"
          onMouseOver={(e) => onMouseOver(e, "a")}
          onMouseOut={(e) => onMouseOut(e, "a")}
        >
          <MenuItem route="/" />
          <MenuItem route="/projects" />
          <MenuItem route="/about" />
          <MenuItem route="/services" />
          <MenuItem route="/contact" />
        </ul>
      </nav>
    </header>
  );
}
