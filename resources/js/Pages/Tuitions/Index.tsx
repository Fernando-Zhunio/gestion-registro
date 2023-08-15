import SearchBarComponent from "@/Components/SearchBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useForm } from "@inertiajs/react";
import { ITuition } from "./types/tuition";
import { ResponsePaginator } from "@/types/global";
import { ConstDocTypes, ConstGender } from "@/Classes/Consts";
import Button from "@mui/material/Button/Button";
import { useContext, useRef, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DropdownFz from "@/Components/DropdownFz";
import Divider from "@mui/material/Divider";
import { AppContext } from "@/Context/AppContext";

export default function IndexTuitions({ data, metadata: { currentPeriodId, role } }: ResponsePaginator<ITuition, any>) {
   
    const [period_id, setPeriodId] = useState<number | "">(currentPeriodId);
    const { appInfo } = useContext(AppContext);
    const refSearchBar: any = useRef();
    function onChangePeriod(e: any) {
        setPeriodId(e.target.value);
        refSearchBar.current.fetchUrl(null, { period_id: e.target.value });
    }
    return (
        <div>
            <SearchBarComponent
                ref={refSearchBar}
                path="/tuitions"
                title="Matriculas"
                withPaginator={true}
                notLoadDataOnInit={true}
                params={{ period_id }}
                buttons={
                    <>
                        <select name="period" id=""
                            value={period_id}
                            onChange={onChangePeriod}
                        >
                            {
                                appInfo.periods?.map((period) => (
                                    <option key={period.id} value={period.id}>{period.promotion}</option>
                                ))
                            }
                        </select>
                        {role !== 'student' && <Link
                            href="/tuitions/create"
                            className="btn-custom btn-create"
                        >
                            Crear Matricula
                        </Link>}
                    </>
                }
            >
                <TableContainer className="overflow-auto" component={Paper}>
                    <Table
                        stickyHeader
                        aria-label="sticky table"
                        sx={{ minWidth: 650 }}
                    >
                        <TableHead>
                            <TableRow
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        fontWeight: "bold",
                                        color: "gray",
                                    },
                                }}
                            >
                                <TableCell>#</TableCell>
                                <TableCell>Nombres</TableCell>
                                <TableCell>Apellidos</TableCell>
                                <TableCell>Correo</TableCell>
                                <TableCell>Curso Aprobado</TableCell>
                                <TableCell>Dirección</TableCell>
                                <TableCell>Tipo Doc</TableCell>
                                <TableCell>Numero Doc</TableCell>
                                <TableCell>Sexo</TableCell>
                                <TableCell>Curso</TableCell>
                                <TableCell>Paralelo</TableCell>
                                <TableCell>Periodo</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>
                                        {row.student.first_name}
                                    </TableCell>
                                    <TableCell>
                                        {row.student.last_name}
                                    </TableCell>
                                    <TableCell>
                                        {row.student?.user?.email}
                                    </TableCell>
                                    <TableCell>
                                       <span className={+row.approved ? "text-green-500" : "text-red-500"}>{+row.approved ? "Si" : "No"}</span> 
                                    </TableCell>
                                    <TableCell>{row.student.address}</TableCell>
                                    <TableCell>
                                        {
                                            (ConstDocTypes() as any)[
                                                row.student.doc_type
                                            ]
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {row.student.doc_number}
                                    </TableCell>
                                    <TableCell>
                                        {
                                            (ConstGender() as any)[
                                                row.student.gender
                                            ]
                                        }
                                    </TableCell>

                                    <TableCell>{row.course.name}</TableCell>
                                    <TableCell>{row.parallel.name}</TableCell>
                                    <TableCell>
                                        {row.period.promotion}
                                    </TableCell>
                                    <TableCell>
                                        {role !== 'student' && <div className="flex gap-1">
                                            <a
                                                    href={`/printers/periods/${period_id}/students/${row.student.id}/certificate_tuition`}
                                                    target="_blank"
                                                    className=" block px-4 py-2 text-sm shadow text-center rounded-lg text-white bg-slate-900 hover:bg-slate-800"
                                                >
                                                    Certificado Matricula
                                                </a>
                                        </div>}
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
