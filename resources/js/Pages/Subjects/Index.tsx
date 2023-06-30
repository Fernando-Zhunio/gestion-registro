import SearchBarComponent from "@/Components/SearchBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { ISubject } from "./types/subject.types";
import {  ResponsePaginator } from "@/types/global";
// import { CreateOrEditCourse } from "./CreateOrEditStudent";
import { showAlert } from "@/Helpers/alerts";
import { Link, useForm } from "@inertiajs/react";
import CreateOrEditSubject from "./CreateOrEditSubject";

const StudentsIndex = ({data}: ResponsePaginator<ISubject>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [dataEdit, setDataEdit] = useState<ISubject | undefined>(undefined);
    function openDialog(row: ISubject | undefined): void {
        setDataEdit(row);
        setIsOpen(true);
    }
    const {  delete: _deleteSubject } = useForm()

    function deleteSubject(id: number): void {
        showAlert({
            title: '¿Estás seguro de eliminar esta materia?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                _deleteSubject(`/courses/${id}`, {
                    preserveScroll: true,
                    onSuccess: () => {
                        showAlert({
                            title: 'Curso eliminado',
                            icon: 'success'
                        })
                    },
                    onError: () => {

                    },
                    preserveState: true
                })
                
            }
        })
    }

    return (
        <div className="">
            <SearchBarComponent
                path="/subjects"
                title="Materias"
                withPaginator={true}
                notLoadDataOnInit={true}
                buttons={
                    <button onClick={() => openDialog(undefined)} className="btn-custom btn-create">Crear Materia</button>
                }   
            >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{
                                "&:last-child td, &:last-child th": {
                                    fontWeight: "bold",
                                    color: 'gray'
                                }
                            }}>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Descripción</TableCell>
                                {/* <TableCell>Nivel</TableCell> */}
                                {/* <TableCell>Horas</TableCell> */}
                                <TableCell>Estado</TableCell>
                                <TableCell>Curso</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.data.map((row) => (
                                <TableRow
                                    key={row.id}
                                >
                                    
                                    <TableCell>
                                        {row.id}
                                    </TableCell>
                                    <TableCell>
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    {/* <TableCell>{row.nivel}</TableCell> */}
                                    <TableCell>{row.status == '1' ? 'Activo' : 'Inactivo'}</TableCell>
                                    {/* <TableCell>{row.doc_type}</TableCell> */}
                                    <TableCell>{row.course?.name}</TableCell>

                                    <TableCell>
                                    <div className="flex gap-1">
                                         <button onClick={() => openDialog(row)} className="btn-icon btn-c-edit">
                                             <i className="fas fa-edit"></i>
                                         </button>
                                         <button onClick={() => deleteSubject(row.id)} className="btn-icon btn-c-edit">
                                         <i className="fa-solid fa-trash text-red-600"></i>
                                         </button>
                                       </div>
                                    </TableCell>
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </SearchBarComponent>

            {isOpen && <CreateOrEditSubject setIsOpen={setIsOpen}  data={dataEdit || undefined}/>}

        </div>
    );
};

export default StudentsIndex;