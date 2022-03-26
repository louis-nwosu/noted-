import { FC } from 'react';

import { Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

import './Styles.css'

export const TopBar: FC = () => {
  return (
    <div className='topnav-container'>
      <p style={{ color: 'purple' }}>Noted</p>
      <div>
        <Box style={{ width: '100%', border: '1.5px solid purple', padding: '5px 20px', borderRadius: '4px' }}>
          <input type='text' className='topnav-input-container' placeholder='search...' />
        </Box>
      </div>
      <span style={{ display: 'flex', width: '100px', justifyContent: 'flex-end' }}>
        <Box mr={1}>
          <PersonIcon style={{ color: 'purple' }} />
        </Box>
        <Box ml={1}>
          <SettingsIcon style={{ color: 'purple' }} />
        </Box>
      </span>
    </div>
  )
}

export { TopBar as default }