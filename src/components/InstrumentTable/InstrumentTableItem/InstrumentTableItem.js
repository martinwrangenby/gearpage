import React from 'react';
import { useNavigate } from 'react-router-dom';

const InstrumentTableItem = props => {
  const navigate = useNavigate();
  const isSelected = () => {
    navigate({
      pathname: '/gearitem',
      search: `?id=${props.id}` });
  };
  return (
    <tr role='row' onClick={isSelected} id={props.id} name={props.name || ''}>
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
