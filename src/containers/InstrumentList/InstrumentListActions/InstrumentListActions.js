import React from 'react';
import Switch from '../../../components/UI/Switch/Switch';
import IconButton from '../../../components/UI/IconButton/IconButton';
import Transition from '../../../hoc/Transition/Transition';
import './InstrumentListActions.css';
import gearTypes from '../../../assets/gearTypes';

const InstrumentListActions = ({
  activeFilter,
  resetFilter,
  addInstrument,
  updateFilter,
}) => {
  const [showFilter, setShowFilter] = React.useState(false);
  React.useEffect(() => {
    if (showFilter) {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleClick);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [showFilter]);

  const handleClick = (event) => {
    const filterDropdown = document.getElementById('FilterDropdown');
    const filterButton = document.getElementById('FilterButton');
    const instrumentTable = document.getElementById('InstrumentTable');

    if (
      filterDropdown &&
      filterButton &&
      instrumentTable &&
      !filterDropdown.contains(event.target) &&
      !filterButton.contains(event.target) &&
      !instrumentTable.contains(event.target)
    ) {
      setShowFilter(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setShowFilter(false);
    }
  };

  const resetFilters = () => {
    setShowFilter(false);
    resetFilter();
  };

  return (
    <>
      <div className="InstrumentListActions" role="region" aria-label="Instrument actions">
        <div style={{ display: 'flex' }}>
          <IconButton
            type="fa fa-sliders"
            active={showFilter}
            clicked={() => setShowFilter(!showFilter)}
            id="FilterButton"
            aria-haspopup="menu"
            aria-expanded={showFilter}
            aria-controls="FilterDropdown"
            label="Toggle filter menu"
          />
          <Transition orientation="South" show={activeFilter.length !== gearTypes.length}>
            <button
              type="button"
              className='ResetButton'
              style={{ alignSelf: 'center', marginLeft: '5px', cursor: 'pointer' }}
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </Transition>
        </div>
        <IconButton type="fa fa-plus" clicked={addInstrument} label="Add new instrument" />
      </div>
      <Transition show={showFilter}>
        <div
          className="DropdownContent"
          id="FilterDropdown"
          aria-label="Gear type filter options"
          tabIndex={-1}
        >
          {gearTypes.map((gearType) => (
            <div key={gearType} className="DropdownContentWrapper" role="none">
              <Switch
                centered
                activated={activeFilter.includes(gearType)}
                clicked={() => updateFilter(gearType)}
                label={`${gearType} filter`}
                role="menuitemcheckbox"
                aria-checked={activeFilter.includes(gearType)}
              />
              <span>{gearType}</span>
            </div>
          ))}
        </div>
      </Transition>
    </>
  );
};

export default React.memo(InstrumentListActions);
