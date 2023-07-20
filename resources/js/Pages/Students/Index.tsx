import SearchBarComponent from "@/Components/SearchBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { IStudent } from "./types/student.types";
import {  ResponsePaginator } from "@/types/global";
// import { CreateOrEditCourse } from "./CreateOrEditStudent";
import { showAlert } from "@/Helpers/alerts";
import { Link, useForm } from "@inertiajs/react";

const StudentsIndex = ({data}: ResponsePaginator<IStudent>) => {
    const {  delete: _deleteCourse } = useForm()

    function deleteCourse(id: number): void {
        showAlert({
            title: '¿Estás seguro de eliminar este curso?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                _deleteCourse(`/courses/${id}`, {
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
                path="/students"
                title="Estudiantes"
                withPaginator={true}
                notLoadDataOnInit={true}
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
                                <TableCell>Imagen</TableCell>
                                <TableCell>Id</TableCell>
                                <TableCell>Nombres</TableCell>
                                <TableCell>Apellidos</TableCell>
                                <TableCell>Correo</TableCell>
                                <TableCell>Dirección</TableCell>
                                <TableCell>Tipo Doc</TableCell>
                                <TableCell>Numero Doc</TableCell>
                                <TableCell>Fecha Nac.</TableCell>
                                <TableCell>Sexo</TableCell>
                                <TableCell>Institución Anterior</TableCell>
                                <TableCell>Curso</TableCell>
                                <TableCell>Representante</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.data.map((row) => (
                                <TableRow
                                    key={row.id}
                                >
                                    <TableCell>
                                        <img src={row.photo} alt="imagen" />
                                    </TableCell>
                                    <TableCell>
                                        {row.id}
                                    </TableCell>
                                    <TableCell>
                                        {row.first_name}
                                    </TableCell>
                                    <TableCell>{row.last_name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.address}</TableCell>
                                    <TableCell>{row.doc_type}</TableCell>
                                    <TableCell>{row.doc_number}</TableCell>
                                    <TableCell>{row.birthday}</TableCell>
                                    <TableCell>{row.gender}</TableCell>
                                    <TableCell>{row.previous_institution}</TableCell>
                                    <TableCell>{row.course_id}</TableCell>
                                    <TableCell>{row.representative_id}</TableCell>
                                    <TableCell>
                                       <div className="flex gap-1">
                                         <Link href={"/students/"+ row.id + '/edit'}  className="btn-icon btn-c-edit">
                                             <i className="fas fa-edit"></i>
                                         </Link>
                                         {/* <button onClick={() => deleteCourse(row.id)} className="btn-icon btn-c-edit">
                                         <i className="fa-solid fa-trash text-red-600"></i>
                                         </button> */}
                                       </div>
                                    </TableCell>
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </SearchBarComponent>

            {/* <CreateOrEditCourse setIsOpen={setIsOpen}  isOpen={isOpen} data={dataEdit || undefined} state="create"/> */}
        </div>
    );
};

export default StudentsIndex;
