import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
export default function Dashboard({
    auth,
    currentState,
}: PageProps<{ currentState: any }>) {
    return (
        <>
            {/* <Head title="Dashboard" /> */}
            {/* 
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                    </div>
                </div>
            </div> */}

            <div className="container mt-5">
                <div>
                    <div className="text-center w-full my-4">
                        <img
                            src="/img/logo-colegio.jpeg"
                            className="w-40 h-40 inline-block fill-current text-gray-500 "
                        />
                    </div>
                    <h2 className="text-4xl text-center mb-4">
                        Bienvenido al <strong className="text-indigo-800">Colegio Mariano Valla</strong>
                    </h2>
                </div>
                <div className="mb-5">
                    <header className="text-3xl">
                        Hola,{" "}
                        <span className="text-emerald-600 capitalize">
                            {auth.user.name}
                        </span>
                    </header>
                    <div>
                        <small className="text-gray-500 text-2xl">
                            {auth.user.email}
                        </small>
                        <span></span>
                    </div>
                </div>
                <div className="px-5 py-4 bg-gray-100 rounded-lg">
                    <h3>VISION</h3>
                    <p>
                        La Unidad Educativa Intercultural Bilingüe Mariano Valla
                        Sagñay en el año 2022 será una institución orientada a
                        desarrollar la parte científica, investigativa y
                        práctica, la interculturalidad, la convivencia con el
                        medio ambiente y el emprendimiento, para elevar la
                        calidad de vida de la población del sector.
                    </p>
                    <h3>MISIÓN</h3>
                    <p>
                        {" "}
                        La Unidad Educativa Intercultural Bilingüe Mariano Valla
                        Sagñay, se dedica a la formación de estudiantes
                        creativos, innovadores, emprendedores, generadores del
                        conocimiento científico, cultural y ambiental; en
                        búsqueda permanente de la excelencia académica, para
                        beneficio personal, familiar y social.
                    </p>
                </div>
            </div>
        </>
    );
}
