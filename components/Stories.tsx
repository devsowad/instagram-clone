import Image from 'next/image';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useSuggestions from './useSuggestions';

const Stories: React.FC<{}> = () => {
  const { suggestions } = useSuggestions(20);

  return (
    <PerfectScrollbar className='flex py-2 space-x-2 items-center overflow-x-scroll'>
      {suggestions.map((s, i) => (
        <div
          key={i}
          className='hover:scale-110 transition ease-out hover:animate-pulse flex flex-col justify-center cursor-pointer'
        >
          <div className='relative w-12 h-12'>
            <Image
              src={s.avatar}
              alt={s.name}
              layout='fill'
              objectFit='contain'
              className='story-image'
            />
          </div>
          <p className='sm w-14 truncate'>{s.username}</p>
        </div>
      ))}
    </PerfectScrollbar>
  );
};

export default Stories;
