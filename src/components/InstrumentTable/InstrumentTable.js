import React from 'react';
import './InstrumentTable.css';
import InstrumentTableItem from './InstrumentTableItem/InstrumentTableItem';


const InstrumentTable = ({ sortOrder, instruments, filter, sort }) => {

  const getClassNamesFor = (name) => {
    if (!sortOrder) {
      return;
    }
    return sortOrder.key === name ? sortOrder.direction : undefined;
  };

  const content = instruments.map((instrument) => {
    return (
      filter.includes(instrument.type)
        ? <InstrumentTableItem key={instrument.id} {...instrument}/>
        : null
    );
  });

  return (
    <table id='InstrumentTable'>
      <thead>
        <tr>
          <th className={getClassNamesFor('name')} style={{ width: '75%' }} onClick={() => sort('name')}>
            Name
          </th>
          <th className={getClassNamesFor('type')} style={{ width: '25%' }} onClick={() => sort('type')}>
            Type
          </th>
        </tr>
      </thead>
      <tbody>
        {content}
      </tbody>
    </table>
  );
};

export default InstrumentTable;
