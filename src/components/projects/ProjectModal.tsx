import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    InputLabel,
    FormControl,
    OutlinedInput,
    Select,
    Chip,
    Box,
} from '@mui/material';
import { addProject, type Project } from '../../redux/projectSlice';
import type { Task } from '../../redux/taskSlice';
import QuillEditor from '../editor/RichTextEditor';

interface Props {
    open: boolean;
    onClose: () => void;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Project name is required'),
    description: Yup.string().required('Description is required'),
    tasks: Yup.mixed(),
    assignedTo: Yup.string().required('Assigned user is required'),
});

const ProjectFormModal: React.FC<Props> = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const users = useSelector((state: any) => state.users.users);
    const taskOptions = useSelector((state: any) => state.tasks.tasks);

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            taskCount: '',
            assignedTo: '',
            tasks: [] as any,
        },
        validationSchema,
        onSubmit: (values) => {
            const selectedTasks = taskOptions.filter((task: Task) =>
                values.tasks.includes(task.id)
            );

            const newProject: Project = {
                id: `P${Date.now()}`,
                name: values.name,
                description: values.description,
                assignedTo: values.assignedTo,
                tasks: selectedTasks, // store full Task objects
            };
            dispatch(addProject(newProject));
            onClose();
            formik.resetForm();
        },

    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Add New Project</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="name"
                        label="Project Name"
                        fullWidth
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={!!formik.errors.name && formik.touched.name}
                        helperText={formik.touched.name && formik.errors.name}

                    />

                    <div style={{ marginTop: 16 }}>
                        <InputLabel>Description</InputLabel>
                        <QuillEditor
                            value={formik.values.description}
                            onChange={(val) => formik.setFieldValue('description', val)}
                        />


                        {formik.touched.description && formik.errors.description && (
                            <p style={{ color: 'red', fontSize: 13 }}>{formik.errors.description}</p>
                        )}
                    </div>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Tasks</InputLabel>
                        <Select
                            multiple
                            value={formik.values.tasks}
                            onChange={(e) => formik.setFieldValue('tasks', e.target.value)}
                            input={<OutlinedInput label="Tasks" />}
                            renderValue={(selected: any) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value: string) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {taskOptions.map((task: Task) => (
                                <MenuItem key={task.id} value={task.id}>
                                    {task.title}
                                </MenuItem>
                            ))}
                        </Select>
                        {/* {formik.touched.tasks && formik.errors.tasks && (
                            <p style={{ color: 'red', fontSize: 13 }}>{formik.errors.tasks}</p>
                        )} */}
                    </FormControl>

                    <TextField
                        margin="dense"
                        name="assignedTo"
                        label="Assigned To"
                        select
                        fullWidth
                        value={formik.values.assignedTo}
                        onChange={formik.handleChange}
                        error={!!formik.errors.assignedTo && formik.touched.assignedTo}
                        helperText={formik.touched.assignedTo && formik.errors.assignedTo}
                    >
                        {users.map((user: any) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.name} — {user.role}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', mb: 3 }}>
                    <Button type="submit" variant="contained">Add</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ProjectFormModal;
