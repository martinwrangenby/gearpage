import React from 'react';
import Switch from '../../../components/UI/Switch/Switch';
import IconButton from '../../../components/UI/IconButton/IconButton';
import './InstrumentListActions.css';
import gearTypes from '../../../assets/gearTypes';

const InstrumentListActions = props => {
  const [showFilter, setShowFilter] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const handleClick = event => {
    if (!document.getElementById('FilterDropdown').contains(event.target) &&
      !document.getElementById('FilterButton').contains(event.target) &&
      !document.getElementById('InstrumentTable').contains(event.target)) {
      setShowFilter(false);
    }
  };
  //TODO: make the dropdown a component of its own?
  const dropdownContent = gearTypes.map(gearType => {
    return (
      <div key={gearType} className='DropdownContentWrapper'>
        <Switch centered activated clicked={() => props.filterGear(gearType)} />
        {gearType}
      </div>
    );
  });

  return (
    <React.Fragment>
      <div className='TableActions'>
        <IconButton
          type='fa fa-sliders'
          active={showFilter}
          clicked={() => {setShowFilter(!showFilter);}}
          id='FilterButton'/>
        <IconButton
          type='fa fa-plus'
          clicked={props.addInstrument}
          dataTestId='addNewInstrumentButton'/>
      </div>
      <div
        className={`DropdownContent${showFilter ? '' : ' hidden'}`}
        id='FilterDropdown'>
        {dropdownContent}
      </div>
    </React.Fragment>
  );
};

export default InstrumentListActions;
