import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Video Chat</title>
        <meta name="description" content="Video Chat App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2 className="text-3xl font-bold underline">Video chat app</h2>
        <Link href="/api/auth/login">Login</Link>
      </main>
    </div>
  );
};

export default Home;
