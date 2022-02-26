import React from 'react';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Loading from '../assets/components/Loading';

function Layout({ children }) {
  return (
    <>
      <Header />
      <Loading />
      <Container className="posicion"> {children} </Container>
    </>
  );
}

export default Layout;
