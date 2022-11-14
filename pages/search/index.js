import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getHitsByAlgoliaSearch } from 'services/algoliaService';

export default function Search({ query, hits }) {
  return (
    <>
      <Head>
        <title>XKCD APP | Results for search</title>
        <meta name='description' content={`Search results for ${query}`} />
      </Head>

      <h1 className='text-slate-900 text-bold text-2xl'>
        Página de búsqueda: {query}
      </h1>
      <p className='text-sm text-gray-600'>
        Número de resultados encontrados: {hits.length}
      </p>

      <div className='flex flex-col justify-center content-center align-middle mt-2'>
        {hits.map(({ id, img, title, alt }) => {
          return (
            <Link
              href={`/comic/${id}`}
              key={id}
              className='flex flex-row m-2 pt-2'>
              <Image src={img} height='70' width='70' alt={alt} />

              <div className='flex flex-col text-start pl-4 pb-4'>
                <h3 className='text-semibold text-xl'>{title}</h3>
                <p className='text-sm text-gray-600'>{alt}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const q = query.q || '';
  const { hits } = await getHitsByAlgoliaSearch(q);

  return {
    props: { query: q, hits },
  };
}
