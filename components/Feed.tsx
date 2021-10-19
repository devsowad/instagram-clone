import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from '@firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import MiniProfile from './MiniProfile';
import Post from './Post';
import Stories from './Stories';
import Suggestions from './Suggestions';

const Feed: React.FC<{}> = () => {
  const { data: session } = useSession();

  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    []
  );

  return (
    <main className='container mx-auto px-2 grid grid-cols-1 md:grid-cols-3 max-w-6xl gap-6 py-8'>
      <section className='col-span-1 md:col-span-2'>
        <div>
          <Stories />
        </div>
        <div className='pt-8 max-w-xl space-y-8 mx-auto'>
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              isLoginIn={!!session?.user}
              username={session?.user?.username!}
              userImage={session?.user?.image!}
              userId={session?.user?.uid!}
            />
          ))}
        </div>
      </section>
      <section className='hidden md:block'>
        <div className='fixed top-20 overflow-y-auto h-3/4 mt-8 space-y-6'>
          {session && <MiniProfile session={session} />}
          <Suggestions />
        </div>
      </section>
    </main>
  );
};

export default Feed;
