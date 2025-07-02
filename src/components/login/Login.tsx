import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    TextField,
    Button,
    Paper,
    Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const users = useSelector((state: any) => state.users.users);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: (values, { setErrors }) => {
            const user = users.find((u: any) => u.email === values.email && u.password === values.password);
            console.log(user)
            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                navigate('/');
            } else {
                setErrors({ email: 'Invalid credentials', password: 'Invalid credentials' });
            }
        },
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
            <Paper elevation={3} style={{ padding: '2rem', width: '350px' }}>
                <Typography variant="h5" gutterBottom>Login</Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        margin="normal"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && !!formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        margin="normal"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && !!formik.errors.password}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '1rem' }}
                    >
                        Login
                    </Button>
                </form>
                <Typography variant="body2" color="textSecondary" style={{ marginTop: '1rem' }}>
                    <strong>Test Admin:</strong> admin@example.com / admin123<br />
                    <strong>Test User:</strong> ravi@example.com / password123
                </Typography>
            </Paper>
        </div>
    );
};

export default LoginPage;
