// src/components/NavBar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Document Scanner and Organizer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
