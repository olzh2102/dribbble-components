import { NextPage } from 'next'
import { useRouter } from "next/router";
import Head from "next/head";

import lang from "common/lang.json";
import { Lang } from "common/types";

import ThemeToggler from "~components/theme-toggler";
import LangToggler from "~components/lang-toggler";
import RoundedCorner from "~components/rounded-corner";

const Home: NextPage = () => {
  const locale = useRouter().locale;
  const t = lang[locale as Lang];

  return (
    <div>
      <Head>
        <title>NR</title>
        <meta name="description" content="NR" />
      </Head>
      <RoundedCorner>
        <ThemeToggler />
        <LangToggler />
        <div className="place-content-center">{t.welcome}</div>
      </RoundedCorner>
    </div>
  );
};

export default Home
