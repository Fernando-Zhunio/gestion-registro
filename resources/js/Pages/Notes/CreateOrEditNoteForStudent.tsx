import DialogCustom from "@/Components/DialogCustom";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useCallback, useEffect, useRef, useState } from "react";
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
import { SearchPaginator } from "@/Components/Paginator";
import FormCreateOrEditNote from "@/Shared/FormCreateOrEditNote";
import { ISubject } from "../Subjects/types/subject.types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { IPeriod } from "@/Models/period";
// import dayjs from "dayjs";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import { showToast } from "@/Helpers/alerts";

interface CreateOrEditNoteProps {
    state: "create" | "edit";
    data?: { parallels: IParallel[], currentPeriod: number, periods: IPeriod[] };
}

const CreateOrEditNote = ({ data }: CreateOrEditNoteProps) => {
    const { control, setValue, getValues, watch } = useForm({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [note, setNote] = useState<INote | null>();
    const [students, setStudents] = useState<IStudent[]>([]);
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [pathStudents, setPathStudents] = useState<string>("");
    const [selectStudent, setSelectStudent] = useState<IStudent | null>(null);
    const searchPaginator = useRef(null);

    const watchParallel = watch("parallel_id");
    const watchSubject = watch("subject_id");
    const wathPeriod = watch("period_id");
    function onChangeParallel(e: any) {
        if (isLoading) return;
        setValue("parallel_id", e.target.value);
        setStudents([]);
        setSelectStudent(null);
        setValue("subject_id", "");
        setSubjects([]);
        setNote(null);
        if (!e.target.value) return;
        searchNotesStudent(e.target.value);
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
        searchNotesStudent(parallel);
    }

    function onChangePeriod(e: any) {
        if (isLoading) return;
        setValue("parallel_id", '');
        setStudents([]);
        setSelectStudent(null);
        setValue("subject_id", '');
        setSubjects([]);
        // if (!e.target.value) return;
        // searchNotesStudent(null);
        // getSubjects(e.target.value);
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

    function searchNotesStudent(parallels: string) {
        let path = `/notes/by-teacher/${parallels}?period_id=${wathPeriod}`;
        setIsLoading(true);
        setPathStudents(path);
        console.log({ searchPaginator });
        (searchPaginator?.current as any)?.getData(path);
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
                    <div className="col-span-4 gap-4">
                        <div className="shadow-lg-fz p-3 rounded-xl">
                            <div className="mt-3">
                            <Select
                                disabled={isLoading}
                                name="period_id"
                                label="Periodo"
                                control={control}
                                onChange={onChangePeriod}
                            >
                                <option value="" className="text-gray-500">
                                    Seleccione una opción
                                </option>
                                {data?.periods?.map((item) => {
                                    return (
                                        <option selected={item.id === data.currentPeriod} key={item.id} value={item.id}>
                                            {item.promotion} {data.currentPeriod === item.id && "(Actual)" }
                                        </option>
                                    );
                                })}
                            </Select>
                            </div>
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
                                {data?.parallels?.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </Select>
                            <div className="mt-3">
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
                                        Seleccione una opción
                                    </option>
                                    {subjects?.map((item) => {
                                        return (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        );
                                    })}
                                </Select>
                            </div>
                            <hr />
                            <div className="mt-3">
                                <SearchPaginator
                                    ref={searchPaginator}
                                    onError={onError}
                                    onData={onData}
                                    path={pathStudents}
                                    isDisabledBtn={!(!!watchParallel)}
                                    placeholder="Buscar estudiante"
                                >
                                    <div>
                                        <List>
                                            {students.map((student) => {
                                                return (
                                                    <ListItem
                                                        selected={
                                                            selectStudent?.id ===
                                                            student.id
                                                        }
                                                        onClick={(event) =>
                                                            selectedStudent(
                                                                student
                                                            )
                                                        }
                                                        key={student.id}
                                                    >
                                                        <ListItemAvatar>
                                                            <Avatar
                                                                alt="Remy Sharp"
                                                                src={
                                                                    student.photo
                                                                }
                                                            />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={`${student.first_name} ${student.last_name}`}
                                                            secondary={
                                                                <>
                                                                    <Typography
                                                                        sx={{
                                                                            display:
                                                                                "inline",
                                                                        }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                        #{" "}
                                                                        {
                                                                            student.doc_number
                                                                        }
                                                                    </Typography>
                                                                    <button className="hover:bg-blue-500 mx-2 bg-blue-600 px-2 py-1 text-white rounded-md">
                                                                        Seleccionar
                                                                    </button>
                                                                </>
                                                            }
                                                        />
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    </div>
                                </SearchPaginator>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-8 gap-5">
                        <div className="p-4 shadow-lg-fz bg-blue-900 text-white mb-4 rounded-xl ">
                            <div className="  ">
                                <div className="text-gray-400">
                                    Estudiante seleccionado:
                                </div>
                                <h4 className="m-0">
                                    {selectStudent?.first_name}{" "}
                                    {selectStudent?.last_name}
                                </h4>
                                <small># ID: {selectStudent?.doc_number}</small>
                            </div>
                        </div>
                        <FormCreateOrEditNote
                            parallel_id={watchParallel}
                            student_id={selectStudent?.id}
                            subject_id={watchSubject}
                            note={note}
                            disabled={wathPeriod != data?.currentPeriod}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateOrEditNote;
