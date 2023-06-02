import { useEffect, useState } from "react";
import {
    Checkbox,
    Button,
    Badge,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Alert,
    List,
    ListItem,
    Card,
    CardBody,
    Collapse,
    Switch,
    Typography
} from "@material-tailwind/react";
import axios from 'axios';
import useAuth from '../Auth/useAuth';
import { encrypt, decrypt } from "../util";
import {
    ShareIcon,
    DocumentArrowDownIcon,
    DocumentArrowUpIcon,
    DocumentMinusIcon,
    PencilSquareIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    XMarkIcon,
    DocumentMagnifyingGlassIcon
} from "@heroicons/react/24/solid";

export default function Carpeta() {
    const auth = useAuth();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [openNotifications, setOpenNotifications] = useState(false);
    const handleOpenNotifications = () => setOpenNotifications(!openNotifications);

    const [openShare, setOpenShare] = useState(false);
    const handleOpenShare = () => setOpenShare(!openShare);

    const [openUpload, setOpenUpload] = useState(false);
    const handleOpenUpload = () => setOpenUpload(!openUpload);

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(!openDelete);

    const [openPeticion, setOpenPeticion] = useState(false);
    const handleOpenPeticion = () => setOpenPeticion(!openPeticion);

    const [numberOfNotifications, setnumberOfNotifications] = useState(0);

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [archivo, setArchivo] = useState(null);
    const [temporal, setTemporal] = useState(false);

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isOneProductSelected, setIsOneProductSelected] = useState(false);
    const [isMoreThanOneProductSelected, setIsMoreThanOneProductSelected] = useState(false);

    const [email, setEmail] = useState("");

    const [notifications, setNotifications] = useState([]);

    const [frases, setFrases] = useState([]);
    const [emailPeticion, setEmailPeticion] = useState("");
    const [endPoint, setEndPoint] = useState("");

    const [openCollapseIndex, setOpenCollapseIndex] = useState(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    const handleEndPointChange = (event) => {
        setEndPoint(event.target.value);
    }

    const handleEmailPeticionChange = (event) => {
        setEmailPeticion(event.target.value);
    }

    const handleFraseChange = (event) => {
        if (event.key === "Enter") {
            const frase = event.target.value.trim();
            if (frase !== "") {
                setFrases([...frases, frase]);
                event.target.value = ""; // Limpiar el campo de texto
            }
        }
    };

    const handleDeleteFrase = (index) => {
        const nuevasFrases = [...frases];
        nuevasFrases.splice(index, 1);
        setFrases(nuevasFrases);
    };


    const handleCollapseToggle = (index) => {
        setOpenCollapseIndex(index === openCollapseIndex ? null : index);
        setSelectedItemIndex(index === selectedItemIndex ? null : index);
    };

    const handleToggleSelect = (product) => {
        if (selectedProducts.includes(product)) {
            setSelectedProducts((prevSelectedProducts) =>
                prevSelectedProducts.filter((p) => p !== product)
            );
        } else {
            setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, product]);
        }
    };

    const handleDownload = () => {
        selectedProducts.forEach((product) => {
            window.open(product.id, "_blank");
        });
    };

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);
    };

    const handleArchivoChange = (event) => {
        const file = event.target.files[0];
        setArchivo(file);
    };

    const handleSwitchChange = (event) => {
        setTemporal(event.target.checked);
    };

    const handleDelete = () => {
        const product = selectedProducts[0];
        const payload = {
            cedula: auth.user.cedula,
            id: encrypt(product.id),
        };
        axios.post("http://72.44.50.23:5001/docs/delete-file", payload, {
            headers: {
                Authorization: "Bearer " + auth.user.token,
            },
        }).then((response) => {
            setProducts((prevProducts) => prevProducts.filter((p) => p.id !== product.id));
            setSelectedProducts((prevSelectedProducts) => prevSelectedProducts.filter((p) => p.id !== product.id));
            handleOpenDelete();
        }).catch((error) => {
            console.error("Error al borrar el archivo", error);
        });
    };

    const rechazarPaquete = () => {
        const payload = {
            cedula: auth.user.cedula,
            id: encrypt(notifications[selectedItemIndex].id),
        };
        axios.post("http://72.44.50.23:5001/docs/rejectPeticion", payload, {
            headers: {
                Authorization: "Bearer " + auth.user.token,
            },
        }).then((response) => {
            setNotifications((prevNotifications) =>
                prevNotifications.filter((notification) => notification.id !== notifications[selectedItemIndex].id)
            );
            setnumberOfNotifications(numberOfNotifications - 1);
            handleOpenNotifications();
        }).catch((error) => {
            console.error("Error al rechazar la petición", error);
        });
    }

    const aceptarPaquete = () => {
        let docs = [];
        for (let i = 0; i < selectedProducts.length; i++) {
            docs.push(selectedProducts[i].id);
        }
        const payload = {
            cedula: auth.user.cedula,
            id: encrypt(notifications[selectedItemIndex].id),
            docs: docs
        };
        axios.post("http://72.44.50.23:5001/docs/acceptPeticion", payload, {
            headers: {
                Authorization: "Bearer " + auth.user.token,
            },
        }).then((response) => {
            setNotifications((prevNotifications) =>
                prevNotifications.filter((notification) => notification.id !== notifications[selectedItemIndex].id)
            );
            setnumberOfNotifications(numberOfNotifications - 1);
            handleOpenNotifications();
        }).catch((error) => {
            console.error("Error al aceptar la petición", error);
        });
    }

    const crearPeticion = () => {
        let encryptFrases = [];
        for(let i = 0; i < frases.length; i++){
            encryptFrases.push(encrypt(frases[i]));
        }
        const payload = {
            docs: encryptFrases,
            email: encrypt(emailPeticion),
            fromWho: encrypt(endPoint)
        };
        axios.post("http://72.44.50.23:5001/docs/generarPeticion", payload, {
            headers: {
                Authorization: "Bearer " + auth.user.token,
            },
        }).then((response) => {
            setEmailPeticion("");
            setEndPoint("");
            setFrases([]);
            handleOpenPeticion();
        }).catch((error) => {
            console.error("Error al aceptar la petición", error);
        });
    }

    const sendPaquete = () => {
        let request = {
            cedula: auth.user.cedula,
            to_whom: encrypt(email),
            files: {
                urls: [],
                name: [],
                descripcion: []
            }
        }
        for (let i = 0; i < selectedProducts.length; i++) {
            request.files.urls.push(encrypt(selectedProducts[i].id));
            request.files.name.push(encrypt(selectedProducts[i].name));
            request.files.descripcion.push(encrypt(selectedProducts[i].descripcion));
        }
        axios.post(
            "http://72.44.50.23:5001/docs/share-files",
            request,
            {
                headers: {
                    Authorization: "Bearer " + auth.user.token,
                },
            })
            .then((response) => {
                setEmail("");
                handleOpenShare();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const subirArchivos = () => {
        const formData = new FormData();
        formData.append("cedula", auth.user.cedula);
        formData.append("name", encrypt(nombre));
        formData.append("descripcion", encrypt(descripcion));
        formData.append("temp", temporal);
        formData.append("file", archivo);

        axios.post(
            "http://72.44.50.23:5001/docs/upload-file",
            formData,
            {
                headers: {
                    Authorization: "Bearer " + auth.user.token,
                },
            })
            .then((response) => {
                const newDoc = {
                    id: decrypt(response.data.message),
                    name: nombre,
                    descripcion: descripcion
                }
                setProducts((prevProducts) => [...prevProducts, newDoc]);
                setNombre("");
                setDescripcion("");
                setArchivo(null);
                setTemporal(false);
                handleOpenUpload();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        setIsOneProductSelected(selectedProducts.length === 1);
        setIsMoreThanOneProductSelected(selectedProducts.length >= 1);
    }, [selectedProducts]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "http://72.44.50.23:5001/docs/get-folder",
                    {
                        cedula: auth.user.cedula,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + auth.user.token,
                        },
                    }
                );
                const response_peticiones = await axios.post(
                    "http://72.44.50.23:5001/docs/get-peticiones",
                    {
                        cedula: auth.user.cedula,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + auth.user.token,
                        },
                    }
                )
                const decryptedProducts = response.data.folder.map((product) => ({
                    ...product,
                    id: decrypt(product.id),
                    name: decrypt(product.name),
                    descripcion: decrypt(product.descripcion),
                }));
                setProducts(decryptedProducts);
                setNotifications(response_peticiones.data.message)
                setnumberOfNotifications(response_peticiones.data.message.length)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Buscar por nombre..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="flex gap-2 mt-5 mb-10">
                    <Button disabled={!isOneProductSelected} onClick={handleDownload} className="flex items-center gap-3" color="green">
                        <DocumentArrowDownIcon strokeWidth={2} className="h-5 w-5" /> Descargar
                    </Button>
                    <Button onClick={handleOpenUpload} className="flex items-center gap-3" color="green">
                        <DocumentArrowUpIcon strokeWidth={2} className="h-5 w-5" /> Subir
                    </Button>
                    <Button disabled={!isMoreThanOneProductSelected} onClick={handleOpenShare} className="flex items-center gap-3">
                        <ShareIcon strokeWidth={2} className="h-5 w-5" /> Armar paquete
                    </Button>
                    <Badge content={numberOfNotifications > 0 ? numberOfNotifications : false} withBorder>
                        <Button disabled={!isMoreThanOneProductSelected} onClick={handleOpenNotifications} className="flex items-center gap-3" color="indigo">
                            <ChatBubbleOvalLeftEllipsisIcon strokeWidth={2} className="h-5 w-5" /> Notificaciones
                        </Button>
                    </Badge>
                    <Button onClick={handleOpenPeticion} className="flex items-center gap-3" color="orange">
                        <DocumentMagnifyingGlassIcon strokeWidth={2} className="h-5 w-5" /> Peticiones
                    </Button>
                    {
                        isOneProductSelected && (
                            <Button onClick={handleOpenDelete} className="flex items-center gap-3" color="red">
                                <DocumentMinusIcon strokeWidth={2} className="h-5 w-5" /> Borrar
                            </Button>
                        )
                    }
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {filteredProducts && filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="group rounded-lg bg-gray-50 border border-gray-300 hover:bg-blue-50 hover:border-gray-500"
                        >
                            <Checkbox
                                key={product.id}
                                checked={selectedProducts.includes(product)}
                                onChange={() => handleToggleSelect(product)}
                            />
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    src='https://img.freepik.com/iconos-gratis/pdf_318-148750.jpg'
                                    className="h-full w-full object-cover object-center"
                                    alt="Pdf image"
                                />
                            </div>
                            <h3 className="mt-4 text-lg text-gray-700">{product.name}</h3>
                            <p className="mt-1 text-sm font-medium text-gray-900 truncate">{product.descripcion}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Dialog open={openPeticion} handler={handleOpenPeticion}>
                <div className="flex items-center justify-between">
                    <DialogHeader>Crear petición</DialogHeader>
                    <XMarkIcon className="mr-3 h-5 w-5 cursor-pointer" onClick={handleOpenPeticion} />
                </div>
                <DialogBody divider className="h-[20rem] overflow-scroll">
                    <div className="grid gap-6">
                        <Input
                            label="Email"
                            value={emailPeticion}
                            onChange={handleEmailPeticionChange}
                        />
                        <Input
                            label="endpoint"
                            value={endPoint}
                            onChange={handleEndPointChange}
                        />
                        <Input
                            label="Lista"
                            onKeyUp={handleFraseChange}
                        />
                        <li>
                            <span className="font-bold">Documentos solicitados</span>
                        </li>
                        {frases && frases.map((frase, index) => (
                            <li className="flex items-center gap-3" key={index}>
                                <div className="flex-grow">
                                    <span>{frase}</span>
                                </div>
                                <button className="text-red-500" onClick={() => handleDeleteFrase(index)}>Eliminar</button>
                            </li>
                        ))}
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="outlined" color="red" onClick={handleOpenPeticion}>
                        Cancelar
                    </Button>
                    <Button variant="gradient" color="green" onClick={crearPeticion}>
                        Crear
                    </Button>
                </DialogFooter>
            </Dialog>
            <Dialog open={openShare} handler={handleOpenShare}>
                <div className="flex items-center justify-between">
                    <DialogHeader>Compartir con</DialogHeader>
                    <XMarkIcon className="mr-3 h-5 w-5 cursor-pointer" onClick={handleOpenShare} />
                </div>
                <DialogBody divider className="h-[20rem] overflow-scroll">
                    <div className="grid gap-6">
                        <Input
                            label="Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        Documentos a compartir:
                        {selectedProducts && selectedProducts.map((product, index) => (
                            <ul>
                                <li key={index}>- {product.name}</li>
                            </ul>
                        ))}
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="outlined" color="red" onClick={handleOpenShare}>
                        Cancelar
                    </Button>
                    <Button variant="gradient" color="green" onClick={sendPaquete}>
                        Compartir
                    </Button>
                </DialogFooter>
            </Dialog>
            <Dialog open={openUpload} handler={handleOpenUpload}>
                <div className="flex items-center justify-between">
                    <DialogHeader>Subir documento</DialogHeader>
                    <XMarkIcon className="mr-3 h-5 w-5 cursor-pointer" onClick={handleOpenUpload} />
                </div>
                <DialogBody divider>
                    <div className="grid gap-6">
                        <Switch
                            checked={temporal}
                            label="Documento temporal"
                            onChange={handleSwitchChange}
                        />
                        <Input
                            label="Nombre"
                            value={nombre}
                            onChange={handleNombreChange}
                        />
                        <Textarea
                            label="Descripción"
                            value={descripcion}
                            onChange={handleDescripcionChange}
                        />
                        <Input
                            label="Archivo"
                            type="file"
                            accept=".pdf"
                            onChange={handleArchivoChange}
                        />
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="outlined" color="red" onClick={handleOpenUpload}>
                        cancelar
                    </Button>
                    <Button variant="gradient" color="green" onClick={subirArchivos}>
                        subir archivo
                    </Button>
                </DialogFooter>
            </Dialog>
            <Dialog open={openNotifications} handler={handleOpenNotifications}>
                <div className="flex items-center justify-between">
                    <DialogHeader>Notificaciones</DialogHeader>
                    <XMarkIcon className="mr-3 h-5 w-5 cursor-pointer" onClick={handleOpenNotifications} />
                </div>
                <DialogBody divider className="h-[20rem] overflow-scroll">
                    <List>
                        {notifications && notifications.map((notification, index) => (
                            <ListItem onClick={() => handleCollapseToggle(index)} key={index}>
                                {notification.email}
                                <Checkbox
                                    checked={index === selectedItemIndex}
                                    onChange={() => handleCollapseToggle(index)}
                                />
                                <Collapse open={index === openCollapseIndex}>
                                    <Card className="my-4 mx-auto w-8/12">
                                        <CardBody>
                                            <ul>
                                                {notification.documentos && notification.documentos.map((doc) => (
                                                    <>
                                                        <li key={doc}>- {doc}</li>
                                                        <br />
                                                    </>
                                                ))}
                                            </ul>
                                        </CardBody>
                                    </Card>
                                </Collapse>
                            </ListItem>
                        ))}
                    </List>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button
                        disabled={notifications[selectedItemIndex] && selectedProducts.length !== notifications[selectedItemIndex].documentos.length} variant="outlined" color="red" onClick={rechazarPaquete}>
                        Rechazar
                    </Button>
                    <Button
                        disabled={notifications[selectedItemIndex] && selectedProducts.length !== notifications[selectedItemIndex].documentos.length} variant="gradient" color="green" onClick={aceptarPaquete}>
                        Mandar documentos
                    </Button>
                </DialogFooter>
            </Dialog>
            <Dialog open={openDelete} handler={handleOpenDelete}>
                <div className="flex items-center justify-between">
                    <DialogHeader>Borrar documento</DialogHeader>
                    <XMarkIcon className="mr-3 h-5 w-5 cursor-pointer" onClick={handleOpenDelete} />
                </div>
                <DialogBody divider>
                    <div className="grid gap-6">
                        <Typography>
                            Estas seguro que quieres borrar {selectedProducts[0] ? selectedProducts[0].name : ""}
                        </Typography>
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="outlined" color="red" onClick={handleOpenDelete}>
                        No
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleDelete}>
                        Si
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}
