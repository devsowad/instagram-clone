import type { GetServerSideProps, NextPage } from 'next';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import Header from '../../components/Header';
import Image from 'next/image';

interface Props {
  providers: ClientSafeProvider;
}

const Signin: NextPage<Props> = ({ providers }) => {
  return (
    <div>
      <Header />
      <div className='container px-4 mx-auto flex justify-center items-center flex-col min-h-screen -mt-16'>
        <div className='relative w-80 h-20'>
          <Image
            src='/instagram.svg'
            layout='fill'
            objectFit='cover'
            alt='site logo'
          />
        </div>
        <p className='my-6 gray-300 text-center'>
          This is not a REAL app, it is built for educational purposes only
        </p>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className='bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-3xl transition'
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return { props: { providers } };
};

export default Signin;
