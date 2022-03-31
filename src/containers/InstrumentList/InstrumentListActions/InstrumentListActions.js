import React from 'react';
import Switch from '../../../components/UI/Switch/Switch';
import IconButton from '../../../components/UI/IconButton/IconButton';
import Transition from '../../../hoc/Transition/Transition';
import './InstrumentListActions.css';
import gearTypes from '../../../assets/gearTypes';

const InstrumentListActions = props => {
  const [showFilter, setShowFilter] = React.useState(false);
  React.useEffect(() => {
    if (showFilter) {
      document.addEventListener('mousedown', handleClick);
      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    }
  },[showFilter]);

  const handleClick = event => {
    if (!document.getElementById('FilterDropdown').contains(event.target) &&
      !document.getElementById('FilterButton').contains(event.target) &&
      !document.getElementById('InstrumentTable').contains(event.target)) {
      setShowFilter(false);
    }
  };

  const resetFilters = () => {
    setShowFilter(false);
    props.resetFilter();
  };

  return (
    <React.Fragment>
      <div className='TableActions'>
        <div style={{ display: 'flex' }}>
          <IconButton
            type='fa fa-sliders'
            active={showFilter}
            clicked={() => {setShowFilter(!showFilter);}}
            id='FilterButton'/>
          <Transition show={props.activeFilter.length !== gearTypes.length}>
            <div
              style={{ alignSelf: 'center', marginLeft: '5px', cursor: 'pointer' }}
              onClick={() => resetFilters()}>
              Reset Filters
            </div>
          </Transition>
        </div>
        <IconButton
          type='fa fa-plus'
          clicked={props.addInstrument}
          dataTestId='addNewInstrumentButton'/>
      </div>
      <Transition show={showFilter}>
        <div //TODO: make the dropdown a component of its own
          className='DropdownContent'
          id='FilterDropdown'>
          {gearTypes.map(gearType => {
            return (
              <div key={gearType} className='DropdownContentWrapper'>
                <Switch
                  centered
                  activated={props.activeFilter.includes(gearType)}
                  clicked={() => props.updateFilter(gearType)} />
                {gearType}
              </div>
            );
          })}
        </div>
      </Transition>
    </React.Fragment>
  );
};

export default React.memo(InstrumentListActions);
