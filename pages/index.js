import Head from 'next/head';
import { Header } from '../components/Header';
import fs from 'fs/promises';
import Link from 'next/link';
import Image from 'next/image';
import { Footer } from 'components/Footer';

export default function Home({ latestComics }) {
  return (
    <>
      <Head>
        <title>XKCD APP | Comics for developers</title>
        <meta name='description' content='Comics for developers' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <main>
        <h2 className='text-3xl font-bold text-center mb-10 text-gray-500'>
          Latest Comics for Devs
        </h2>
        <section className='grid grid-cols-1 gap-2 max-w-md m-auto sm:grid-cols-2 md:grid-cols-3'>
          {latestComics.map((comic) => {
            return (
              <Link
                href={`/comic/${comic.id}`}
                key={comic.id}
                className='mb-4 pb-4 m-auto'>
                <p className='font-semibold text-sm text-center'>
                  {comic.title}
                </p>
                <Image
                  src={comic.img}
                  alt={comic.alt}
                  height='300'
                  width='300'
                  lang='en'
                  objectFit='contain'
                />
              </Link>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const files = await fs.readdir('./comics');
  const latestComicsFiles = files.slice(-8, files.length);

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf8');
    return JSON.parse(content);
  });

  const latestComics = await Promise.all(promisesReadFiles);

  return {
    props: {
      latestComics,
    },
  };
}
