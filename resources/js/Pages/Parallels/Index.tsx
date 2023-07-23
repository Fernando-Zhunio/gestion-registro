import SearchBarComponent from "@/Components/SearchBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { IParallel } from "./types/parallel.types";
import {  ResponsePaginator } from "@/types/global";
import { CreateOrEditCourse } from "./CreateOrEditParallel";
import { showAlert } from "@/Helpers/alerts";
import { useForm } from "@inertiajs/react";



const Index = ({data}: ResponsePaginator<IParallel>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [dataEdit, setDataEdit] = useState<IParallel | undefined>(undefined);
    function openPeriod(row: IParallel | undefined): void {
        setDataEdit(row);
        setIsOpen(true);
    }
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
        <div className="container">
            <SearchBarComponent
                path="/parallels"
                title="Paralelos"
                withPaginator={true}
                notLoadDataOnInit={true}
                buttons={<>
                    <button onClick={() => openPeriod(undefined)} className="btn-custom btn-create">Crear Paralelo</button>
                </>}
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
                                <TableCell>id</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Total registrados</TableCell>
                                <TableCell>Total de cupos</TableCell>
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
                                    <TableCell>{row.observation}</TableCell>
                                    <TableCell>{row.registered}</TableCell>
                                    <TableCell>{row.quota}</TableCell>
                                    <TableCell>
                                       <div className="flex gap-1">
                                         <button onClick={() => openPeriod(row)} className="btn-icon btn-c-edit">
                                             <i className="fas fa-edit"></i>
                                         </button>
                                         <button onClick={() => deleteCourse(row.id)} className="btn-icon btn-c-edit">
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

            <CreateOrEditCourse setIsOpen={setIsOpen}  isOpen={isOpen} data={dataEdit || undefined} state="create"/>
        </div>
    );
};

export default Index;
