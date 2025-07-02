import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './redux/taskSlice';
import projectReducer from './redux/projectSlice';
import userReducer from './redux/userSlice';
import authReducer from './redux/authSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        projects: projectReducer,
        users: userReducer,
        auth: authReducer,

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
