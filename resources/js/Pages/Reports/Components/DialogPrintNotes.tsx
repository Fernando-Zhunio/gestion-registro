import DialogCustom from "@/Components/DialogCustom";
// import TextField from "@mui/material/TextField";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";
// import DialogActions from "@mui/material/DialogActions";
import { useForm } from "react-hook-form";
import Input from "@/Components/Input";
import { patchValues } from "@/Helpers/patchValues";
import { showToast } from "@/Helpers/alerts";
import { IPeriod } from "@/Models/period";
import { ICourse } from "@/Pages/Courses/types/course.types";
import { IParallel } from "@/Pages/Parallels/types/parallel.types";
import { IStudent } from "@/Pages/Students/types/student.types";
import { ISubject } from "@/Pages/Subjects/types/subject.types";
// import dayjs from "dayjs";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import { showToast } from "@/Helpers/alerts";

interface IDialogPrintNotesProps {
    // state: "create" | "edit";
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    data: {
        period: IPeriod;
        course: ICourse;
        parallel: IParallel;
        student: IStudent;
    };
}

export const DialogPrintNotes = ({
    isOpen,
    setIsOpen,
    data,
}: IDialogPrintNotesProps) => {
    // const { control, handleSubmit } = useForm<any>();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [subject_id, setSubject_id] = useState<number>(0);
    const [trimester, setTrimester] = useState<number>(0);

    function saveInServer(data: any) {
        setIsLoading(true);
        const options = {
            preserveState: true,
            onSuccess: (e: any) => {
                console.log({ e });
                setIsLoading(false);
                setIsOpen(false);
            },
            onError: (e: any) => {
                console.log({ e });
                setIsLoading(false);
                showToast({
                    icon: "error",
                    text: Object.values(e).join("\n"),
                    title: "Error al crear el estudiante",
                });
            },
        };
    }

    useEffect(() => {
        axios
            .get(
                `periods/${data.period.id}/notes/parallels/${data.parallel.id}/subjects`
            )
            .then((res) => {
                console.log({ res: res.data.data });
                setSubjects(res.data.data);
            });
    }, []);

    function onDownload() {
        if (!+subject_id || !+trimester) {
            showToast({
                text: "Debe seleccionar un curso y un trimestre",
                icon: "error",
            });
            return;
        }
        const link = document.createElement("a");
        link.href = `/printers/periods/${data.period.id}/notes_students/trimester/${trimester}?parallel_id=${data.parallel.id}&subject_id=${subject_id}`;
        link.target = "_blank";
        link.click();
    }

    return (
        <div>
            <DialogCustom open={isOpen} title={`Notas por materia`}>
                <div>
                    <div className="grid grid-cols-1 gap-3">
                        <div>
                            <div>
                                <small>Periodo</small>
                            </div>
                            <div>{data.period.promotion}</div>
                        </div>

                        <div>
                            <div>
                                <small>Curso</small>
                            </div>
                            <div>{data.course.name}</div>
                        </div>

                        <div>
                            <div>
                                <small>Paralelo</small>
                            </div>
                            <div>{data.parallel.name}</div>
                        </div>
                        <div>
                            <div>
                                <small>Estudiante</small>
                            </div>
                            <div>
                                {data.student.first_name}{" "}
                                {data.student.last_name}
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col">
                                <label htmlFor="subject">Materias</label>
                                <select
                                    name="subject"
                                    id="subject"
                                    value={subject_id}
                                    onChange={(e) =>
                                        setSubject_id(+e.target.value)
                                    }
                                >
                                    <option value={0}>
                                        Seleccione una materia
                                    </option>
                                    {subjects.map((subject) => (
                                        <option
                                            key={subject.id}
                                            value={subject.id}
                                        >
                                            {subject.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="trimester">Trimestre</label>
                                <select
                                    name="trimester"
                                    id="trimester"
                                    value={trimester}
                                    onChange={(e) =>
                                        setTrimester(+e.target.value)
                                    }
                                >
                                    <option value={0}>
                                        Seleccione una materia
                                    </option>
                                    <option value={1}>Primer Trimestre</option>
                                    <option value={2}>Segundo Trimestre</option>
                                    <option value={3}>Tercer Trimestre</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            disabled={isLoading}
                            type="submit"
                            onClick={onDownload}
                            className={`btn-custom text-white bg-slate-900 ${
                                isLoading ? "is-loading" : ""
                            }`}
                        >
                            Descargar
                            <i className="fa-regular fa-paper-plane ml-2"></i>
                        </button>
                        <button
                            disabled={isLoading}
                            className="btn-custom text-white bg-red-600"
                            onClick={() => setIsOpen(false)}
                        >
                            Cerrar <i className="fa-solid fa-xmark ml-2"></i>
                        </button>
                    </div>
                </div>
            </DialogCustom>
        </div>
    );
};
