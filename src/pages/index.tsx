import Head from 'next/head';
import { trpc } from '../utils/trpc';
import { Test } from '../components/Test';


const Home = () => {
  const { data } = trpc.hello.useQuery({ text: 'client' });
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Test />
        <p>{data?.greeting}</p>
      </main>
    </>
  );
};

export default Home;