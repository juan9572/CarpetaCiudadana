import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from '../Auth/useAuth';
import axios from 'axios';

import {
    Card,
    Input,
    Button,
    Typography,
    Alert
} from "@material-tailwind/react";

import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { decrypt, encrypt } from '../util';

export default function Profile() {
    const auth = useAuth();
    const [open, setOpen] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [formValues, setFormValues] = useState({
        name: '',
        number_phone: '',
        address: '',
        errors: {
            name: false,
            number_phone: false,
            address: false
        },
    });

    useEffect(() => {
        // Function to fetch the ciudadano data from the backend
        const fetchCiudadano = async () => {
            try {
                const response = await axios.post("http://72.44.50.23:5000/ciudadano/get-ciudadano",
                    { 'cedula': auth.user.cedula },
                    {
                        headers: {
                            Authorization: "Bearer " + auth.user.token,
                        },
                    }
                );
                const ciudadanoData = response.data.message;
                setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    name: ciudadanoData.name,
                    number_phone: ciudadanoData.number_phone,
                    address: ciudadanoData.address
                }));
            } catch (error) {
                console.error("Error fetching ciudadano data:", error);
            }
        };

        fetchCiudadano();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [name]: value,
            errors: {
                ...prevFormValues.errors,
                [name]: false, // Reset the field error when editing
            },
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = {};
        if (!formValues.name || !formValues.number_phone || !formValues.address) {
            errors.name = !formValues.name;
            errors.number_phone = !formValues.number_phone;
            errors.address = !formValues.address;
            setFormValues((prevFormValues) => ({
                ...prevFormValues,
                errors,
            }));
            return;
        }

        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            errors: {
                name: false,
                number_phone: false,
                address: false
            },
        }));

        axios.put("http://72.44.50.23:5000/ciudadano/" + decrypt(auth.user.cedula),
        {
            name: encrypt(formValues.name),
            number_phone: encrypt(formValues.number_phone),
            address: encrypt(formValues.address)
        }, {
            headers: {
                Authorization: "Bearer " + auth.user.token,
            },
        }).then((response) => {

        }).catch((error) => {
            console.error("Error al borrar el archivo", error);
        });
    };

    return (
        <>
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="pink">
                    Perfil de Usuario
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col gap-6">
                        <Input
                            size="lg"
                            label="Nombre"
                            name="name"
                            value={formValues.name}
                            onChange={handleInputChange}
                            error={formValues.errors.name}
                        />
                        <Input
                            size="lg"
                            label="Número de teléfono"
                            name="number_phone"
                            value={formValues.number_phone}
                            onChange={handleInputChange}
                            error={formValues.errors.number_phone}
                        />
                        <Input
                            size="lg"
                            label="Dirección"
                            name="address"
                            value={formValues.address}
                            onChange={handleInputChange}
                            error={formValues.errors.address}
                        />
                    </div>
                    <Button className="mt-6" fullWidth type="submit">
                        Guardar cambios
                    </Button>
                </form>
            </Card>
            <Fragment>
                <Alert
                    open={open}
                    color="red"
                    icon={<ExclamationTriangleIcon className="h-6 w-6" />}
                    onClose={() => setOpen(false)}
                >
                    {errorText}
                </Alert>
            </Fragment>
        </>
    );
}
