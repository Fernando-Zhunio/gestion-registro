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
import { ITuition } from "../Tuitions/types/tuition";
import FormCreateOrEditNoteStudent from "@/Shared/FormCreateOrEditNoteStudent";

interface CreateOrEditNoteProps {
    data: { tuitions: ITuition[]; student: IStudent; currentPeriod: number };
}

const CreateOrEditNote = ({ data }: CreateOrEditNoteProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [note, setNote] = useState<INote | null>();
    const [tuition, setTuition] = useState<ITuition | null>();
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    // const [period_id, setPeriodId] = useState<number | ''>(data.currentPeriod);
    const [subject_id, setSubjectId] = useState<number>();
    const [pathStudents, setPathStudents] = useState<string>("");

    function onChangeTuition(e: any | null) {
        // if (isLoading) return;
        setSubjects([]);
        setNote(null);
        setSubjectId(0);
        const tuition = data.tuitions.find((x) => x.id == e.target.value);
        console.log(tuition);
        setTuition(tuition);
        if (!tuition) return;
        const parallel_id = tuition?.parallel_id!;
        getSubjects(tuition.period.id, parallel_id);
    }

    // function onChangeSubject(e: any) {
    //     if (isLoading) return;
    //     setSubjectId(e.target.value);
    //     if (!e.target.value) return;
    //     // getSubjects(e.target.value, data.student.id);
    // }

    const getSubjects = useCallback(
        (period_id: number, parallel_id: number) => {
            axios
                .get(
                    `periods/${period_id}/notes/parallels/${parallel_id}/subjects`
                )
                .then(({ data }) => {
                    setSubjects(data.data);
                });
        },
        [tuition]
    );

    function onChangeSubject(e: any) {
        setNote(null);
        setSubjectId(e.target.value);
        if (!e.target.value) return;
        if (!tuition) {
            showToast({
                icon: "error",
                text: "Debe seleccionar un periodo",
            });
            return;
        }
        setSubjectId(e.target.value);
        setIsLoading(true);
        axios
            .get(
                `periods/${tuition.period_id}/notes/students/${data.student.id}/subjects/${e.target.value}`
            )
            .then(({ data }) => {
                setNote(data.data?.note);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                showToast({
                    icon: "error",
                    text: "Error al cargar notas, por favor intente nuevamente",
                });
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
                                <label htmlFor="tuition">Periodo</label>
                                <select
                                    defaultValue={""}
                                    disabled={isLoading}
                                    id="tuition"
                                    onChange={onChangeTuition}
                                    className="border py-2 px-3 w-full block border-gray-300  focus:border-indigo-500  focus:ring-indigo-500 rounded-md shadow-sm "
                                >
                                    <option
                                        value={""}
                                        className="text-gray-500"
                                    >
                                        Seleccione una opción
                                    </option>
                                    {data.tuitions?.map((item) => {
                                        return (
                                            <option
                                                selected={
                                                    item.id ===
                                                    data.currentPeriod
                                                }
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.period.promotion}{" "}
                                                {data.currentPeriod ===
                                                    item.period.id &&
                                                    "(Actual)"}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            {tuition && <div className="mt-3">
                                <div>Paralelo</div>
                                <div className="my-2 p-3 bg-gray-200 text-gray-600">{tuition?.parallel.name}</div>
                            </div>}
                            <div className="mt-3">
                                <label htmlFor="subject_id">Materia</label>
                                <select
                                    disabled={isLoading}
                                    defaultValue={""}
                                    value={subject_id}
                                    id="subject_id"
                                    className="border py-2 px-3 w-full block border-gray-300  focus:border-indigo-500  focus:ring-indigo-500 rounded-md shadow-sm "
                                    onChange={onChangeSubject}
                                >
                                    <option value={""}>
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
                                </select>
                            </div>
                            <hr />
                            {/* <div className="mt-3">
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
                            </div> */}
                        </div>
                    </div>
                    <div className="col-span-8 gap-5">
                        <div className="p-4 shadow-lg-fz bg-blue-900 text-white mb-4 rounded-xl ">
                            <div className="  ">
                                <div className="text-gray-400">
                                    Estudiante seleccionado:
                                </div>
                                <h4 className="m-0">
                                    {data.student?.first_name}{" "}
                                    {data.student?.last_name}
                                </h4>
                                <small># ID: {data.student?.doc_number}</small>
                            </div>
                        </div>
                        {Boolean(subject_id) && (
                            <FormCreateOrEditNoteStudent note={note} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateOrEditNote;
