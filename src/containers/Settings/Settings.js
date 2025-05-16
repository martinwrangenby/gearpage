import React from 'react';
import Switch from '../../components/UI/Switch/Switch';
import { useSettings } from '../../hoc/Context/SettingsContext';

import './Settings.css';

const Settings = () => {
  const { settings ,updateSettings } = useSettings();
  const { showPrice } = settings;
  console.log(showPrice);
  return (
    <div className='PageContentBox'>
      <h1 className='PageContentHeader'>
        Settings
      </h1>
      <p className='SettingsItem'>
          Show sold gear: <Switch orientation='horizontal'/></p>
      <p className='SettingsItem'>
        Display price in list:
        <Switch
          orientation='horizontal'
          activated={showPrice}
          clicked={() => updateSettings({ showPrice: !showPrice })}/>
      </p>
    </div>
  );
};

export default Settings;
