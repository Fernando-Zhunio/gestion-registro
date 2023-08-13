import SearchBarComponent from "@/Components/SearchBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext, useEffect, useRef, useState } from "react";
// import { IStudent } from "./types/student.types";
import { ResponsePaginator } from "@/types/global";
// import { CreateOrEditCourse } from "./CreateOrEditStudent";
// import { showAlert } from "@/Helpers/alerts";
import { Link, router, useForm } from "@inertiajs/react";
// import { IPeriod } from "./Periods/types/period.types";
import { AppContext } from "@/Context/AppContext";
import { ConstDocTypes, ConstGender } from "@/Classes/Consts";
import "../Students/styles-student.css";
// import { ICourse } from "./Courses/types/course.types";
// import { IParallel } from "./Parallels/types/parallel.types";
import TablePagination from "@mui/material/TablePagination";
// import { IStudent } from "./Students/types/student.types";
import DropdownFz from "@/Components/DropdownFz";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import { DialogPrintNotes } from "./Components/DialogPrintNotes";
import { showAlert } from "@/Helpers/alerts";
import { IPeriod } from "../Periods/types/period.types";
import { ICourse } from "../Courses/types/course.types";
import { IParallel } from "../Parallels/types/parallel.types";
import { IStudent } from "../Students/types/student.types";
const ReportsIndex = ({
    data,
    metadata: { periods, courses, parallels, current_period },
}: ResponsePaginator<IStudent, any>) => {
    const { delete: _deleteCourse } = useForm();

    const [period_id, setPeriod_id] = useState<number>(current_period);
    const [course_id, setCourse_id] = useState<number>(0);
    const [parallel_id, setParallel_id] = useState<number>(0);
    const [textSearch, setTextSearch] = useState<string>("");
    const { appInfo } = useContext(AppContext);
    const [dataForNote, setDataForNote] = useState<any>({
        period: null,
        course: null,
        parallel: null,
        student: null,
    });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setPeriod_id(current_period);
    }, [current_period]);

    function onChangePeriod(e: any) {
        const periodId = e.target.value;
        setPeriod_id(periodId);
        setCourse_id(0);
        setParallel_id(0);

        router.reload({
            data: { period_id: periodId, course_id: null, parallel_id: null },
        });
    }

    function onOpenDialogNotes(id: number) {
        if (period_id && course_id && parallel_id) {
            const _data = {
                period: periods.find((period: any) => period.id == period_id),
                course: courses.find((course: any) => course.id == course_id),
                parallel: parallels.find(
                    (parallel: any) => parallel.id == parallel_id
                ),
                student: data.data.find((student: any) => student.id == id),
            };
            console.log(_data, periods, period_id);
            setDataForNote(_data);
            setIsOpen(true);
        } else {
            showAlert({
                text: "Debe seleccionar un periodo, curso y paralelo",
                icon: "error",
            });
        }
    }
    function onChangeCourse(e: any) {
        const courseId = e.target.value;
        setParallel_id(0);
        setCourse_id(courseId);
        router.reload({
            replace: true,
            data: {
                course_id: courseId,
                parallel_id: null,
            },
        });
    }

    function onChangeParallel(e: any) {
        const parallelId = e.target.value;
        setParallel_id(parallelId);
        router.reload({
            data: {
                period_id,
                course_id,
                parallel_id: parallelId,
            },
        });
    }

    function onChangeTextSearch(e: any) {
        router.reload({
            data: {
                period_id,
                course_id,
                parallel_id,
                search: textSearch,
            },
        });
    }

    return (
        <div>
            <div className="flex items-center justify-between px-3">
                <div className="flex gap-2 items-center">
                    <span className="text-3xl">Reportes</span>
                    <div className="flex gap-2 items-center">
                        <input
                            onChange={(e) => {
                                setTextSearch(e.target.value);
                            }}
                            type="text"
                            placeholder="Buscar estudiante"
                        />
                        <button
                            onClick={onChangeTextSearch}
                            className="w-10 h-10 bg-slate-800 text-white px-3 "
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <label className="select-label-filter" htmlFor="period">
                            Periodo
                        </label>
                        <select
                            id="period"
                            value={period_id}
                            onChange={onChangePeriod}
                        >
                            {periods?.map((period: IPeriod) => (
                                <option key={period.id} value={period.id}>
                                    {period.promotion}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="relative">
                        <label className="select-label-filter" htmlFor="course">
                            Curso
                        </label>
                        <select
                            id="course"
                            value={course_id}
                            onChange={onChangeCourse}
                        >
                            <option value={0}>Seleccione un curso</option>
                            {courses?.map((course: ICourse) => (
                                <option key={course.id} value={course.id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="relative">
                        <label
                            className="select-label-filter"
                            htmlFor="parallel"
                        >
                            Paralelo
                        </label>
                        <select
                            id="parallel"
                            value={parallel_id}
                            onChange={onChangeParallel}
                        >
                            <option value={0}>Seleccione un paralelo</option>
                            {parallels?.map((parallel: IParallel) => (
                                <option key={parallel.id} value={parallel.id}>
                                    {parallel.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            {/* //     }
            // > */}
            <div className="overflow-x-auto px-3 py-2 mt-4">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        fontWeight: "bold",
                                        color: "gray",
                                    },
                                }}
                            >
                                <TableCell>Imagen</TableCell>
                                <TableCell>Nombres</TableCell>
                                <TableCell>Apellidos</TableCell>
                                <TableCell>Correo</TableCell>

                                <TableCell>Numero Doc</TableCell>

                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.data.map((row) => {
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell>
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src={row.photo}
                                                alt="imagen"
                                            />
                                        </TableCell>
                                        <TableCell>{row.first_name}</TableCell>
                                        <TableCell>{row.last_name}</TableCell>
                                        <TableCell>{row.user?.email}</TableCell>

                                        <TableCell>{row.doc_number}</TableCell>

                                        <TableCell>
                                            <DropdownFz text="Impresiones">
                                                <MenuItem>
                                                    <a
                                                        href={`/printers/periods/${period_id}/students/${row.id}/promotion_certificate`}
                                                        target="_blank"
                                                        className="text-gray-700 block px-4 py-2 text-sm"
                                                    >
                                                        Certificado Promoción
                                                    </a>
                                                </MenuItem>
                                                <MenuItem>
                                                    <button
                                                        onClick={() =>
                                                            onOpenDialogNotes(
                                                                row.id
                                                            )
                                                        }
                                                        className="text-gray-700 block px-4 py-2 text-sm"
                                                    >
                                                        Nota por materia
                                                    </button>
                                                </MenuItem>
                                                <MenuItem>
                                                    <a
                                                        href={`/printers/periods/${period_id}/students/${row.id}/certificate_tuition`}
                                                        target="_blank"
                                                        className="text-gray-700 block px-4 py-2 text-sm"
                                                    >
                                                        Certificado Matricula
                                                    </a>
                                                </MenuItem>
                                                <Divider />
                                                <MenuItem>
                                                    <a
                                                        href={`/printers/periods/${period_id}/students/${row.id}/notes_student/trimester/1`}
                                                        target="_blank"
                                                        className="text-gray-700 block px-4 py-2 text-sm"
                                                    >
                                                        Trimestre 1
                                                    </a>
                                                </MenuItem>
                                                <MenuItem>
                                                    <a
                                                        href={`/printers/periods/${period_id}/students/${row.id}/notes_student/trimester/2`}
                                                        target="_blank"
                                                        className="text-gray-700 block px-4 py-2 text-sm"
                                                    >
                                                        Trimestre 2
                                                    </a>
                                                </MenuItem>
                                                <MenuItem>
                                                    <a
                                                        href={`/printers/periods/${period_id}/students/${row.id}/notes_student/trimester/2`}
                                                        target="_blank"
                                                        className="text-gray-700 block px-4 py-2 text-sm"
                                                    >
                                                        Trimestre 3
                                                    </a>
                                                </MenuItem>
                                            </DropdownFz>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={data?.total}
                rowsPerPage={data?.per_page}
                page={data?.current_page - 1}
                onPageChange={(event, newPage) => {
                    console.log({ newPage, event });
                    router.reload({
                        data: {
                            page: newPage + 1,
                        },
                    });
                }}
                onRowsPerPageChange={(event) => {
                    router.reload({
                        data: {
                            per_page: event.target.value,
                        },
                    });
                }}
            />

            {isOpen && (
                <DialogPrintNotes
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    data={dataForNote as any}
                />
            )}
        </div>
    );
};

export default ReportsIndex;
