import { doc, serverTimestamp, updateDoc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon, ExclamationIcon } from '@heroicons/react/outline';
import { addDoc, collection } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  useRef,
  useState,
} from 'react';
import { SetterOrUpdater } from 'recoil';
import { db, storage } from '../firebase';

interface Props {
  open: boolean;
  setOpen: SetterOrUpdater<boolean>;
}

const Modal: React.FC<Props> = ({ open, setOpen }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const captionRef = useRef<HTMLTextAreaElement>(null);
  const [selectedFile, setSelectedFile] = useState<
    string | ArrayBuffer | null | undefined
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { data: session } = useSession();

  const handleUploadButtonClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result);
    };
  };

  const addPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const caption = captionRef.current && captionRef.current.value;
    if (
      caption &&
      session?.user &&
      !loading &&
      typeof selectedFile === 'string'
    ) {
      setLoading(true);
      const post = await addDoc(collection(db, 'posts'), {
        username: session.user.username,
        caption,
        profileImage: session.user.image,
        timestamp: serverTimestamp(),
      });

      const imageRef = ref(storage, `posts/${post.id}/image`);
      await uploadString(imageRef, selectedFile as string, 'data_url');
      const downloadUrl = await getDownloadURL(imageRef);
      await updateDoc(doc(db, 'posts', post.id), {
        image: downloadUrl,
      });
      setLoading(false);
      setSelectedFile(null);
      setOpen(false);
    } else {
      setError('Add caption and image');
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        initialFocus={captionRef}
        onClose={setOpen}
      >
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom content-bg rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-8 text-center'>
              <form noValidate onSubmit={addPost} className='space-y-4'>
                <div className='flex justify-center'>
                  <button
                    type='button'
                    onClick={handleUploadButtonClick}
                    className='flex items-center justify-center h-14 w-14 rounded-full bg-red-100'
                  >
                    <CameraIcon
                      className='h-8 w-8 text-red-600'
                      aria-hidden='true'
                    />
                  </button>
                </div>
                <button onClick={handleUploadButtonClick}>
                  {selectedFile ? 'Change' : 'Upload a'} photo
                </button>
                {selectedFile && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedFile as string}
                    className='w-full object-contain rounded-md'
                    alt='Your selected file'
                  />
                )}
                <textarea
                  ref={captionRef}
                  placeholder="What's on your mind..."
                  className='w-full'
                  rows={2}
                />
                <input
                  type='file'
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className='hidden'
                />
                {error && (
                  <div className='px-3 py-2 bg-red-400 bg-opacity-50 text-red-900 dark:text-white rounded-md flex items-center'>
                    <div className='flex items-center justify-center h-10 w-10 rounded-full bg-red-100'>
                      <ExclamationIcon
                        className='h-6 w-6 text-red-600'
                        aria-hidden='true'
                      />
                    </div>
                    <h4 className='ml-3'>{error}</h4>
                  </div>
                )}
                <button
                  type='submit'
                  disabled={loading}
                  className='px-4 py-2 bg-red-500 hover:bg-red-600 transition w-full rounded-md focus:outline-none focus:ring-1 focus:ring-offset-transparent focus:ring-offset-1 focus:ring-red-600 text-white disabled:bg-red-200 disabled:text-gray-900 disabled:cursor-default relative'
                >
                  {loading && (
                    <div>
                      <svg
                        className='animate-spin h-5 m-0 absolute w-full'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        ></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                      </svg>
                    </div>
                  )}
                  <span className={loading ? 'opacity-0' : ''}>
                    Upload Post
                  </span>
                </button>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
