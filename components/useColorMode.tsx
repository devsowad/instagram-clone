import { useEffect, useState } from 'react';

const useColorMode = () => {
  const [mode, setMode] = useState('');

  const toggleColorMode = () => {
    const elm = document.querySelector('html')!.classList;
    const isDark = elm.contains('dark');
    if (isDark) {
      setMode('');
      localStorage.setItem('colorMode', '');
      elm.remove('dark');
    } else {
      localStorage.setItem('colorMode', 'dark');
      setMode('dark');
      elm.add('dark');
    }
  };

  useEffect(() => {
    const c = localStorage.getItem('colorMode') as string;
    const elm = document.querySelector('html')!.classList;
    if (c === 'dark') {
      setMode('dark');
      elm.add('dark');
    }
  }, []);

  return { toggleColorMode, mode };
};

export default useColorMode;
