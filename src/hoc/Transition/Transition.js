import React from 'react';
import './Transition.css';

const Transition = ({ show, orientation = 'North', children }) => {
  const [isShowed, setIsShowed] = React.useState(show);
  const [classNameExt, setClassNameExt] = React.useState('');

  React.useEffect(() => {
    if (isShowed && !show) {
      setClassNameExt('Close');
      setTimeout(() => setIsShowed(show), 180);
    } else if (!isShowed && show) {
      setClassNameExt('Open');
      setIsShowed(show);
    }
  }, [isShowed, show]);

  return isShowed
    ? (
      <div className={`TransitionContainer ${classNameExt}`}>
        <div className ={`Transition${orientation} ${classNameExt}`}>
          {children}
        </div>
      </div>
    )
    : null;
};

export default Transition;
