import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
  ShareIcon,
} from '@heroicons/react/outline';
import {
  addDoc,
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import Image from 'next/image';
import React, { FormEvent, useEffect, useState } from 'react';
import { db } from '../firebase';
import Moment from 'react-moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

interface Props {
  post: QueryDocumentSnapshot<DocumentData>;
  isLoginIn: boolean;
  username: string;
  userImage: string;
  userId: string;
}

const Post: React.FC<Props> = ({
  post,
  isLoginIn,
  username,
  userImage,
  userId,
}) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const commentCollection = collection(db, 'posts', post.id, 'comments');

  const addComment = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await addDoc(commentCollection, {
      comment,
      username,
      userImage,
      timestamp: serverTimestamp(),
    });
    setLoading(false);
    setComment('');
  };

  useEffect(
    () =>
      onSnapshot(
        query(commentCollection, orderBy('timestamp', 'desc')),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [commentCollection]
  );

  // TODO: Fix like post
  const like = async () => {
    await addDoc(collection(db, 'posts', post.id, 'likes', userId), {
      username,
    });
  };

  return (
    <div className='content-bg rounded-md shadow-lg border hover:shadow-xl transition'>
      <div className='flex items-center px-5 py-3'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.data().profileImage}
          alt='profile image'
          className='rounded-full w-12'
        />
        <div className='flex-1 ml-2'>
          <p>{post.data().username}</p>
          <Moment fromNow className='text-sm gray-300'>
            {post.data().timestamp?.toDate()}
          </Moment>
        </div>
        <button>
          <DotsHorizontalIcon className='w-5 gray-300' />
        </button>
      </div>

      <div className='relative w-full h-[380px]'>
        {post.data().image && (
          <Image
            src={post.data().image}
            layout='fill'
            objectFit='contain'
            alt='post image'
          />
        )}
      </div>

      <div className='flex justify-between px-5 py-2'>
        <div className='flex space-x-4'>
          <button
            onClick={like}
            className='text-red-600 flex items-center hover:text-red-700 dark:text-red-500 dark:hover:text-red-600'
          >
            <HeartIcon className='w-6 mr-1' />
            <p>1</p>
          </button>
          <div className='text-brand-700 dark:text-brand-500 flex'>
            <ChatIcon className='w-6 mr-1' />
            <p>{comments.length}</p>
          </div>
          <button className='gray-600 hover:gray-300 dark:hover:text-gray-400'>
            <ShareIcon className='w-6' />
          </button>
        </div>
        {isLoginIn && (
          <button className='gray-600 hover:gray-300 dark:hover:text-gray-400'>
            <BookmarkIcon className='w-6' />
          </button>
        )}
      </div>

      <p className='px-5 py-3'>{post.data().caption}</p>

      <PerfectScrollbar className='ml-10 mb-4 space-y-2 max-h-40 overflow-auto'>
        {comments?.map((c) => (
          <div key={c.id} className='flex space-x-2 items-center w-full'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.data().userImage}
              alt='profile image'
              className='rounded-full w-8'
            />
            <div>
              <h2 className='font-medium gray-400 leading-3'>
                {c.data().username}
              </h2>
              <Moment fromNow className='text-xs gray-300 leading-tight'>
                {c.data().timestamp?.toDate()}
              </Moment>
            </div>
            <p className='text-sm '>
              {c.data().comment.length > 80
                ? `${c.data().comment.substr(0, 80)}...`
                : c.data().comment}
            </p>
          </div>
        ))}
      </PerfectScrollbar>

      {isLoginIn && (
        <form onSubmit={addComment} className='flex items-center px-5 pb-5'>
          <EmojiHappyIcon className='w-8 h-8 block gray-600 mr-2' />
          <input
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='border-t-0 py-1 px-1 transition border-l-0 border-r-0 bg-transparent focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:ring-0 focus:border-brand-400 flex-1 default-style dark:placeholder-gray-400 w-[90%]'
            placeholder='Add a comment'
          />
          <button
            disabled={loading}
            className={`${loading && 'opacity-20'} disabled:cursor-not-allowed`}
          >
            <PaperAirplaneIcon className='ml-2 w-8 rotate-90 gray-300' />
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
