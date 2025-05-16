import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../../../hoc/Context/SettingsContext';

const InstrumentTableItem = ({ id, name, type, price }) => {
  const navigate = useNavigate();
  const isSelected = () => {
    navigate({
      pathname: '/gearitem',
      search: `?id=${id}` });
  };

  const { settings } = useSettings();
  const { showPrice } = settings;
  const priceColumn = showPrice ? (
    <td role="cell">
      {price ? `${price} kr` : ''}
    </td>
  ) : null;

  return (
    <tr role='row' onClick={isSelected} id={id} name={name || ''}>
      <td role='cell'>
        {name}
      </td>
      <td role='cell'>
        {type}
      </td>
      {priceColumn}
    </tr>
  );
};

export default InstrumentTableItem;
