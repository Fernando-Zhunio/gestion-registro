import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import {FaChalkboardTeacher} from 'react-icons/fa';
import {IoIosAdd} from 'react-icons/io';
export default function Dashboard({ auth, currentState }: PageProps<{currentState: any}>) {
    console.log(currentState);
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
                        <div className="items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm flex flex-col p-3">
                            <span className='text-7xl'>{currentState.number_teachers}</span>
                            <div className="px-2 flex items-center justify-center"><FaChalkboardTeacher size={30} className="mr-2" /> Profesores <button className='mx-2 bg-slate-500/60 rounded-full'><IoIosAdd  size={30}/></button></div>
                        </div>

                        <div className="items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm flex flex-col p-3">
                            <span className='text-7xl'>{currentState.number_students}</span>
                            <div className="px-2 flex items-center justify-center"><FaChalkboardTeacher size={30} className="mr-2" /> Total de Estudiantes</div>
                        </div>

                        <div className="items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm flex flex-col p-3">
                            <span className='text-7xl'>{currentState.number_teachers}</span>
                            <div className="px-2 flex items-center justify-center"><FaChalkboardTeacher size={30} className="mr-2" /> Total de Profesores</div>
                        </div>

                        <div className="items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm flex flex-col p-3">
                            <span className='text-7xl'>{currentState.number_teachers}</span>
                            <div className="px-2 flex items-center justify-center"><FaChalkboardTeacher size={30} className="mr-2" /> Total de Profesores</div>
                        </div>

                        

                       

                    

                        
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
