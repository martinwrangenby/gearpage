import React from 'react';

const instrument = props => {
  return (
    <tr>
      <td>
        {props.name}
      </td>
      <td>
        {props.type}
      </td>
    </tr>
  )
}

export default instrument;
