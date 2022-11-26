import React, { useContext, useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import { ThemeContext } from "~contexts/theme-provider";

export default function ThemeToggler() {
  const { theme, setTheme } = useContext(ThemeContext);

  const [lightOff, setLightOff] = useState<any>(null);
  const [lightOn, setLightOn] = useState<any>(null);

  const variants = {
    show: { opacity: 1, zIndex: 1, rotate: 0 },
    hidden: { opacity: 0, zIndex: 0, rotate: 120 },
  };

  const transition = {
    rotate: { type: "spring", damping: 8, stiffness: 90 },
  };

  useEffect(() => {
    setLightOff(new Audio("/sounds/light-off.mp3"));
    setLightOn(new Audio("/sounds/light-on.mp3"));
  }, []);

  return (
    <div className="relative">
      <motion.button
        animate={theme === "light" ? "hidden" : "show"}
        variants={variants}
        transition={transition}
        className="absolute top-0 left-0"
        onClick={() => {
          setTheme("light");
          lightOff?.play();
        }}
        role="sun-btn"
      >
        <SunIcon className="h-6 w-6 text-white" />
      </motion.button>
      <motion.button
        animate={theme === "dark" ? "hidden" : "show"}
        variants={variants}
        transition={transition}
        className="absolute top-0 left-0"
        onClick={() => {
          setTheme("dark");
          lightOn?.play();
        }}
        role="moon-btn"
      >
        <MoonIcon className="h-5 w-5 text-slate-900" />
      </motion.button>
    </div>
  );
}
