import DialogCustom from "@/Components/DialogCustom";
import { useCallback, useEffect, useRef, useState, useContext } from "react";
import { INote } from "./types/note.types";
import axios from "axios";
import { router } from "@inertiajs/react";
import SelectSearch from "@/Shared/components/SelectSearch";
import { useForm } from "react-hook-form";
import Select from "@/Components/Select";
import { IParallel } from "../Parallels/types/parallel.types";
import { showToast } from "@/Helpers/alerts";
import { IStudent } from "../Students/types/student.types";
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
import { AppContext } from "@/Context/AppContext";
import DropdownFz from "@/Components/DropdownFz";
import MenuItem from "@mui/material/MenuItem";
import { IManagerNote } from "../Academic/types/acedemy.type";
// import dayjs from "dayjs";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import { showToast } from "@/Helpers/alerts";

interface CreateOrEditNoteProps {
    state: "create" | "edit";
    data?: {
        parallels: IParallel[];
        currentPeriod: number;
        periods: IPeriod[];
        manager_note: IManagerNote;
    };
}

const CreateOrEditNote = ({ data }: CreateOrEditNoteProps) => {
    const { control, setValue, watch } = useForm<any>({
        defaultValues: {
            period_id: data?.currentPeriod,
            parallel_id: null,
            subject_id: null,
        },
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [note, setNote] = useState<INote | null>(null);
    const [students, setStudents] = useState<IStudent[]>([]);
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [pathStudents, setPathStudents] = useState<string>("");
    const [selectStudent, setSelectStudent] = useState<IStudent | null>(null);
    const searchPaginator = useRef(null);
    const { appInfo } = useContext(AppContext);

    const watchParallel = watch("parallel_id");
    const watchSubject = watch("subject_id");
    const wathPeriod = watch("period_id");

    const [groupNoteByPartial, setGroupNoteByPartial] = useState<{[key: string]: INote}>({});

    useEffect(() => {
        console.log({ data });
        setValue("period_id", data?.currentPeriod);
    }, [data]);
    function onChangeParallel(e: any) {
        if (isLoading) return;
        setValue("parallel_id", e.target.value);
        setStudents([]);
        setNote(null);
        setSelectStudent(null);
        setValue("subject_id", "");
        setSubjects([]);
        if (!e.target.value) return;
        searchNotesStudent(e.target.value);
        getSubjects(e.target.value);
    }

    function onChangePeriod(e: any) {
        if (isLoading) return;
        setValue("parallel_id", "");
        setNote(null);
        setStudents([]);
        setSelectStudent(null);
        setValue("subject_id", "");
        setSubjects([]);
        router.reload({
            data: {
                period_id: e.target.value,
            },
        });
    }

    const getSubjects = useCallback(
        (watchParallel: number) => {
            setNote(null);
            axios
                .get(
                    `/periods/${wathPeriod}/notes/parallels/${watchParallel}/subjects`
                )
                .then(({ data }) => {
                    setSubjects(data.data);
                });
        },
        [watchParallel, wathPeriod]
    );

    function searchNotesStudent(parallels: string) {
        let path = `/notes/parallels/${parallels}/search-students`;
        setIsLoading(true);
        setPathStudents(path);
        (searchPaginator?.current as any)?.getData(path, {
            period_id: wathPeriod,
        });
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
        setNote(null);
        axios
            .get(
                `periods/${wathPeriod}/notes/students/${student.id}/subjects/${watchSubject}`
            )
            .then(({ data }) => {
                setSelectStudent(student);
                setNote(data.data?.note);
                setIsLoading(false);
                convertDataNote(data.data?.note);
            })
            .catch((err) => {
                console.log(err);
                showToast({
                    icon: "error",
                    title: "Error",
                    text: "Este estudiante no tiene nota",
                })
                setIsLoading(false);
            });
    }

    function convertDataNote(data: INote[]) {
        const groupByPartial: any = {}
        data.forEach((item) => {
            const key: string = item.input_note?.manager_note_id! as any;
            if (groupByPartial[key as any]) {
                groupByPartial[key].push(item);
            } else {
                groupByPartial[key] = [item]
            }
        });
        console.log({ groupByPartial });
        setGroupNoteByPartial(groupByPartial);
    }

    return (
        <div>
            <div>
                <div className="col-span-12 mb-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl">Notas</h2>
                        <DropdownFz text="Impresiones">
                            {(wathPeriod && watchParallel && watchSubject) ? <><MenuItem selected={false}>
                                <a
                                    href={`/printers/periods/${wathPeriod}/notes_students/trimester/1?parallel_id=${watchParallel}&subject_id=${watchSubject}`}
                                    target="_blank"
                                    className="text-gray-700 block px-4 py-2 text-sm"
                                >
                                    Trimestre 1
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                    href={`/printers/periods/${wathPeriod}/notes_students/trimester/2?parallel_id=${watchParallel}&subject_id=${watchSubject}`}
                                    target="_blank"
                                    className="text-gray-700 block px-4 py-2 text-sm"
                                >
                                    Trimestre 2
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                    href={`/printers/periods/${wathPeriod}/notes_students/trimester/3?parallel_id=${watchParallel}&subject_id=${watchSubject}`}
                                    target="_blank"
                                    className="text-gray-700 block px-4 py-2 text-sm"
                                >
                                    Trimestre 3
                                </a>
                            </MenuItem></> : <span className="text-gray-500 px-3 py-1">Seleccione un periodo, paralelo y materia</span>}
                        </DropdownFz>
                    </div>
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
                                            <option
                                                selected={
                                                    item.id ===
                                                    data.currentPeriod
                                                }
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.promotion}{" "}
                                                {data.currentPeriod ===
                                                    item.id && "(Actual)"}
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
                                        setNote(null);
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
                                    params={{ period_id: wathPeriod }}
                                    isDisabledBtn={!!!watchParallel}
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
                                                                    <button
                                                                        onClick={(
                                                                            event
                                                                        ) =>
                                                                            selectedStudent(
                                                                                student
                                                                            )
                                                                        }
                                                                        className="hover:bg-blue-500 mx-2 bg-blue-600 px-2 py-1 text-white rounded-md"
                                                                    >
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
                        {watchParallel && watchSubject && selectStudent?.id && (
                            <FormCreateOrEditNote
                                parallel_id={watchParallel}
                                student_id={selectStudent?.id}
                                subject_id={watchSubject}
                                groupNoteByPartial={groupNoteByPartial}
                                note={note}
                                disabled={
                                    wathPeriod != appInfo.currentState?.period_id
                                }
                            />    
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateOrEditNote;
