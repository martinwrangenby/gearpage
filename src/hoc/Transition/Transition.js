import React from 'react';
import './Transition.css';

const Transition = props => {
  const [show, setShow] = React.useState(props.show);
  const [classNameExt, setClassNameExt] = React.useState('');

  React.useEffect(() => {
    if (show && !props.show) {
      setClassNameExt('Close');
      setTimeout(() => setShow(props.show), 180);
    } else if (!show && props.show) {
      setClassNameExt('Open');
      setShow(props.show);
    }
  }, [show, props.show]);

  return show
    ? (
      <div className={`TransitionContainer ${classNameExt}`}>
        <div className ={`Transition ${classNameExt}`}>
          {props.children}
        </div>
      </div>
    )
    : null;
};

export default Transition;
