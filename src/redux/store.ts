
import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./slices/userSlice";
import quizzesSlice from "./slices/quizzesSlice";



export const store = configureStore({
    reducer: {
        userSlice: userSlice,
        quizzesSlice: quizzesSlice, // Add the quizzes slice to the store
    }

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
