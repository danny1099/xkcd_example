/* eslint-disable */
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { basename } from 'path';
import { readFile, stat, readdir } from 'fs/promises';

export default function Comic({
  img,
  alt,
  title,
  width,
  height,
  hasPrevious,
  hasNext,
  prevComic,
  nextComic,
}) {
  return (
    <>
      <Head>
        <title>XKCD APP | {title}</title>
        <meta name='description' content={alt} />
      </Head>

      <section className='max-w-lg m-auto'>
        <div className='flex flex-col justify-center items-center'>
          <h1>{title}</h1>
          <div className='max-w-lg m-auto mb-4'>
            <Image
              layout='responsive'
              src={img}
              alt={alt}
              height={height}
              width={width}
            />
          </div>
          <p className='text-sm text-slate-800 mt-2 '>{alt}</p>
        </div>

        <div className='flex flex-row justify-between rounded-lg bg-gray-50 p-4 mt-4'>
          {hasPrevious && (
            <Link
              className='text-gray-600 font-semibold'
              href={`/comic/${prevComic}`}>
              ⬅ Previous
            </Link>
          )}

          {hasNext && (
            <Link
              className='text-gray-600 font-semibold'
              href={`/comic/${nextComic}`}>
              Next ➡
            </Link>
          )}
        </div>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const files = await readdir('./comics');

  /* NOTE: recorre cada nombre de fichero leido con el fs, se remueve la extesion con la libreria path */
  const paths = files.map((file) => {
    const id = basename(file, '.json');
    return { params: { id } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const content = await readFile(`./comics/${id}.json`, 'utf8');
  const comic = JSON.parse(content);

  /*  NOTE: Con este codigo se puede convertir un numero en string a number y validar previos y siguientes para
 una navegación */
  const idNumber = Number.parseInt(id);
  const prevComic = idNumber - 1;
  const nextComic = idNumber + 1;

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevComic}.json`),
    stat(`./comics/${nextComic}.json`),
  ]);

  /* NOTE: Valida si el array de promises tiene el estado fulfilled en ambas posiciones */
  const hasPrevious = prevResult.status === 'fulfilled';
  const hasNext = nextResult.status === 'fulfilled';

  return {
    props: { ...comic, hasPrevious, hasNext, prevComic, nextComic },
  };
}
