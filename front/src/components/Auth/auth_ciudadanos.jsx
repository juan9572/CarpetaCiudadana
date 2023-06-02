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

export default function AuthCiudadano() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [open, setOpen] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [formValues, setFormValues] = useState({
        cedula: '',
        nombre: '',
        email: '',
        password: '',
        cel: '',
        direccion: '',
        errors: {
            cedula: false,
            nombre: false,
            email: false,
            password: false,
            cel: false,
            direccion: false
        },
    });

    const handleToggleMode = () => {
        setIsRegisterMode(!isRegisterMode);
        setFormValues(
            {
                cedula: '',
                nombre: '',
                email: '',
                password: '',
                cel: '',
                direccion: '',
                errors: {
                    cedula: false,
                    nombre: false,
                    email: false,
                    password: false,
                    cel: false,
                    direccion: false
                },
            }
        );
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
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
        const cedulaRegex = /^[0-9]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (isRegisterMode) {
            if (!formValues.cedula || !formValues.nombre || !formValues.email ||
                !formValues.password || !formValues.cel ||
                !formValues.direccion) {
                errors.cedula = !formValues.cedula;
                errors.nombre = !formValues.nombre;
                errors.email = !formValues.email;
                errors.password = !formValues.password;
                errors.cel = !formValues.cel;
                errors.direccion = !formValues.direccion;
                setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    errors,
                }));
                return;
            }
            if (!emailRegex.test(formValues.email)) {
                setFormValues({
                    ...formValues,
                    errors: { email: true },
                });
                return;
            }
            if (!cedulaRegex.test(formValues.cel)) {
                setFormValues({
                    ...formValues,
                    errors: { cel: true },
                });
                return;
            }
        } else {
            if (!formValues.cedula || !formValues.password) {
                errors.cedula = !formValues.cedula;
                errors.password = !formValues.password;
                setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    errors,
                }));
                return;
            }
        }

        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            errors: {
                cedula: false,
                nombre: false,
                email: false,
                password: false,
                cel: false,
                direccion: false
            },
        }));
        if (!cedulaRegex.test(formValues.cedula)) {
            setFormValues({
                ...formValues,
                errors: { cedula: true },
            });
            return;
        }
        if (!passwordRegex.test(formValues.password)) {
            setFormValues({
                ...formValues,
                errors: { password: true },
            });
            return;
        }
        //Validaciones de parte del server
        const ciudadano = {
            "cedula": encrypt(formValues.cedula),
            "name": encrypt(formValues.nombre),
            "email": encrypt(formValues.email),
            "password": encrypt(formValues.password),
            "operadorAsociado": encrypt("10005"),
            "number_phone": encrypt(formValues.cel),
            "address": encrypt(formValues.direccion),
            "carpeta": []
        }
        const endpoint = (isRegisterMode ?
            'http://72.44.50.23:5000/ciudadano/register' :
            'http://72.44.50.23:5000/ciudadano/login'
        );

        axios.post(endpoint, ciudadano)
            .then(response => {
                const data = response.data;
                auth.login({
                    'cedula': ciudadano.cedula,
                    'type': encrypt("0"),
                    'token': data.access_token
                })
                navigate('/carpeta');
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
                    {isRegisterMode ? 'Registrarse' : 'Log in'}
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    {isRegisterMode ? 'Registrate en carpeta ciudadana' : 'Accede al sistema carpeta ciudadana'}
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                    {isRegisterMode && (
                        <div className="mb-4 flex flex-col gap-6">
                            <div className="my-4 flex items-center gap-4">
                                <Input
                                    containerProps={{ className: "min-w-[72px]" }}
                                    label="Cedula"
                                    name="cedula"
                                    value={formValues.cedula}
                                    onChange={handleInputChange}
                                    error={formValues.errors.cedula}
                                />
                                <Input
                                    containerProps={{ className: "min-w-[72px]" }}
                                    label="Nombre"
                                    name="nombre"
                                    value={formValues.nombre}
                                    onChange={handleInputChange}
                                    error={formValues.errors.nombre}
                                />
                            </div>
                            <div className="flex space-x-4">
                                <Input
                                    containerProps={{ className: "min-w-[72px]" }}
                                    label="Email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                    error={formValues.errors.email}
                                />
                            </div>
                            <div className="my-4 flex items-center gap-4">
                                <Input
                                    containerProps={{ className: "min-w-[72px]" }}
                                    label="Número de teléfono"
                                    name="cel"
                                    value={formValues.cel}
                                    onChange={handleInputChange}
                                    error={formValues.errors.cel}
                                />
                                <Input
                                    containerProps={{ className: "min-w-[72px]" }}
                                    label="Dirección"
                                    name="direccion"
                                    value={formValues.direccion}
                                    onChange={handleInputChange}
                                    error={formValues.errors.direccion}
                                />
                            </div>
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
                    )}
                    {!isRegisterMode && (
                        <div className="mb-4 flex flex-col gap-6">
                            <Input
                                size="lg"
                                label="Cedula"
                                name="cedula"
                                value={formValues.cedula}
                                onChange={handleInputChange}
                                error={formValues.errors.cedula}
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
                    )}
                    <Button className="mt-6" fullWidth type="submit">
                        {isRegisterMode ? 'Register' : 'Log In'}
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        {isRegisterMode ? 'Ya tienes cuenta? ' : "No tienes cuenta? "}
                        <a
                            onClick={handleToggleMode}
                            className="font-medium text-blue-500 transition-colors hover:text-blue-700 cursor-pointer"
                        >
                            {isRegisterMode ? 'Log in' : 'Registrate'}
                        </a>
                    </Typography>
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