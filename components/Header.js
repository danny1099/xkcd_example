/* eslint-disable */
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Header() {
  const [data, setData] = useState({ key: '', hits: [] });

  const handleChange = (e) => {
    setData({ key: e.target.value, hits: [] });
  };

  useEffect(() => {
    /* Solo ejecuta la busqueda cuando el largo del texto sea mayor a un minimo de caracteres */
    data.key.length >= 3 && searchHitByAlgolia(data.key);
  }, [data.key]);

  function searchHitByAlgolia(key) {
    fetch(`/api/search?q=${key}`)
      .then((res) => res.json())
      .then((result) => {
        setData({ ...data, hits: result });
      });
  }

  return (
    <header className='flex justify-between items-center p-4 max-w-xl m-auto'>
      <h1 className='font-bold'>
        <Link href='/' className='transition hover:opacity-70'>
          XKCD<span className='font-light'>Next</span>
        </Link>
      </h1>
      <nav>
        <ul className='flex flex-row gap-2 text-sm font-semibold'>
          <li className='relative'>
            <input
              type='search'
              placeholder='Buscar...'
              onChange={handleChange}
              className='text-xs border border-slate-200 p-1 w-72'
            />

            {data.hits.length > 0 && (
              <div className='absolute top-8 left-0 bg-white w-72 flex flex-col border border-slate-100 p-1'>
                <ul>
                  {data.hits.map((hit) => {
                    return (
                      <li key={hit.id}>
                        <Link
                          href={`/comic/${hit.id}`}
                          className='flex flex-row content-center h-12'>
                          <Image
                            src={hit.img}
                            alt={hit.alt}
                            width='30'
                            height='30'
                          />
                          <h4 className='text-xs ml-1'>{hit.title}</h4>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
