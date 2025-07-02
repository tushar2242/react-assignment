import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'admin' | 'user';

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: [
        {
            id: 'U01',
            name: 'Alice Johnson',
            email: 'alice@example.com',
            password: 'password123',
            role: 'admin',
        },
        {
            id: 'U02',
            name: 'Michael Smith',
            email: 'michael@example.com',
            password: 'password123',
            role: 'user',
        },
        {
            id: 'U03',
            name: 'Ravi Patel',
            email: 'ravi@example.com',
            password: 'password123',
            role: 'user',
        },

        {
            id: 'U01',
            name: 'Alice Johnson',
            role: 'admin',
            email: 'admin@example.com',
            password: 'admin123',
        },
        {
            id: 'U02',
            name: 'Bob Smith',
            role: 'user',
            email: 'user@example.com',
            password: 'user123',
        },
    ],
};


const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<User>) {
            state.users.push(action.payload);
        },
        removeUser(state, action: PayloadAction<string>) {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
    },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
