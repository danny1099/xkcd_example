import Link from 'next/link';

export function Header() {
  return (
    <header className='flex justify-between items-center p-4 max-w-xl m-auto'>
      <h1 className='font-bold'>
        <Link href='/' className='transition hover:opacity-70'>
          XKCD<span className='font-light'>Next</span>
        </Link>
      </h1>
      <nav>
        <ul className='flex flex-row gap-2'>
          <li className='text-sm font-semibold'>
            <Link href='/'>Home</Link>
          </li>
          <li className='text-sm font-semibold'>
            <Link href='/search'>Search</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
