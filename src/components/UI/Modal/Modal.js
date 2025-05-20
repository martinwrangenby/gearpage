import React from 'react';


import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

const Modal = ({
  show = true,
  modalClosed = () => null,
  children,
  title = '',
}) => {
  const escFunction = React.useCallback((event) => {
    if(event.keyCode === 27) {
      modalClosed();
    }
  }, [modalClosed]);

  React.useEffect(() => {
    if (show) {
      document.addEventListener('keydown', escFunction, false);
      return () => {
        document.removeEventListener('keydown', escFunction, false);
      };
    }
  }, [escFunction, show]);

  return (
    <React.Fragment>
      <Backdrop show={show} clicked={modalClosed} />
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby="modal-title"
        className="Modal"
        style={{
          transform: show ? 'scale(1)' : 'scale(0)',
          opacity: show ? '1' : '0' }}>
        <h1 id='modal-title'>
          {title}
        </h1>
        {show ? children : null}
      </div>
    </React.Fragment>
  );
};

export default Modal;
