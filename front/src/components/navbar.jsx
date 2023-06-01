import React from "react";
import {
    Navbar,
    Typography,
    IconButton,
    Collapse,
} from "@material-tailwind/react";

import { NavLink } from "react-router-dom";
import useAuth from "./Auth/useAuth";

export default function NavbarComponent() {
    const auth = useAuth();
    const [openNav, setOpenNav] = React.useState(false);

    const handleLogout = () => {
        auth.logout()
    };

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                color="blue-gray"
                className="p-1 font-normal"
                variant="h6"
            >
                <NavLink to="/carpeta" className="flex items-center">
                    Carpeta
                </NavLink>
            </Typography>
            <Typography
                as="li"
                color="blue-gray"
                className="p-1 font-normal"
                variant="h6"
            >
                <NavLink to="/profile" className="flex items-center">
                    Perfil
                </NavLink>
            </Typography>
            {
                auth.user !== null ? (
                    <Typography
                        as="li"
                        color="blue-gray"
                        className="p-1 font-normal"
                        variant="h6"
                    >
                        <NavLink to="/" className="flex items-center" onClick={handleLogout}>
                            Log out
                        </NavLink>
                    </Typography>) : ''
            }
        </ul>
    );

    return (
        <>
            <Navbar className="inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="#"
                        className="mr-4 cursor-pointer py-1.5 font-medium"
                        variant="h5"
                    >
                        Carpeta Ciudadana
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>

                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <Collapse open={openNav}>
                    {navList}
                </Collapse>
            </Navbar>
        </>
    );
}