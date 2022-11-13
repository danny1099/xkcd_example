import Head from 'next/head';

export default function Search({ query }) {
  return (
    <>
      <Head>
        <title>XKCD APP | Results for {query}</title>
        <meta name='description' content={`Search results for ${query}`} />
      </Head>

      <h2>Página de busqueda: {query}</h2>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const q = query.q;

  return {
    props: { query: q },
  };
}
