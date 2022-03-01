import React from 'react';
import './Modal.css';

// import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

function Modal({ show, modalClosed, children, classN }) {
  const modal = ['Modal'];

  return (
    <>
      <Backdrop show={show} clicked={modalClosed} />
      <div
        className={classN !== '' ? classN : modal}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0'
        }}
      >
        {children}
      </div>
    </>
  );
}
export default Modal;
