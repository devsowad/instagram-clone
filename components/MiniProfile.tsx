import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import React from 'react';

interface Props {
  session: Session;
}

const MiniProfile: React.FC<Props> = ({ session }) => {
  return (
    <div className='flex items-center px-5 py-3'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={session.user?.image as string}
        alt='avatar'
        className='w-10 h-10 rounded-full'
      />
      <div className='flex-1 ml-2'>
        <p>{session.user?.name}</p>
        <p className='text-sm gray-400'>{session.user?.username}</p>
      </div>
      <button
        onClick={() => signOut()}
        className='gray-500 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-3xl transition'
      >
        Sign out
      </button>
    </div>
  );
};

export default MiniProfile;
