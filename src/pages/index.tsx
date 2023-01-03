import Head from 'next/head';
import { trpc } from '../utils/trpc';
import { Layout } from '../components/Layout';


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
      <Layout />
      <main>
        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore veritatis corporis optio fuga dolor. Corrupti ipsa sunt omnis quasi recusandae deserunt totam autem labore error, dignissimos, at explicabo, consectetur illo.</div>
      </main>
    </>
  );
};

export default Home;