import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
    user: object | null
}

const initialState: UserState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },

    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer