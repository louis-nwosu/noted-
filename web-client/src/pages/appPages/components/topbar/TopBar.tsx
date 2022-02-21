import { FC } from 'react';

import { Box } from '@mui/material';

import './Styles.css'

export const TopBar: FC = () => {
  return (
    <div className='topnav-container'>
      <p>Noted</p>
      <div>
        <Box style={{ width: '100%', border: '1.5px solid purple', padding: '5px 20px', borderRadius: '4px' }}>
          <input type='text' className='topnav-input-container' placeholder='search...' />
        </Box>
      </div>
      <span></span>
    </div>
  )
}

export { TopBar as default }