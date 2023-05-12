import React from 'react';
import { useNavigate } from 'react-router-dom';

const InstrumentTableItem = ({ id, name, type }) => {
  const navigate = useNavigate();
  const isSelected = () => {
    navigate({
      pathname: '/gearitem',
      search: `?id=${id}` });
  };
  return (
    <tr role='row' onClick={isSelected} id={id} name={name || ''}>
      <td role='cell'>
        {name}
      </td>
      <td role='cell'>
        {type}
      </td>
    </tr>
  );
};

export default InstrumentTableItem;
