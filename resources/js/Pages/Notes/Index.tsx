import SearchBarComponent from "@/Components/SearchBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext, useState } from "react";
import { INote } from "./types/note.types";
import { ResponsePaginator } from "@/types/global";
// import { CreateOrEditNote } from "./CreateOrEditNote";
import { showAlert } from "@/Helpers/alerts";
import { Link, useForm } from "@inertiajs/react";
import { IStudent } from "../Students/types/student.types";
import { ISubject } from "../Subjects/types/subject.types";
import Avatar from "@mui/material/Avatar";
import SelectSearch from "@/Shared/components/SelectSearch";
import Select from "@/Components/Select";
import { AppContext } from "@/Context/AppContext";

const NotesIndex = ({
    data,
    metadata: { subjects },
}: ResponsePaginator<IStudent, { subjects: ISubject }>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [dataEdit, setDataEdit] = useState<INote | undefined>(undefined);
    const { appInfo } = useContext(AppContext)
    function openPeriod(row: INote | undefined): void {
        setDataEdit(row);
        setIsOpen(true);
    }
    const { delete: _deleteCourse } = useForm();

    function deleteCourse(id: number): void {
        showAlert({
            title: "¿Estás seguro de eliminar esta nota?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                _deleteCourse(`/notes/${id}`, {
                    preserveScroll: true,
                    onSuccess: () => {
                        showAlert({
                            title: "Nota eliminado",
                            icon: "success",
                        });
                    },
                    onError: () => {},
                    preserveState: true,
                });
            }
        });
    }

    // function getPeriods

    const templateNotes = function (subjectId: number, notes: INote[]) {
        const note = notes.find((note) => note.subject_id === subjectId);
        if (note) {
            const firstTrimesterNote =
                ((+note?.partial_trimester_1 || 0) +
                    (+note?.integrating_project_1 || 0) +
                    (+note?.evaluation_mechanism_1 || 0)) /
                10;
            const secondTrimesterNote =
                ((+note?.partial_trimester_2 || 0) +
                    (+note?.integrating_project_2 || 0) +
                    (+note?.evaluation_mechanism_2 || 0)) /
                10;
            const thirdTrimesterNote =
                ((+note?.partial_trimester_3 || 0) +
                    (+note?.integrating_project_3 || 0) +
                    (+note?.evaluation_mechanism_3 || 0)) /
                10;

            const finalNote =
                (firstTrimesterNote +
                    secondTrimesterNote +
                    thirdTrimesterNote) /
                    3.33333333333333 +
                (+note?.project_final / 10 || 0);

            return (
                <div
                    className="text-gray-500 text-sm flex gap-2 content-note-index"
                    key={note.id}
                >
                    <p
                        className={`text-white ${
                            finalNote >= 7 ? "bg-green-700" : "bg-red-700"
                        }`}
                    >
                        Esta materia fue{" "}
                        <strong>
                            {finalNote >= 7 ? "APROBADA" : "REPROBADA"} con
                            promedio final de {finalNote.toFixed(2)}
                        </strong>
                    </p>
                    <div>Primer semestre:</div>
                    <div className="mb-2 shadow p-2">
                        <p className="border-r-2">
                            Parcial 1:{" "}
                            <span className="text-blue-950">
                                {note?.partial_trimester_1}
                            </span>
                        </p>
                        <p className="border-r-2">
                            P. integrador 1:{" "}
                            <span className="text-blue-950">
                                {note?.integrating_project_1}
                            </span>
                        </p>
                        <p className="border-r-2">
                            E. evaluador 1:{" "}
                            <span className="text-blue-950">
                                {note?.evaluation_mechanism_1}
                            </span>
                        </p>
                        <p>
                            Promedio: <span>{firstTrimesterNote}</span>
                        </p>
                    </div>
                    <div>Segundo semestre:</div>
                    <div className="mb-2 shadow p-2">
                        <p className="border-r-2">
                            Parcial 2:{" "}
                            <span className="text-blue-950">
                                {note?.partial_trimester_2}
                            </span>
                        </p>
                        <p className="border-r-2">
                            P. integrador 2:{" "}
                            <span className="text-blue-950">
                                {note?.integrating_project_2}
                            </span>
                        </p>
                        <p className="border-r-2">
                            E. evaluador 2:{" "}
                            <span className="text-blue-950">
                                {note?.evaluation_mechanism_2}
                            </span>
                        </p>
                        <p>
                            Promedio: <span>{secondTrimesterNote}</span>
                        </p>
                    </div>
                    <div>Tercer semestre:</div>
                    <div className="mb-2 shadow p-2">
                        <p className="border-r-2">
                            Parcial 3:{" "}
                            <span className="text-blue-950">
                                {note?.partial_trimester_3}
                            </span>
                        </p>
                        <p className="border-r-2">
                            P. integrador 3:{" "}
                            <span className="text-blue-950">
                                {note?.integrating_project_3}
                            </span>
                        </p>
                        <p className="border-r-2">
                            E. evaluador 3:{" "}
                            <span className="text-blue-950">
                                {note?.evaluation_mechanism_3}
                            </span>
                        </p>
                        <p>
                            Promedio: <span>{thirdTrimesterNote}</span>
                        </p>
                    </div>
                    <p>
                        Proyecto Final:{" "}
                        <span className="text-blue-950">
                            {note?.project_final}
                        </span>
                    </p>
                </div>
            );
        } else {
            return <div>No hay notas</div>;
        }
    };
    return (
        <div className="">
            <SearchBarComponent
                path="/notes"
                title="Notas"
                withPaginator={true}
                notLoadDataOnInit={true}
                buttons={
                    <>
                        
                        <select
                            className={`border py-2 px-3 border-gray-300  focus:border-indigo-500  focus:ring-indigo-500 rounded-md shadow-sm`}
                        >
                            {
                                appInfo?.periods?.map(res => {
                                    return (
                                        <option key={res.id} selected={res.id == appInfo.currentState.period_id} value={res.id}>
                                            {res.promotion}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <Link
                            href="/notes/create"
                            className="btn-custom btn-create"
                        >
                            Gestor Nota
                        </Link>
                    </>
                }
            >
                <div>
                    <div className="grid grid-cols-1 gap-3 ">
                        {data?.data?.length < 1 && (
                            <div className="flex flex-col items-center">
                                <img width={300} src="img/empty.svg" alt="" />
                                <h3 className="text-gray-500 text-3xl">No se encontraron notas</h3>
                            </div>
                        )}
                        {data?.data?.map((student) => (
                            <div className="shadow p-4 rounded-lg">
                                <div className="flex gap-2 items-center">
                                    <Avatar src={student?.photo} />
                                    <div className="line-highlight">
                                        <p className="m-0">
                                            {student?.first_name}{" "}
                                            {student?.last_name}
                                        </p>
                                        <small className="text-gray-500">
                                            {student?.doc_number}
                                        </small>
                                        <small
                                            className={`ml-2 rounded-md px-2 py-1 text-white ${
                                                student?.tuitions?.[0]
                                                    .approved == "1"
                                                    ? "bg-red-600"
                                                    : "bg-green-600"
                                            }`}
                                        >
                                            {student?.tuitions?.[0].approved ==
                                            "1"
                                                ? "Curso Aprobado"
                                                : "Curso Reprobado"}
                                        </small>
                                    </div>
                                </div>
                                <br />
                                <div className="grid grid-cols-3">
                                    {subjects.map((subject: ISubject) => (
                                        <div className="p-4 shadow-md rounded-lg m-2">
                                            <p>{subject.name}</p>
                                            {templateNotes(
                                                subject.id,
                                                (student as any)?.[
                                                    "current_notes"
                                                ]
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SearchBarComponent>

            {/* <CreateOrEditNote setIsOpen={setIsOpen} isOpen={isOpen} data={dataEdit || undefined} state="create" /> */}
        </div>
    );
};

export default NotesIndex;
