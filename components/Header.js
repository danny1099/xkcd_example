/* eslint-disable */
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';

export function Header() {
  const [data, setData] = useState([]);
  const searchRef = useRef();
  

  const handleChange = () => {
    const q = searchRef.current.value;
    
    /* Valida si existe un dato de busqueda escrito */
    q === '' 
      ? [] 
      : searchHitByAlgolia(q);

    console.log(data);
  };

  function searchHitByAlgolia(key) {
    fetch(`/api/search?q=${key}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result)
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
              ref={searchRef}
              className='text-xs border border-slate-200 px-4 py-2 w-72 rounded-xl'
            />

            <div className='relative z-10'>
              {Boolean(data.length) > 0 && (
                <div className='absolute top-0 left-0 bg-white w-72 flex flex-col shadow-xl border-gray-100 p-2'>
                  <ul>
                      <li key="all-results">
                        <Link
                          href={`/search?q${searchRef.current.value}`}
                          className='flex flex-row content-center text-sm text-gray-400 italic font-semibold'>
                            Ver {data.length} resultados
                        </Link>
                      </li>
                    
                    {data?.map((hit) => {
                      return (
                        <li key={hit.id}>
                          <Link
                            href={`/comic/${hit.id}`}
                            className='content-center text-xs ml-1 block'>
                            {hit.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
