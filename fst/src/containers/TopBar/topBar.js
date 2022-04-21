import React, { useState } from 'react';
import { AppBar, Grid, Toolbar } from '@mui/material';
import { LoginButton } from '../../components/Login.js';


const TopBar = (props) => {
    return (
        <AppBar>
            <Toolbar>
                <Grid container>
                    <Grid item xs={9}> FST </Grid>
                    <Grid item xs={3}> <LoginButton /> </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;

