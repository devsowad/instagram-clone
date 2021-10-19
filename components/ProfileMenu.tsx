import { Menu, Transition } from '@headlessui/react';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import React from 'react';

interface Props {
  session: Session;
}

const ProfileMenu: React.FC<Props> = ({ session }) => {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button className='relative w-8 h-8 sm:w-10 sm:h-10'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={session.user?.image as string}
          alt='avatar'
          className='rounded-full'
        />
      </Menu.Button>

      <Transition
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg content-bg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            <div className='gray-300 block w-full text-left px-4 py-2 mb-2'>
              <p>{session.user?.name}</p>
              <p className='text-xs'>{session.user?.email}</p>
            </div>
            <Menu.Item>
              <button
                onClick={() => signOut()}
                className='gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 block w-full text-left px-4 py-2 text-sm'
              >
                Sign out
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileMenu;
