// src/Layout.tsx
import React from 'react';
import Nav from './components/nav';
import { useNavVisibility } from './context/NavVisibilityContext';

interface Props {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

const Layout: React.FC<Props> = ({ children, isLoggedIn }) => {
  const { showNav } = useNavVisibility();

  return (
    <>
      {showNav && <Nav />}
      {children}
    </>
  );
};

export default Layout;
