import Head from 'next/head';
import { trpc } from '../utils/trpc';
import { Layout } from '../components/Layout';
import { HomeContent } from '../components/HomePage';


const Home = () => {
  // const { data } = trpc.products.list.useInfiniteQuery(
  //   { category: 'men' },
  //   { getNextPageParam: (lastQuert) => lastQuert.nextCursor }
  // );

  return (
    <>
      <Head>
        <title>CleverShop</title>
        <meta name="description" content="Clever Shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <HomeContent />
      </Layout>

    </>
  );
};

export default Home;