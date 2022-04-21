import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        username: '',
    },
    reducers: {
        logIn: state => {
            state.loggedIn = true;
        },
        logOut: state => {
            state.loggedIn = false
        },
        setUserInfo: (state, action) => {
            state.username += action.payload
        }
    }
});

export const { logIn, logOut, setUserInfo } = userSlice.actions

export default userSlice.reducer