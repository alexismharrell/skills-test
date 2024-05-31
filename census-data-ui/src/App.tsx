import React, { useState } from 'react';
import './App.css';
import CensusDataTable from './CensusDataTable';
import { Button, Menu, MenuItem } from '@mui/material'
import { stateFIPSCodes } from './constants.js'
import styled from '@emotion/styled';

const StateButton = styled(Button)`
  border-bottom: 2px solid white;
  color: white;
  font-size: 30px;
  margin: 5px 10px 0px 10px;
`

function App() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedStateCode, setSelectedStateCode] = useState(stateFIPSCodes[0])
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (stateCode: {code: string, name: string, abbreviation: string}) => {
    setSelectedStateCode(stateCode)
    setAnchorEl(null)
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  let stateButton = (
    <>
      <StateButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {selectedStateCode.name}
      </StateButton>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {stateFIPSCodes.map((state) => (
          <MenuItem
            key={state.code}
            selected={state.code === selectedStateCode.code}
            onClick={() => handleMenuItemClick(state)}
          >
            {state.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
  return (
    <div>
      <header className="App-header">
        Spanish Speakers in {stateButton} (from 2022 ACS Data)
      </header>
      <div className="App">
        <CensusDataTable stateCode={selectedStateCode.code}/>
      </div>
    </div>
  );
}

export default App;
