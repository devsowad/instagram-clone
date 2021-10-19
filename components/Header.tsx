import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import {
  HomeIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon,
} from '@heroicons/react/solid';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import ProfileMenu from './ProfileMenu';
import useColorMode from './useColorMode';
import Link from 'next/link';
import { useModalState } from '../atoms/modal';

const Header: React.FC<{}> = () => {
  const { mode, toggleColorMode } = useColorMode();
  const [_, setOpen] = useModalState();

  const { data: session } = useSession();

  return (
    <header className='sticky top-0 border-b shadow-sm py-1 z-10 bg-gray-200 dark:bg-gray-800 dark:border-gray-600'>
      <div className='container mx-auto px-4 flex justify-between items-center max-w-6xl'>
        <Link href='/' passHref>
          <a className='relative w-48 hidden lg:block h-16'>
            <Image
              src='/instagram.svg'
              layout='fill'
              objectFit='cover'
              alt='site logo'
            />
          </a>
        </Link>
        <div className='relative w-12 h-12 lg:hidden'>
          <Image src='/instagram-icon.svg' layout='fill' alt='site logo' />
        </div>
        <div className='relative hidden sm:block'>
          <SearchIcon className='w-6 absolute top-2 left-2 text-gray-500 dark:text-gray-400 pointer-events-none' />
          <input type='search' placeholder='Search' className='pl-10' />
        </div>

        <div className='flex items-center space-x-3 sm:space-x-4'>
          <button className='header-icon sm:hidden'>
            <SearchIcon className='w-6 sm:w-8' />
          </button>
          <Link href='/' passHref>
            <a className='header-icon'>
              <HomeIcon className='w-5 sm:w-8' />
            </a>
          </Link>
          {session && (
            <>
              <button className='header-icon group'>
                <PaperAirplaneIcon className='w-5 sm:w-8 rotate-45' />
                <p className='absolute bg-brand-500 -top-1 -right-2 text-xs w-5 h-5 flex items-center justify-center text-white rounded-full group-hover:animate-ping'>
                  3
                </p>
              </button>
              <button onClick={() => setOpen(true)} className='header-icon'>
                <PlusCircleIcon className='w-5 sm:w-8' />
              </button>
            </>
          )}
          <button className='header-icon'>
            {mode ? (
              <MoonIcon onClick={toggleColorMode} className='w-5 sm:w-8' />
            ) : (
              <SunIcon onClick={toggleColorMode} className='w-5 sm:w-8' />
            )}
          </button>
          {session ? (
            <ProfileMenu session={session} />
          ) : (
            <button
              onClick={() => signIn()}
              className='relative w-8 h-8 sm:w-10 sm:h-10'
            >
              LOGIN
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
