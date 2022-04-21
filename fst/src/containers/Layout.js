import React from 'react';
import { Outlet } from 'react-router';
import { Container, ThemeProvider, createTheme } from '@mui/material';
import TopBar from './TopBar/topBar.js';
// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
};

const Layout = (props) => {
    const theme = createTheme(ThemeOptions);
    return (
        <ThemeProvider theme = {theme}>
            <Container maxWidth='xs'>
                <TopBar />
                <Outlet />
            </Container>
        </ThemeProvider>
    );
}

export default Layout;

