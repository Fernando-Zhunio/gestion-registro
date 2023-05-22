import SearchBarComponent from "@/Components/SearchBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, useForm } from "@inertiajs/react";
import { ITuition } from "./types/tuition";
import { ResponsePaginator } from "@/types/global";

export default function IndexTuitions({data}: ResponsePaginator<ITuition>) {
    return (
        <div className="container">
            <SearchBarComponent
                path="/tuitions"
                title="Matriculas"
                withPaginator={true}
                notLoadDataOnInit={true}
                buttons={<>
                    <Link href="/tuitions/create" className="btn-custom btn-create">Crear Matricula</Link>
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
                                <TableCell>#</TableCell>
                                <TableCell>Nombres</TableCell>
                                <TableCell>Apellidos</TableCell>
                                <TableCell>Correo</TableCell>
                                <TableCell>Dirección</TableCell>
                                <TableCell>Tipo Doc</TableCell>
                                <TableCell>Numero Doc</TableCell>
                                <TableCell>Sexo</TableCell>
                                <TableCell>Curso</TableCell>
                                <TableCell>Periodo</TableCell>
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
                                        {row.student.first_name}
                                    </TableCell>
                                    <TableCell>{row.student.last_name}</TableCell>
                                    <TableCell>{row.student.email}</TableCell>
                                    <TableCell>{row.student.address}</TableCell>
                                    <TableCell>{row.student.doc_type}</TableCell>
                                    <TableCell>{row.student.doc_number}</TableCell>
                                    <TableCell>{row.student.gender}</TableCell>
                                    <TableCell>{row.course.name}</TableCell>
                                    <TableCell>{row.period.promotion}</TableCell>
                                    <TableCell>
                                       <div className="flex gap-1">
                                         <Link href={"/tuitiosns/"+ row.id}  className="btn-icon btn-c-edit">
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
}