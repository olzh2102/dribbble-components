import React, { useContext } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import { ThemeContext } from "~contexts/theme-provider";
import useSoundOnToggle from "~hooks/use-sound-on-toggle";

export default function ThemeToggler() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { playOn, playOff } = useSoundOnToggle({
    pathOn: "/sounds/light-on.mp3",
    pathOff: "/sounds/light-off.mp3",
  });

  const variants = {
    show: { opacity: 1, zIndex: 1, rotate: 0 },
    hidden: { opacity: 0, zIndex: 0, rotate: 120 },
  };

  const transition = {
    rotate: { type: "spring", damping: 8, stiffness: 90 },
  };

  function toLight() {
    setTheme("light");
    playOn();
  }

  function toDark() {
    setTheme("dark");
    playOff();
  }

  return (
    <div className="relative">
      <motion.button
        animate={theme === "light" ? "hidden" : "show"}
        variants={variants}
        transition={transition}
        className="absolute top-0 left-0"
        onClick={toLight}
        role="sun-btn"
      >
        <SunIcon className="h-6 w-6 text-white" />
      </motion.button>
      <motion.button
        animate={theme === "dark" ? "hidden" : "show"}
        variants={variants}
        transition={transition}
        className="absolute top-0 left-0"
        onClick={toDark}
        role="moon-btn"
      >
        <MoonIcon className="h-5 w-5 text-slate-900" />
      </motion.button>
    </div>
  );
}
