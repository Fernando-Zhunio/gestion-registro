import { SearchPaginator } from "@/Components/Paginator";
import { PaginatorEvent, ResponsePaginator } from "@/types/global";
import { router, usePage } from "@inertiajs/react";
import { TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import CreateOrEditUserAdministrative from "./CreateOrEditUserAdministrative";
import { showQuestion, showToast } from "@/Helpers/alerts";

export interface IUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    roles: IRole[];
}

export interface IRole {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    pivot: IPivot;
}

export interface IPivot {
    model_id: number;
    role_id: number;
    model_type: string;
}
export default function TableUsersAcademic() {

    const [user, setUser] = useState<IUser | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);
    function onData(data: any) {
        console.log({ data });
    }
    const { props } = usePage<any>();
    const [paginator, setPaginator] = useState<PaginatorEvent>({
        page: props.data.from,
        pageSize: props.data.per_page,
        length: props.data.total,
    });

    useEffect(() => {
        setPaginator({
            page: props.data.from,
            pageSize: props.data.per_page,
            length: props.data.total,
        });
    }, []);
    function handleChangePage(event: unknown, newPage: number) {
        setPaginator((prevState) => ({
            ...prevState,
            page: newPage,
        }));
    }

    async function deleteUser(id: number) {
        const question = await showQuestion({
            title: "Eliminar usuario",
            text: "¿Estás seguro de que quieres eliminar el usuario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
        });
        if (!question.isConfirmed) {
            return
        }
        const options = {
            preserveState: true,
            onSuccess: (e: any) => {
                showToast({
                    icon: "success",
                    text: "Usuario eliminado",
                    title: "Usuario eliminado",
                });
            },
            onError: (e: any) => {
                showToast({
                    icon: "error",
                    text: Object.values(e).join("\n"),
                    title: "Error al crear el estudiante",
                });
            },
        }
        router.delete(`academic/users/${id}`, options);
    }
    function onRowsPerPageChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPaginator((prevState) => ({
            ...prevState,
            pageSize: parseInt(event.target.value, 10),
        }));
    }

    function openDialogUser(user: IUser | undefined) {
        setUser(user);
        setIsOpen(true);
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    Tabla de usuario Administrativos
                </h1>
                <button onClick={() => openDialogUser(undefined)} className="btn-custom btn-create">Crear usuario</button>
            </div>
            <hr className="my-3" />
            <div className="overflow-x-auto w-full shadow-lg rounded-lg mt-4 px-3">
                <table className="table-auto w-full text-center">
                    <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {((props.data as any).data as IUser[])?.map(
                            (user, index) => {
                                return (
                                    <tr key={index} className="border-t-1">
                                        <td className="p-2">{user.name}</td>
                                        <td className="p-2">{user.email}</td>
                                        <td className="p-2">
                                            {user.roles?.[0].name}
                                        </td>
                                        <td className="p-2">
                                            <div className="flex justify-center gap-1">
                                                <button
                                                    onClick={() => {openDialogUser(user)}}
                                                    className="btn-icon"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button
                                                    onClick={() => {deleteUser(user.id)}}
                                                    className="btn-icon"
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={paginator.length}
                    rowsPerPage={paginator.pageSize}
                    page={paginator.page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={onRowsPerPageChange}
                />
            </div>
            {isOpen && (
                <CreateOrEditUserAdministrative isOpen={isOpen} setIsOpen={setIsOpen} user={user}/>
            )}
        </div>
    );
}
