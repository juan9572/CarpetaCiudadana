import { useState, Fragment } from 'react';
import { encrypt } from '../util';
import { useNavigate } from "react-router-dom";
import useAuth from './useAuth';
import axios from 'axios';

import {
    Card,
    Input,
    Button,
    Typography,
    Alert
} from "@material-tailwind/react";

import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function AuthAdmins() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        errors: {
            username: false,
            password: false,
        },
    });

    const handleInputChange = (event) => {
        let name = event.target.name, value = event.target.value;
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [name]: value,
            errors: {
                ...prevFormValues.errors,
                [name]: false, // Restablecer el error del campo al editar
            },
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = {};
        if (!formValues.username || !formValues.password) {
            errors.username = !formValues.username;
            errors.password = !formValues.password;
            setFormValues((prevFormValues) => ({
                ...prevFormValues,
                errors,
            }));
            return;
        }

        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            errors: {
                username: false,
                password: false,
            },
        }));
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!passwordRegex.test(formValues.password)) {
            setFormValues({
                ...formValues,
                errors: { password: true },
            });
            return;
        }
        //Validar en el server que si exista
        const endpoint = 'http://localhost:5000/admin/login';
        const admin = {
            "name": encrypt(formValues.username),
            "password": encrypt(formValues.password)
        }
        axios.post(endpoint, admin)
            .then(response => {
                const data = response.data;
                auth.login({
                    'username': admin.username,
                    'type': encrypt("1"),
                    'token': data.access_token
                })
                navigate('/profile');
            })
            .catch(error => {
                setErrorText(error.response.data.message);
                setOpen(true);
            });
    };

    return (
        <>
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Log in
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Accede al sistema carpeta ciudadana
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col gap-6">
                        <Input
                            size="lg"
                            label="Username"
                            name="username"
                            value={formValues.username}
                            onChange={handleInputChange}
                            error={formValues.errors.username}
                        />
                        <Input
                            type="password"
                            size="lg"
                            label="Password"
                            name="password"
                            value={formValues.password}
                            onChange={handleInputChange}
                            error={formValues.errors.password}
                        />
                    </div>
                    <Button className="mt-6" fullWidth type="submit">
                        Log In
                    </Button>
                </form>
            </Card >
            <Fragment>
                <Alert
                    open={open}
                    color="red"
                    icon={<ExclamationTriangleIcon className="h-6 w-6" />}
                    onClose={() => setOpen(false)}>
                    {errorText}
                </Alert>
            </Fragment>
        </>
    );
}