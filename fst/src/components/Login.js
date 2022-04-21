import React from 'react';
import { TextField, FormControlLabel, Box, Typography, Avatar, Button, Link, Grid, Toolbar, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from './use-auth.js';

export const LoginForm = (props) => {
    const auth = useAuth();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        let signInResult = await auth.signin(data.get('email'), data.get('password'));
        console.log(signInResult);
    }
    return (
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5"> Sign in </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
                <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Sign In</Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2"> {"Don't have an account? Sign Up"}</Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export const LoginButton = (props) => {
    const auth = useAuth();
    const getButton = () => {
        if (auth.user === null) {
            return (<Link href="/login" variant="button" color="secondary">Login</Link>);
        }
        return (
            <>
                <Toolbar variant="dense">
                    <Link to={'/user'}>
                        {auth.user.username}
                        {auth.user.id}
                        {/* <IconButton>
                            <AccountCircleIcon color="secondary" />
                        </IconButton> */}
                    </Link>
                    <Button variant="text" color="secondary" component="span" onClick={() => auth.signout()}>Logout</Button>
                </Toolbar>
            </>
        );
    }
    return (
        <>    
            {getButton()}
        </>
    );

}

