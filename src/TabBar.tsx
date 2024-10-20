import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

function TabBar({value, setValue}: {value: string, setValue: (newValue: string) => void}) {

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%', position: 'fixed', left:0, top: 0, zIndex: 1, gap: '10rem'}}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 10, borderColor: 'divider', alignSelf: 'center' }}>
            <TabList  onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Create" value="1" />
              <Tab label="Explore" value="2" />
              <Tab label="Account" value="3" />
            </TabList>
          </Box>
        </TabContext>
      </Box>
    </>
  );
}


export default TabBar;
