import React from 'react';
import './InstrumentTable.css';
import InstrumentTableItem from './InstrumentTableItem/InstrumentTableItem';


const InstrumentTable = props => {

  const getClassNamesFor = (name) => {
    if (!props.sortOrder) {
      return;
    }
    return props.sortOrder.key === name ? props.sortOrder.direction : undefined;
  };

  const content = props.instruments.map((instrument) => {
    return (
      props.filter.includes(instrument.type)
        ? <InstrumentTableItem key={instrument.id} {...instrument}/>
        : null
    );
  });

  return (
    <table id='InstrumentTable'>
      <thead>
        <tr>
          <th className={getClassNamesFor('name')} style={{ width: '75%' }} onClick={() => props.sort('name')}>
            Name
          </th>
          <th className={getClassNamesFor('type')} style={{ width: '25%' }} onClick={() => props.sort('type')}>
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
