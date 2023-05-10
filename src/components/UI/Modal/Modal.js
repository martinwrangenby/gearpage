import React from 'react';


import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

const Modal = ({
  show = true,
  modalClosed = () => null,
  children,
  dataTestId = undefined,
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
        className="Modal"
        style={{
          transform: show ? 'scale(1)' : 'scale(0)',
          opacity: show ? '1' : '0' }}
        data-testid={dataTestId}>
        {show ? children : null}
      </div>
    </React.Fragment>
  );
};

export default Modal;
