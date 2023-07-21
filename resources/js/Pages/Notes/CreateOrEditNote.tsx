import DialogCustom from "@/Components/DialogCustom";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { INote } from "./types/note.types";
import Button from "@mui/material/Button";
import axios from "axios";
import { router } from "@inertiajs/react";
import DialogActions from "@mui/material/DialogActions";
import SelectSearch from "@/Shared/components/SelectSearch";
import { useForm } from "react-hook-form";
import Select from "@/Components/Select";
import { IParallel } from "../Parallels/types/parallel.types";
import { showToast } from "@/Helpers/alerts";
import { IStudent } from "../Students/types/student.types";
import { ResponsePaginator } from "@/types/global";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Divider from "@mui/material/Divider";
import Input from "@/Components/Input";
import { Paginator } from "@/Components/Paginator";
// import dayjs from "dayjs";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import { showToast } from "@/Helpers/alerts";

interface CreateOrEditNoteProps {
    state: "create" | "edit";
    data?: IParallel[];
}

const CreateOrEditNote = ({
    data,
}: CreateOrEditNoteProps) => {

    const { control, setValue, getValues } = useForm();

    const [state, setState] = useState<"create" | "edit">("create");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [students, setStudents] = useState<IStudent[]>([]);
    const [pathStudents, setPathStudents] = useState<string>('');

    function onChangeParallel(e: any) {
        if (isLoading) return;
        setValue("parallel_id", e.target.value);
        setStudents([]);
        searchNotesStudent(e.target.value);
    }

    function handlerOnClickBtnSearchStudent() {
        const parallel = getValues("parallel_id");
        if (!parallel) {
            showToast({
                icon: "error",
                title: "Error",
                text: "Debe seleccionar un paralelo",
            })
            setIsLoading(false);
            return;
        }
        const student = getValues("student");
        console.log({ parallel });
        if (isLoading) return;
        searchNotesStudent(parallel, student);
    }

    function searchNotesStudent(parallels: string, student: string = "") {
        setIsLoading(true);
        let path = `/notes/by-teacher/${parallels}`;
        if (student) {
            path += `?search=${student}`;
        }
        setPathStudents(path);
        // axios.get(path)
        //     .then((response) => {
        //         const data = response.data as ResponsePaginator<IStudent>;
        //         setStudents(data.data.data);
        //         console.log({ response });
        //         setIsLoading(false);
        //     }).catch((error) => {
        //         console.log({ error });
        //         showToast({
        //             icon: "error",
        //             title: "Error",
        //             text: "No se pudo obtener los datos",
        //         })
        //         setIsLoading(false);
        //     });
    }

    function onData(data: IStudent[]) {
        setIsLoading(false);
        setStudents(data);
    }

    function onError(error: any) {
        setIsLoading(false);
        showToast({
            icon: "error",
            title: "Error",
            text: "No se pudo obtener los datos",
        })
    }

    return (
        <div>
            <form>
                <div className="col-span-12 mb-6">
                    <h2 className="text-3xl">Notas</h2>
                </div>
                <div className="grid grid-cols-12">
                    <div className="col-span-4 grid gap-4 ">
                        <Select
                            disabled={isLoading}
                            name="parallel_id"
                            label="Paralelo"
                            control={control}
                            onChange={onChangeParallel}
                        >
                            {
                                data?.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    )
                                })
                            }
                        </Select>
                        <div className="">
                            <div>
                                <label htmlFor="student_id">Estudiante</label>
                                <div className="flex items-center gap-3">
                                    <div className="flex-grow">
                                        <Input
                                            disabled={isLoading}
                                            name="student"
                                            control={control}
                                            placeholder="Buscar estudiante"
                                            className="w-full"
                                        />
                                    </div>
                                    <button onClick={handlerOnClickBtnSearchStudent} className="bg-slate-800 rounded-md text-white px-3 py-2" type="button">
                                        Buscar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Table size="small" className="table-auto">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Foto</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Apellido</TableCell>
                                    <TableCell>D.I</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map((student) =>
                                    <TableRow hover key={student.id}>
                                        <TableCell className="rounde">
                                            <div>
                                                <img
                                                    src={student.photo}
                                                    className="h-16 w-16 object-cover rounded-full"
                                                    alt="student" />
                                            </div>
                                        </TableCell>
                                        <TableCell>{student.first_name}</TableCell>
                                        <TableCell>{student.last_name}</TableCell>
                                        <TableCell>{student.doc_number}</TableCell>
                                    </TableRow>
                                )}
                                {students.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-gray-500">No hay datos</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <Paginator onError={onError} onData={onData} path={pathStudents} />
                    </div>
                </div>
            </form>

        </div>
    );
};

export default CreateOrEditNote;