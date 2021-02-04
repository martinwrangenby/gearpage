import React from 'react';
import Switch from '../../components/UI/Switch/Switch';

import './Settings.css';

const Settings = () => {
  return (
    <div className='PageContentBox'>
      <h1>
        Settings
      </h1>
      <p className='SettingsItem'>
          Show sold gear: <Switch orientation='horizontal'/></p>
      <p className='SettingsItem'>Display price in list: <Switch orientation='horizontal'/></p>
    </div>
  );
};

export default Settings;
