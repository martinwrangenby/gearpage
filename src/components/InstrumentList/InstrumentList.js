import React from 'react';
import './InstrumentList.css';
import Instrument from './Instrument/Instrument';


const instrumentList = props => {

  const getClassNamesFor = (name) => {
    if (!props.sortOrder) {
      return;
    }
    return props.sortOrder.key === name ? props.sortOrder.direction : undefined;
  }

  const content = props.instruments.map((instrument) => {
    return (
    <Instrument key={instrument.id} {...instrument}/>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() =>props.sort('name')}>
            Name {getClassNamesFor('name')}
          </th>
          <th onClick={() =>props.sort('type')}>
            Type {getClassNamesFor('type')}
          </th>
        </tr>
      </thead>
      <tbody>
        {content}
      </tbody>
    </table>
  )
}

export default instrumentList;
