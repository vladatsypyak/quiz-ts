import { createSlice } from '@reduxjs/toolkit'

export interface User {
    id: string;
    email: string;
    name: string;
}
export interface UserState {
    user: User | null
}


const initialState: UserState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: UserState, action):void => {
            state.user = action.payload
        },

    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer