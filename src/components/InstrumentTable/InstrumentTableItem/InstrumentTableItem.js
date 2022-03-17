import React from 'react';
import { useHistory } from 'react-router-dom';

const InstrumentTableItem = props => {
  const history = useHistory();
  const isSelected = () => {
    history.push({
      pathname: '/gearitem',
      search: `?id=${props.id}` });
  };
  return (
    <tr role='row' onClick={isSelected} id={props.id} name={props.name}>
      <td role='cell'>
        {props.name}
      </td>
      <td role='cell'>
        {props.type}
      </td>
    </tr>
  );
};

export default InstrumentTableItem;
