import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Button,
    MenuItem,
    Paper,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { type User, addUser, removeUser } from '../../redux/userSlice';

const UserManager: React.FC = () => {
    const dispatch = useDispatch();
    const users = useSelector((state: any) => state.users.users);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
            role: Yup.string().oneOf(['admin', 'user'], 'Invalid role').required('Role is required'),
        }),
        onSubmit: values => {
            const newUser: User = {
                id: `U${Date.now()}`,
                name: values.name,
                email: values.email,
                password: values.password,
                role: values.role as 'admin' | 'user',
            };
            dispatch(addUser(newUser));
            formik.resetForm();
        },
    });

    return (
        <div style={{ display: 'flex', gap: '2rem' }}>
            <form onSubmit={formik.handleSubmit} style={{ width: '300px' }}>
                <h3>Add User</h3>
                <TextField
                    name="name"
                    label="Name"
                    fullWidth
                    margin="normal"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && !!formik.errors.name}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    name="email"
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && !!formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && !!formik.errors.password}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                    name="role"
                    label="Role"
                    select
                    fullWidth
                    margin="normal"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    error={formik.touched.role && !!formik.errors.role}
                    helperText={formik.touched.role && formik.errors.role}
                >
                    {['admin', 'user'].map(role => (
                        <MenuItem key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                        </MenuItem>
                    ))}
                </TextField>
                <Button type="submit" variant="contained" fullWidth>
                    Add User
                </Button>
            </form>

            <Paper style={{ padding: '1rem', flexGrow: 1 }}>
                <h3>User List</h3>
                <List>
                    {users.map((user: User) => (
                        <ListItem key={user.id} secondaryAction={
                            <IconButton edge="end" onClick={() => dispatch(removeUser(user.id))}>
                                <DeleteIcon />
                            </IconButton>
                        }>
                            <ListItemText
                                primary={`${user.name} (${user.email})`}
                                secondary={`Role: ${user.role}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    );
};

export default UserManager;
