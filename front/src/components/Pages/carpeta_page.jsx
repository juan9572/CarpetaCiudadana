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
    List,
    ListItem,
    ListItemSuffix,
    Chip,
    Switch
} from "@material-tailwind/react";
import axios from 'axios';
import useAuth from '../Auth/useAuth';
import { decrypt } from "../util";
import {
    ShareIcon,
    ArrowDownTrayIcon,
    ArrowUpTrayIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    XMarkIcon
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

    const [numberOfNotifications, setnumberOfNotifications] = useState(0);

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [archivo, setArchivo] = useState(null);
    const [temporal, setTemporal] = useState(false);

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

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

    const subirArchivos = () => {
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("archivo", archivo);
        formData.append("esTemporal", temporal);
        console.log(archivo);
/*
        axios.post("http://localhost:5001/docs/upload", formData)
            .then((response) => {
                // Lógica para manejar la respuesta del servidor
                console.log(response.data);
            })
            .catch((error) => {
                // Lógica para manejar el error
                console.error(error);
            });*/
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:5001/docs/get-folder",
                    {
                        cedula: auth.user.cedula,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + auth.user.token,
                        },
                    }
                );
                const decryptedProducts = response.data.folder.map((product) => ({
                    ...product,
                    id: decrypt(product.id),
                    name: decrypt(product.name),
                    descripcion: decrypt(product.descripcion),
                }));
                setProducts(decryptedProducts);
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
                <div className="flex gap-3 mb-10">
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
                    <Button className="flex items-center gap-3">
                        <ArrowDownTrayIcon strokeWidth={2} className="h-5 w-5" /> Descargar
                    </Button>
                    <Button onClick={handleOpenUpload} className="flex items-center gap-3">
                        <ArrowUpTrayIcon strokeWidth={2} className="h-5 w-5" /> Subir
                    </Button>
                    <Button onClick={handleOpenShare} className="flex items-center gap-3">
                        <ShareIcon strokeWidth={2} className="h-5 w-5" /> Compartir
                    </Button>
                    <Badge content={numberOfNotifications > 0 ? numberOfNotifications : false} withBorder>
                        <Button onClick={handleOpenNotifications} className="flex items-center gap-3">
                            <ChatBubbleOvalLeftEllipsisIcon strokeWidth={2} className="h-5 w-5" /> Notificaciones
                        </Button>
                    </Badge>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="group rounded-lg bg-gray-50 border border-gray-300 hover:bg-blue-50 hover:border-gray-500"
                        >
                            <Checkbox key={product.id} />
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    src='https://img.freepik.com/iconos-gratis/pdf_318-148750.jpg'
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <h3 className="mt-4 text-lg text-gray-700">{product.name}</h3>
                            <p className="mt-1 text-sm font-medium text-gray-900 truncate">{product.descripcion}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Dialog open={openShare} handler={handleOpenShare}>
                <div className="flex items-center justify-between">
                    <DialogHeader>New message to @</DialogHeader>
                    <XMarkIcon className="mr-3 h-5 w-5 cursor-pointer" onClick={handleOpenShare} />
                </div>
                <DialogBody divider>
                    <div className="grid gap-6">
                        <Input label="Username" />
                        <Textarea label="Message" />
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="outlined" color="red" onClick={handleOpenShare}>
                        close
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpenShare}>
                        send message
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
                    <DialogHeader>New message to @</DialogHeader>
                    <XMarkIcon className="mr-3 h-5 w-5 cursor-pointer" onClick={handleOpenNotifications} />
                </div>
                <DialogBody divider>
                    <div className="grid gap-6">
                        <Input label="Username" />
                        <Textarea label="Message" />
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="outlined" color="red" onClick={handleOpenNotifications}>
                        close
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpenNotifications}>
                        send message
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}
