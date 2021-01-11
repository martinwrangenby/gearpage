import React from 'react';
import { useHistory } from 'react-router-dom';
const InstrumentTableItem = props => {
  const history = useHistory();
  const mos = () => {
    history.push({
      pathname: '/gearitem',
    search: `?id=${props.id}`})
  }
  return (
    <tr onClick={mos} id={props.id} name={props.name}>
      <td>
        {props.name}
      </td>
      <td>
        {props.type}
      </td>
    </tr>
  )
}

export default InstrumentTableItem;
