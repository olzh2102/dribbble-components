import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import { motion } from "framer-motion";

import lang from "common/lang.json";
import { Lang } from "common/types";

import ThemeToggler from "~components/theme-toggler";
import LangToggler from "~components/lang-toggler";
import RoundedCorner from "~components/rounded-corner";
import Wave from "~components/wave";

const CurrentTime = dynamic(() => import("~components/current-time"), {
  ssr: false,
});

const Home: NextPage = () => {
  const locale = useRouter().locale;
  const t = lang[locale as Lang];

  return (
    <div>
      <Head>
        <title>NR</title>
        <meta name="description" content="NR" />
      </Head>
      <div className="absolute top-0 left-0 w-full h-full p-3">
        <Canvas
          className="rounded-xl"
          orthographic
          camera={{ position: [0, 0, 1] }}
        >
          <Wave />
        </Canvas>
      </div>
      <RoundedCorner>
        <div className="flex gap-x-5 justify-end px-6">
          <CurrentTime />
          <LangToggler lang={locale as Lang} />
          <ThemeToggler />
        </div>
        <div className="grid h-full place-content-center text-5xl dark:text-white">
          {t.welcome}
        </div>
      </RoundedCorner>
    </div>
  );
};

export default Home
