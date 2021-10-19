import React from 'react';
import Image from 'next/image';
import useSuggestions from './useSuggestions';

interface Props {
  //
}

const Suggestions: React.FC<Props> = () => {
  const { suggestions } = useSuggestions(5);

  return (
    <div className='px-5'>
      <p className='gray-300'>Suggestions for you</p>
      {suggestions.map((s, i) => (
        <div key={i} className='flex items-center py-3'>
          <Image
            src={s.avatar}
            layout='fixed'
            alt='avatar'
            width={35}
            height={35}
            className='rounded-full'
          />
          <div className='flex-1 ml-2'>
            <p>{s.name}</p>
            <p className='text-sm gray-400'>{s.username}</p>
          </div>
          <button className='text-brand-600 dark:text-brand-500 hover:bg-brand-500 hover:text-white dark:hover:text-white px-3 py-2 rounded-3xl transition'>
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
