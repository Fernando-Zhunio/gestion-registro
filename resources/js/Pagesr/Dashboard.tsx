import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import {FaChalkboardTeacher} from 'react-icons/fa';

export default function Dashboard({ auth, countTeacher }: PageProps<{countTeacher: number}>) {
    return (
        <AuthenticatedLayout
            user={auth.user}

        >
            <Head title="Dashboard" />
            {/* 
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                    </div>
                </div>
            </div> */}

            <div className='text-gray-900 dark:text-gray-100 container mt-5'>
                <div> 
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm flex p-3">
                            <span className="px-2"><FaChalkboardTeacher size={80}/></span>
                            Total de Profesores {countTeacher}
                        </div>


                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm flex p-3">
                            <span className="px-2"><FaChalkboardTeacher size={80}/></span>
                            Total de Profesores
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm flex p-3">
                            <span className="px-2"><FaChalkboardTeacher size={80}/></span>
                            Total de Profesores
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm flex p-3">
                            <span className="px-2"><FaChalkboardTeacher size={80}/></span>
                            Total de Profesores
                        </div>

                        {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm flex p-3">
                            <span className="px-2"><FaChalkboardTeacher size={80}/></span>
                            Total de Profesores
                        </div> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
