import SearchBarComponent from "@/Components/SearchBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { INote } from "./types/note.types";
import { ResponsePaginator } from "@/types/global";
// import { CreateOrEditNote } from "./CreateOrEditNote";
import { showAlert } from "@/Helpers/alerts";
import { Link, useForm } from "@inertiajs/react";

const NotesIndex = ({ data }: ResponsePaginator<INote>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [dataEdit, setDataEdit] = useState<INote | undefined>(undefined);
    function openPeriod(row: INote | undefined): void {
        setDataEdit(row);
        setIsOpen(true);
    }
    const { delete: _deleteCourse } = useForm()

    function deleteCourse(id: number): void {
        showAlert({
            title: '¿Estás seguro de eliminar esta nota?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                _deleteCourse(`/notes/${id}`, {
                    preserveScroll: true,
                    onSuccess: () => {
                        showAlert({
                            title: 'Nota eliminado',
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
                path="/notes"
                title="Notas"
                withPaginator={true}
                notLoadDataOnInit={true}
                buttons={<>
                    <Link href="/notes/create" className="btn-custom btn-create">Gestor Nota</Link>
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
                                <TableCell>Id</TableCell>
                                <TableCell>Estudiante</TableCell>
                                <TableCell>Materia</TableCell>
                                <TableCell>Profesor</TableCell>
                                <TableCell>Periodo</TableCell>
                                <TableCell>Aporte 1</TableCell>
                                <TableCell>P. I. 1</TableCell>
                                <TableCell>M. E. 1</TableCell>
                                <TableCell>Aporte 2</TableCell>
                                <TableCell>P. I. 2</TableCell>
                                <TableCell>M. E. 2</TableCell>
                                <TableCell>Aporte 3</TableCell>
                                <TableCell>P. I. 3</TableCell>
                                <TableCell>M. E. 3</TableCell>
                                <TableCell>Proyecto Final</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.data?.map((row) => (
                                <TableRow
                                    key={row.id}
                                >
                                    <TableCell>
                                        {row.id}
                                    </TableCell>
                                    <TableCell>
                                        {row.student?.first_name} {row.student?.last_name}
                                    </TableCell>
                                    <TableCell>{row.subject?.name} - {row.subject?.course?.name}</TableCell>
                                    <TableCell>{row.teacher?.first_name} - {row.teacher?.last_name}</TableCell>
                                    <TableCell>
                                        {row.period?.promotion}
                                    </TableCell>
                                    <TableCell>
                                        {row.partial_trimester_1}
                                    </TableCell>
                                    <TableCell>
                                        {row.integrating_project_1}
                                    </TableCell>
                                    <TableCell>
                                        {row.evaluation_mechanism_1}
                                    </TableCell>
                                    <TableCell>
                                        {row.partial_trimester_2}
                                    </TableCell>
                                    <TableCell>
                                        {row.integrating_project_2}
                                    </TableCell>
                                    <TableCell>
                                        {row.evaluation_mechanism_2}
                                    </TableCell>
                                    <TableCell>
                                        {row.partial_trimester_3}
                                    </TableCell>
                                    <TableCell>
                                        {row.integrating_project_3}
                                    </TableCell>
                                    <TableCell>
                                        {row.evaluation_mechanism_3}
                                    </TableCell>
                                    <TableCell>
                                        {row.project_final}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </SearchBarComponent>

            {/* <CreateOrEditNote setIsOpen={setIsOpen} isOpen={isOpen} data={dataEdit || undefined} state="create" /> */}
        </div>
    );
};

export default NotesIndex;
