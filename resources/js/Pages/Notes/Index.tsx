import SearchBarComponent from "@/Components/SearchBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { INote } from "./types/note.types";
import { ResponsePaginator } from "@/types/global";
// import { CreateOrEditNote } from "./CreateOrEditNote";
import { showAlert } from "@/Helpers/alerts";
import { Link, useForm } from "@inertiajs/react";
import { IStudent } from "../Students/types/student.types";
import { ISubject } from "../Subjects/types/subject.types";
import Avatar from "@mui/material/Avatar";

const NotesIndex = ({ data, metadata: {subjects}  }: ResponsePaginator<IStudent, {subjects: ISubject}>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [dataEdit, setDataEdit] = useState<INote | undefined>(undefined);
    function openPeriod(row: INote | undefined): void {
        setDataEdit(row);
        setIsOpen(true);
    }
    const { delete: _deleteCourse } = useForm()

    function deleteCourse(id: number): void {
        showAlert({
            title: '¿Estás seguro de eliminar esta nota?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                _deleteCourse(`/notes/${id}`, {
                    preserveScroll: true,
                    onSuccess: () => {
                        showAlert({
                            title: 'Nota eliminado',
                            icon: 'success'
                        })
                    },
                    onError: () => {

                    },
                    preserveState: true
                })

            }
        })
    }

    const templateNotes = function(subjectId: number, notes: INote[]) {
        const note = notes.find((note) => note.subject_id === subjectId);
        if (note) {
            const firstTrimesterNote = ((+note?.partial_trimester_1 || 0) + (+note?.integrating_project_1 || 0) + (+note?.evaluation_mechanism_1 || 0)) / 10;
            const secondTrimesterNote = ((+note?.partial_trimester_2 || 0) + (+note?.integrating_project_2 || 0) + (+note?.evaluation_mechanism_2 || 0)) / 10;
            const thirdTrimesterNote = ((+note?.partial_trimester_3 || 0) + (+note?.integrating_project_3 || 0) + (+note?.evaluation_mechanism_3 || 0)) / 10;

            const finalNote = (((firstTrimesterNote + secondTrimesterNote + thirdTrimesterNote) / 3.33333333333333)+ ((+note?.project_final/10) || 0));

            return <div className="text-gray-500 text-sm flex gap-2 content-note-index" key={note.id}>
            <p className={`text-white ${finalNote >= 7 ? 'bg-green-700' : 'bg-red-700'}`}>Esta materia fue <strong>{finalNote >= 7 ? 'APROBADA' : 'REPROBADA'} con promedio final de {finalNote.toFixed(2)}</strong></p>
            <div>Primer semestre:</div>
            <div className="mb-2 shadow p-2">
                <p className="border-r-2">Parcial 1: <span className="text-blue-950">{note?.partial_trimester_1}</span></p>
                <p className="border-r-2">P. integrador 1: <span className="text-blue-950">{note?.integrating_project_1}</span></p>
                <p className="border-r-2">E. evaluador 1: <span className="text-blue-950">{note?.evaluation_mechanism_1}</span></p>
                <p>Promedio: <span>{firstTrimesterNote}</span></p>
            </div>
            <div>Segundo semestre:</div>
            <div className="mb-2 shadow p-2">
                <p className="border-r-2">Parcial 2: <span className="text-blue-950">{note?.partial_trimester_2}</span></p>
                <p className="border-r-2">P. integrador 2: <span className="text-blue-950">{note?.integrating_project_2}</span></p>
                <p className="border-r-2">E. evaluador 2: <span className="text-blue-950">{note?.evaluation_mechanism_2}</span></p>
                <p >Promedio: <span>{secondTrimesterNote}</span></p>

            </div>
            <div>Tercer semestre:</div>
            <div className="mb-2 shadow p-2">
                <p className="border-r-2">Parcial 3: <span className="text-blue-950">{note?.partial_trimester_3}</span></p>
                <p className="border-r-2">P. integrador 3: <span className="text-blue-950">{note?.integrating_project_3}</span></p>
                <p className="border-r-2">E. evaluador 3: <span className="text-blue-950">{note?.evaluation_mechanism_3}</span></p> 
                <p>Promedio: <span>{thirdTrimesterNote}</span></p>

            </div>
            <p>Proyecto Final: <span className="text-blue-950">{note?.project_final}</span></p>
        </div>;
        } else {
            return <div>
                No hay notas
            </div>
        }
    }

    return (
        <div className="">
            <SearchBarComponent
                path="/notes"
                title="Notas"
                withPaginator={true}
                notLoadDataOnInit={true}
                buttons={<>
                    <Link href="/notes/create" className="btn-custom btn-create">Gestor Nota</Link>
                </>}
            >
                <div>
                    <div className="grid grid-cols-1 gap-3 ">
                        {
                            data?.data?.map((student) => (
                                <div className="shadow p-4 rounded-lg">
                                    <div className="flex gap-2 items-center"> 
                                        <Avatar src={student?.photo} />
                                        <div className="line-highlight">
                                            <p className="m-0">{student?.first_name} {student?.last_name}</p>
                                            <small className="text-gray-500">{student?.doc_number}</small>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="grid grid-cols-3">
                                        {
                                            subjects.map((subject:ISubject) => (
                                                <div className="p-4 shadow m-2">
                                                    <p>{subject.name}</p>
                                                    {templateNotes(subject.id, (student as any)?.['current_notes'])}
                                                </div>
                                            ))
                                        }
                                        
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </SearchBarComponent>

            {/* <CreateOrEditNote setIsOpen={setIsOpen} isOpen={isOpen} data={dataEdit || undefined} state="create" /> */}
        </div>
    );
};

export default NotesIndex;
