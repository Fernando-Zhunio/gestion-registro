import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
export default function Dashboard({ auth, currentState }: PageProps<{ currentState: any }>) {
    return (
        <>
            <Head title="Dashboard" />
            {/* 
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                    </div>
                </div>
            </div> */}

            <div className=' container mt-5'>
                <div className='mb-5'>
                    <header className='text-5xl'>
                        Hola, <span className='text-emerald-600 capitalize'>{auth.user.name}</span>
                    </header>
                    <div>
                        <small className='text-gray-500 text-2xl'>{auth.user.email}</small>
                        <span></span>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="items-start rounded-lg shadow-lg flex flex-col p-3 bg-white">
                            <span className='text-7xl'>{currentState.number_teachers}</span>
                            <div className="px-2 flex items-center justify-between w-full">
                                <div className='flex items-center'>
                                <i className="fa-solid fa-chalkboard-user"></i>
                                    Profesores
                                </div>
                                <div className='flex gap-1'>
                                    <IconButton size='small' aria-label="add">
                                        <i className="fa-solid fa-plus"></i>
                                    </IconButton>
                                    <IconButton size='small' aria-label="add">
                                        <i className="fa-regular fa-eye"></i>
                                    </IconButton>
                                </div>
                            </div>
                        </div>

                        <div className="items-start rounded-lg shadow-lg flex flex-col p-3 bg-white">
                            <span className='text-7xl'>{currentState.number_teachers}</span>
                            <div className="px-2 flex items-center justify-between w-full">
                                <div className='flex items-center'>
                                <i className="fa-solid fa-chalkboard-user"></i>
                                    Profesores
                                </div>
                                <div className='flex gap-1'>
                                    <IconButton size='small' aria-label="add">
                                        <i className="fa-solid fa-plus"></i>
                                    </IconButton>
                                    <IconButton size='small' aria-label="add">
                                        <i className="fa-regular fa-eye"></i>
                                    </IconButton>
                                </div>
                            </div>
                        </div>

                        <div className="items-start rounded-lg shadow-lg flex flex-col p-3">
                            <span className='text-7xl'>{currentState.number_teachers}</span>
                            <div className="px-2 flex items-center justify-between w-full">
                                <div className='flex items-center'>
                                <i className="fa-solid fa-chalkboard-user"></i>
                                    Profesores
                                </div>
                                <div className='flex gap-1'>
                                    <IconButton size='small' aria-label="add">
                                        <i className="fa-solid fa-plus"></i>
                                    </IconButton>
                                    <IconButton size='small' aria-label="look">
                                        <Link href='/teachers'><i className="fa-regular fa-eye"></i></Link> 
                                    </IconButton>
                                </div>
                            </div>
                        </div>

                        <div className="items-start rounded-lg shadow-lg flex flex-col p-3">
                            <span className='text-7xl'>{currentState.number_teachers}</span>
                            <div className="px-2 flex items-center justify-between w-full">
                                <div className='flex items-center'>
                                <i className="fa-solid fa-chalkboard-user"></i>
                                    Profesores
                                </div>
                                <div className='flex gap-1'>
                                    <IconButton size='small' aria-label="add">
                                        <i className="fa-solid fa-plus"></i>
                                    </IconButton>
                                    <IconButton size='small' aria-label="add">
                                        <i className="fa-regular fa-eye"></i>
                                    </IconButton>
                                </div>
                            </div>
                        </div>










                    </div>
                </div>
            </div>
        </>
    );
}
