import type { NextPage } from 'next';
import Feed from '../components/Feed';
import Header from '../components/Header';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Modal from '../components/Modal';
import { useModalState } from '../atoms/modal';

const Home: NextPage = () => {
  const [open, setOpen] = useModalState();

  return (
    <div>
      <Header />

      <Feed />

      <Modal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Home;
