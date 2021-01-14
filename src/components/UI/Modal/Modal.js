import React from 'react';


import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

const Modal = (props) => {
  const escFunction = React.useCallback((event) => {
    if(event.keyCode === 27) {
      props.modalClosed();
    }
  }, [props]);

  React.useEffect(() => {
    if (props.show) {
      document.addEventListener('keydown', escFunction, false);
      return () => {
        document.removeEventListener('keydown', escFunction, false);
      };
    }
  }, [escFunction, props.show]);

  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className="Modal"
        style={{
          transform: props.show ? 'scale(1)' : 'scale(0)',
          opacity: props.show ? '1' : '0' }}>
        {props.show ? props.children : null}
      </div>
    </React.Fragment>
  );
};

export default Modal;
