import React from 'react';


import Backdrop from '../Backdrop/Backdrop'
import './Modal.css';

const modal = (props) => (
  <React.Fragment>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div 
      className="Modal" 
      style={{
        transform: props.show ? 'scale(1)' : 'scale(0)',
        opacity: props.show ? '1' : '0'}}>
      {props.children}
    </div>
  </React.Fragment>
);

export default React.memo(modal, (prevProps, nextProps) => {
  return prevProps.show === nextProps.show && prevProps.children === nextProps.children
});