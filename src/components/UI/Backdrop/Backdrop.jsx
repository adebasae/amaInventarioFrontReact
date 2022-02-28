import React from 'react';

const backdrop = ({ show, clicked }) =>
  show ? (
    <div role="presentation" className="Backdrop" onClick={clicked} />
  ) : null;

export default backdrop;
