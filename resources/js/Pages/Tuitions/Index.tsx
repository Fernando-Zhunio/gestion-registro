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

export default function IndexTuitions({ data, metadata: { currentPeriodId } }: ResponsePaginator<ITuition, any>) {
   
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
                            onChange={onChangePeriod}
                        >
                            {
                                appInfo.periods?.map((period) => (
                                    <option key={period.id} value={period.id}>{period.promotion}</option>
                                ))
                            }
                        </select>
                        <Link
                            href="/tuitions/create"
                            className="btn-custom btn-create"
                        >
                            Crear Matricula
                        </Link>
                    </>
                }
            >
                <TableContainer sx={{ maxHeight: 740 }} component={Paper}>
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
                                        <div className="flex gap-1">
                                            <DropdownFz text="Impresiones">
                                                <MenuItem>
                                                <a
                                                    href={`/printers/periods/${period_id}/students/${row.student.id}/promotion_certificate`}
                                                    target="_blank"
                                                    className="text-gray-700 block px-4 py-2 text-sm"
                                                >
                                                    Certificado Promoción
                                                </a>
                                                
                                                </MenuItem>
                                                <Divider />
                                                <MenuItem>
                                                <a
                                                    href={`/printers/periods/${period_id}/students/${row.student.id}/notes_student/trimester/1`}
                                                    target="_blank"
                                                    className="text-gray-700 block px-4 py-2 text-sm"
                                                >
                                                    Note 1
                                                </a>
                                                </MenuItem>
                                                <MenuItem>
                                                <a
                                                    href={`/printers/periods/${period_id}/students/${row.student.id}/notes_student/trimester/2`}
                                                    target="_blank"
                                                    className="text-gray-700 block px-4 py-2 text-sm"
                                                >
                                                    Note 2
                                                </a>
                                                </MenuItem>
                                                <MenuItem>
                                                <a
                                                    href={`/printers/periods/${period_id}/students/${row.student.id}/notes_student/trimester/2`}
                                                    target="_blank"
                                                    className="text-gray-700 block px-4 py-2 text-sm"
                                                >
                                                    Note 3
                                                </a>
                                                </MenuItem>

                                            </DropdownFz>
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
