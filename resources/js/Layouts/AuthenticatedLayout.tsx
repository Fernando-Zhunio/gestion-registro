import { useState, PropsWithChildren, ReactNode, useEffect, useContext } from "react";
// import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
// import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
// import { User } from "@/types";
import Sidebar from "@/Components/Sidebar";
import axios from "axios";
// import { useFetch } from "@/Hooks/UseFetch";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AppContext } from "@/Context/AppContext";
import { IPeriod } from "@/Models/period";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    // const { data: auth } = useFetch("/auth-info");
    const {setAppInfo, setRole} = useContext(AppContext);
    const [period, setPeriod] = useState<IPeriod | null>(null);
    const [auth, setAuth] = useState<any | null>(null);
    useEffect(() => {
        axios
            .get("/auth-info")
            .then((res) => {
                console.log({res: res.data.user });
                setAuth(res.data)
                console.log(res.data.user.roles[0].name)
                setRole(res.data.user.roles[0].name)
                if (!res.data.user.roles[0].name) {
                alert('No se puede obtener la información del usuario');
                throw 'No se puede obtener la información del usuario';
                }
                setAppInfo(res.data)
                setPeriod(res.data.currentState.period)
            })
            .catch((err) => {
                alert('No se puede obtener la información del usuario');
                throw err;
            });
            console.log({ auth });
    }, []);
    return (
            <>
                <div className="min-h-screen">
                    <nav className="border-b border-gray-100 header-main">
                        <div className=" mx-auto px-4 sm:px-6 lg:px-4">
                            <div className="flex justify-between h-16 w-full">
                                <div className="flex">
                                    <div className="shrink-0 flex items-center uppercase font-bold">
                                        <Link href="/">
                                           {/* <img src="/img/logo-colegio.jpeg" className="block h-9 w-auto fill-current" /> */}
                                           Unidad Educativa Mariano Valla 
                                        </Link>
                                    </div>

                                    {/* <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                            </div> */}
                                </div>

                                <div className="hidden sm:flex sm:items-center sm:ml-6">
                                    <div className="ml-3 relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500  bg-white  hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        {auth?.user.name}

                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                {/* <Dropdown.Link
                                                    href={route("profile.edit")}
                                                >
                                                    Profile
                                                </Dropdown.Link> */}
                                                <Dropdown.Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                    <div className="ml-3 relative">
                                        {period?.promotion}
                                    </div>
                                </div>

                                <div className="-mr-2 flex items-center sm:hidden">
                                    <button
                                        onClick={() =>
                                            setShowingNavigationDropdown(
                                                (previousState) => !previousState
                                            )
                                        }
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                    >
                                        <svg
                                            className="h-6 w-6"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                className={
                                                    !showingNavigationDropdown
                                                        ? "inline-flex"
                                                        : "hidden"
                                                }
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                            <path
                                                className={
                                                    showingNavigationDropdown
                                                        ? "inline-flex"
                                                        : "hidden"
                                                }
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div
                            className={
                                (showingNavigationDropdown ? "block" : "hidden") +
                                " sm:hidden"
                            }
                        >
                            <div className="pt-2 pb-3 space-y-1">
                                <ResponsiveNavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </ResponsiveNavLink>
                            </div>

                            <div className="pt-4 pb-1 border-t border-gray-200">
                                <div className="px-4">
                                    <div className="font-medium text-base text-gray-800">
                                        {auth?.user.name}
                                    </div>
                                    <div className="font-medium text-sm text-gray-500">
                                        {auth?.user.email}
                                    </div>
                                </div>

                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink href={route("profile.edit")}>
                                        Profile
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        method="post"
                                        href={route("logout")}
                                        as="button"
                                    >
                                        Log Out
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        </div>
                    </nav>

                    {header && (
                        <header className="bg-white">
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}

                    <main>
                        <Sidebar items={auth?.sidebar?.links || []} />
                        <div
                            style={{ marginLeft: "200px" }}
                            className="pt-2 app-main"
                        >
                            {children}
                        </div>
                    </main>
                </div>
            </>
    );
}
