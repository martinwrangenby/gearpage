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
      {props.show ? props.children : null}
    </div>
  </React.Fragment>
);

export default modal;
