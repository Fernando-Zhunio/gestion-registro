import SearchBarComponent from "@/Components/SearchBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext, useRef, useState } from "react";
import { IStudent } from "./types/student.types";
import {  ResponsePaginator } from "@/types/global";
// import { CreateOrEditCourse } from "./CreateOrEditStudent";
import { showAlert } from "@/Helpers/alerts";
import { Link, useForm } from "@inertiajs/react";
import { IPeriod } from "../Periods/types/period.types";
import { AppContext } from "@/Context/AppContext";

const StudentsIndex = ({data, metadata: {periods}}: ResponsePaginator<IStudent, any>) => {
    const {  delete: _deleteCourse } = useForm()

    const [period_id, setPeriod_id] = useState<number>(0)
    const {appInfo} = useContext(AppContext)

    // function deleteCourse(id: number): void {
    //     showAlert({
    //         title: '¿Estás seguro de eliminar este curso?',
    //         text: 'Esta acción no se puede deshacer',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Si, eliminar',
    //         cancelButtonText: 'Cancelar'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             _deleteCourse(`/courses/${id}`, {
    //                 preserveScroll: true,
    //                 onSuccess: () => {
    //                     showAlert({
    //                         title: 'Curso eliminado',
    //                         icon: 'success'
    //                     })
    //                 },
    //                 onError: () => {

    //                 },
    //                 preserveState: true
    //             })
                
    //         }
    //     })
    // }

    const refSearchBar: any = useRef()

    return (
        <div className="">
            <SearchBarComponent
                ref={refSearchBar}
                path="/students"
                title="Estudiantes"
                withPaginator={true}
                notLoadDataOnInit={true}
                params={{period_id}}
                buttons={
                    <>
                        <select
                            onChange={($event: any) =>{
                                console.log($event.target.value)
                                setPeriod_id($event.target.value)
                                refSearchBar.current.fetchUrl(null, {period_id: $event.target.value})
                            }}
                        >
                            {
                                periods?.map((period: IPeriod) => (
                                    <option key={period.id} value={period.id}>{period.promotion}</option>
                                ))
                            }
                        </select>
                    </>
                }
                >
                {/* {JSON.stringify(periods)} */}
                <div className="overflow-x-auto">
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
                                        <TableCell>{row?.tuitions?.[0].course.name}</TableCell>
                                        <TableCell>{row.representative.first_name}</TableCell>
                                        <TableCell>
                                           {appInfo.currentState.period_id == period_id && <div className="flex gap-1">
                                             <Link href={"/students/"+ row.id + '/edit'}  className="btn-icon">
                                                 <i className="fas fa-edit"></i>
                                             </Link>
                                           </div>}
                                        </TableCell>
                                        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </SearchBarComponent>

            {/* <CreateOrEditCourse setIsOpen={setIsOpen}  isOpen={isOpen} data={dataEdit || undefined} state="create"/> */}
        </div>
    );
};

export default StudentsIndex;
