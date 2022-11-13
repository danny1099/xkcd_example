import Head from 'next/head';
import { Footer } from './Footer';
import { Header } from './Header';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>XKCD APP | Comics for developers</title>
        <meta name='description' content='Comics for developers' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <main className='max-w-xl m-auto'>{children}</main>

      <Footer />
    </>
  );
}
