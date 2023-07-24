import DialogCustom from "@/Components/DialogCustom";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useCallback, useEffect, useState } from "react";
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
import FormCreateOrEditNote from "@/Shared/FormCreateOrEditNote";
import { ISubject } from "../Subjects/types/subject.types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
// import dayjs from "dayjs";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import { showToast } from "@/Helpers/alerts";

interface CreateOrEditNoteProps {
    state: "create" | "edit";
    data?: IParallel[];
}

const CreateOrEditNote = ({ data }: CreateOrEditNoteProps) => {
    const { control, setValue, getValues, watch } = useForm({});

    // const [state, setState] = useState<"create" | "edit">("create");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [note, setNote] = useState<INote>();
    const [students, setStudents] = useState<IStudent[]>([]);
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [pathStudents, setPathStudents] = useState<string>("");
    const [selectStudent, setSelectStudent] = useState<IStudent | null>(null);

    const watchParallel = watch("parallel_id");
    const watchSubject = watch("subject_id");
    console.log({ watchParallel });
    function onChangeParallel(e: any) {
        if (isLoading) return;
        console.log({ e });
        setValue("parallel_id", e.target.value);
        setStudents([]);
        setSelectStudent(null);
        setValue("subject_id", "");
        if (!e.target.value) return;
        searchNotesStudent(e.target.value);
        setSubjects([]);
        getSubjects(e.target.value);
    }

    function handlerOnClickBtnSearchStudent() {
        const parallel = getValues("parallel_id");
        if (!parallel) {
            showToast({
                icon: "error",
                title: "Error",
                text: "Debe seleccionar un paralelo",
            });
            setIsLoading(false);
            return;
        }
        const student = getValues("student");
        console.log({ parallel });
        if (isLoading) return;
        searchNotesStudent(parallel, student);
    }

    const getSubjects = useCallback(
        (watchParallel: number) => {
            axios
                .get(`/notes/parallels/${watchParallel}/subjects`)
                .then(({ data }) => {
                    console.log({ data });
                    setSubjects(data.data);
                });
        },
        [watchParallel]
    );

    function searchNotesStudent(parallels: string, student: string = "") {
        let path = `/notes/by-teacher/${parallels}`;
        if (student) {
            path += `?search=${student}`;
        }
        if (path == pathStudents) return;
        setIsLoading(true);
        setPathStudents(path);
    }

    function onData(data: IStudent[]) {
        console.log({ data });
        setIsLoading(false);
        setStudents(data);
    }

    function onError(error: any) {
        setIsLoading(false);
        showToast({
            icon: "error",
            title: "Error",
            text: "No se pudo obtener los datos",
        });
    }

    function selectedStudent(student: IStudent) {
        if (selectStudent?.id === student.id) return;
        if (!watchSubject) {
            showToast({
                icon: "error",
                text: "Debe seleccionar un materia",
            });
            return;
        }
        setIsLoading(true);
        setSelectStudent(null);
        axios
            .get(`/notes/student/${student.id}?subject_id=${watchSubject}`)
            .then(({ data }) => {
                setSelectStudent(student);
                setNote(data.data?.note);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
            });
    }

    return (
        <div>
            <div>
                <div className="col-span-12 mb-6">
                    <h2 className="text-3xl">Notas</h2>
                </div>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-4 gap-4 ">
                        <Select
                            disabled={isLoading}
                            name="parallel_id"
                            label="Paralelo"
                            placeholder="Buscar paralelo"
                            control={control}
                            onChange={onChangeParallel}
                        >
                            <option value="" className="text-gray-500">
                                Seleccione una opción
                            </option>
                            {data?.map((item) => {
                                return (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </Select>
                        <div className="mt-3">
                            {/* <SelectSearch
                                readOnly={true}
                                disabled={true}
                                path={`/notes/parallels/${watchParallel}/subjects`}
                                control={control}
                                name="subject_id"
                                label="Materia"
                            /> */}
                            <Select
                                disabled={isLoading}
                                name="subject_id"
                                label="Materia"
                                control={control}
                                onChange={(e) => {
                                    setValue("subject_id", e.target.value);
                                    setSelectStudent(null);
                                }}
                            >
                                <option value="">
                                    <span className="text-gray-500">
                                        Seleccione una opción
                                    </span>
                                </option>
                                {subjects?.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </Select>
                        </div>
                        <div></div>
                        <div className="mt-3">
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
                                    <button
                                        onClick={handlerOnClickBtnSearchStudent}
                                        className="bg-slate-800 rounded-md text-white px-3 py-2"
                                        type="button"
                                    >
                                        Buscar
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <Table size="small" className="table-auto">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Foto</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Apellido</TableCell>
                                    <TableCell>D.I</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map((student) => (
                                    <TableRow
                                        className="cursor-pointer"
                                        onClick={() => {
                                            selectedStudent(student);
                                        }}
                                        hover
                                        key={student.id}
                                    >
                                        <TableCell className="rounde">
                                            <div>
                                                <img
                                                    src={student.photo}
                                                    className="h-10 w-10 object-cover rounded-full"
                                                    alt="student"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {student.first_name}
                                        </TableCell>
                                        <TableCell>
                                            {student.last_name}
                                        </TableCell>
                                        <TableCell>
                                            {student.doc_number}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {students.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="text-center text-gray-500"
                                        >
                                            No hay datos
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table> */}
                        <List>
                            {students.map((student) => {
                                return (
                                    <ListItem
                                        selected={selectStudent?.id === student.id}
                                        onClick={(event) =>
                                            selectedStudent(student)
                                        }
                                        key={student.id}
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={student.photo}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={`${student.first_name} ${student.last_name}`}
                                            secondary={
                                                <>
                                                    <Typography
                                                        sx={{
                                                            display: "inline",
                                                        }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        # {student.doc_number}
                                                    </Typography>
                                                    {/* {student.notes && (
                                                        <>
                                                            <br />
                                                            {`
                                                            a1: ${student.notes[0].partial_trimester_1} | 
                                                            p1: ${student.notes[0].integrating_project_1} |
                                                            e1: ${student.notes[0].evaluation_mechanism_1} `}
                                                            <br />
                                                            {`
                                                            a2: ${student?.notes?.[0].partial_trimester_2} |
                                                            p2: ${student?.notes?.[0].integrating_project_2} |
                                                            e2: ${student?.notes?.[0].evaluation_mechanism_2} `}
                                                            <br />
                                                            {`a3: ${student.notes?.[0].partial_trimester_3} | 
                                                            p3: ${student.notes?.[0].integrating_project_3} |
                                                            e3: ${student.notes?.[0].evaluation_mechanism_3}
                                                            `}
                                                        </>
                                                    )} */}
                                                </>
                                            }
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                        <Paginator
                            onError={onError}
                            onData={onData}
                            path={pathStudents}
                        />
                    </div>
                    <div className="col-span-8 gap-5">
                        <div className="px-4">
                            <div className="text-gray-500">
                                Estudiante seleccionado:
                            </div>
                            <h4 className="m-0">
                                {selectStudent?.first_name}{" "}
                                {selectStudent?.last_name}
                            </h4>
                            <small># ID: {selectStudent?.doc_number}</small>
                        </div>
                        <FormCreateOrEditNote
                            student_id={selectStudent?.id}
                            subject_id={watchSubject}
                            note={note}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateOrEditNote;
