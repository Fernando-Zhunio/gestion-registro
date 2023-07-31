import Input from "@/Components/Input";
import Textarea from "@/Components/Textarea";
import { showToast } from "@/Helpers/alerts";
import { patchValues } from "@/Helpers/patchValues";
import { INote } from "@/Pages/Notes/types/note.types";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const FormCreateOrEditNoteStudent = ({
    note = null,
    // student_id,
    // subject_id,
    // parallel_id,
}: {
    note?: INote | null;
    // student_id?: number;
    // subject_id?: number;
    // parallel_id: number;
    // disabled: boolean;
}) => {
    // const {
    //     handleSubmit,
    //     getValues,
    //     setValue,
    //     watch,
    //     reset,
    //     formState: { errors },
    //     control,
    // } = useForm<INote>({
    //     defaultValues: {
    //         partial_trimester_1: 0,
    //         partial_trimester_2: 0,
    //         partial_trimester_3: 0,
    //         integrating_project_1: 0,
    //         integrating_project_2: 0,
    //         integrating_project_3: 0,
    //         evaluation_mechanism_1: 0,
    //         evaluation_mechanism_2: 0,
    //         evaluation_mechanism_3: 0,
    //         project_final: 0,
    //         observation: "",
    //         ...note,
    //     },
    // });

    // const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ponderateFirst, setPonderateFirst] = useState(0);
    const [ponderateSecond, setPonderateSecond] = useState(0);
    const [ponderateThird, setPonderateThird] = useState(0);
    const [noteFinal, setNoteFinal] = useState(0);

    // const watchProjectFinal = watch("project_final");
    useEffect(() => {
        const _noteFinal =
            (ponderateFirst || 0) +
            (ponderateSecond || 0) +
            (ponderateThird || 0) +
            (+((note?.project_final || 0) / 10) || 0);
        setNoteFinal(_noteFinal?.toFixed(2) as any);
    }, [ponderateFirst, ponderateSecond, ponderateThird]);

    function getPonterate1(partial: number, ponderate: number) {
        setPonderateFirst(ponderate);
    }

    function getPonterate2(partial: number, ponderate: number) {
        setPonderateSecond(ponderate);
    }

    function getPonterate3(partial: number, ponderate: number) {
        setPonderateThird(ponderate);
    }

    // const onSubmit = (data: INote) => {
    //     if (!parallel_id) {
    //         showToast({
    //             icon: "error",
    //             title: "Error",
    //             text: "Debe seleccionar un paralelo",
    //         });
    //         return;
    //     }
    //     if (!subject_id) {
    //         showToast({
    //             icon: "error",
    //             title: "Error",
    //             text: "Debe seleccionar un materia",
    //         });
    //         return;
    //     }
    //     if (!student_id) {
    //         showToast({
    //             icon: "error",
    //             title: "Error",
    //             text: "Debe seleccionar un estudiante",
    //         });
    //         return;
    //     }

    //     setIsLoading(true);

    //     const params = {
    //         ...data,
    //         student_id,
    //         subject_id,
    //         parallel_id,
    //     };
    //     if (note) {
    //         axios.put(`/notes/${note?.id}`, params).then((res) => {
    //             showToast({
    //                 icon: "success",
    //                 title: "Éxito",
    //                 text: "Nota actualizada",
    //             });
    //             setIsLoading(false);
    //         });
    //         return;
    //     }

    //     axios
    //         .post("/notes", params)
    //         .then((res) => {
    //             showToast({
    //                 icon: "success",
    //                 title: "Éxito",
    //                 text: "Nota creada",
    //             });
    //             setIsLoading(false);
    //             console.log(res.data.data);
    //             note = res.data.data;
    //         })
    //         .catch((err: AxiosError) => {
    //             console.log(err);
    //             showToast({
    //                 icon: "error",
    //                 title: "Error",
    //                 text:
    //                     (err?.response?.data as any)?.message ||
    //                     "No se pudo crear la nota, vuelva a intentarlo",
    //             });
    //             setIsLoading(false);
    //         });
    // };

    return (
        <div className=" shadow-lg-fz px-4 h-auto py-4 rounded-xl">
            {note ? <div>
                <div className="border shadow-lg-fz border-gray-200 p-6 rounded-xl mb-7 section-note-trimester">
                    <h3 className="">Primer Trimestre</h3>

                    <TrimesterView
                        getData={getPonterate1}
                        evaluation={note?.evaluation_mechanism_1}
                        partial={note?.partial_trimester_1}
                        project={note?.integrating_project_1}
                        trimester={1}
                        
                    />
                </div>
                <div className="border shadow-lg-fz border-gray-200 p-4 rounded-xl mb-7 section-note-trimester">
                    <h3 className="">Segundo Trimestre</h3>
                    <TrimesterView
                        getData={getPonterate2}
                        evaluation={note?.evaluation_mechanism_2}
                        partial={note?.partial_trimester_2}
                        project={note?.integrating_project_2}
                        trimester={2}
                    />
                </div>
                <div className="border shadow-lg-fz border-gray-200 p-4 rounded-xl mb-7 section-note-trimester">
                    <h3 className="">Tercer Trimestre</h3>
                    <TrimesterView
                        getData={getPonterate3}
                        evaluation={note?.evaluation_mechanism_3}
                        partial={note?.partial_trimester_3}
                        project={note?.integrating_project_3}
                        trimester={3}
                    />
                </div>
                <div className="border shadow-lg-fz border-gray-200 p-4 rounded-xl mb-3">
                    {/* <h3 className="text-2xl mb-2">Proyecto final</h3> */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-8">
                            <div>Observación</div>
                            <p>{note?.observation}</p>
                        </div>
                        <div className="col-span-4">
                            <div>Proyecto final 10%</div>
                            <div>{note?.project_final}</div>
                            <div className="mt-3">
                                <div>Nota Final</div>
                                {noteFinal}{" "}
                                <span
                                    className={
                                        noteFinal >= 7
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }
                                >
                                    {noteFinal >= 7 ? "Aprobado" : "Reprobado"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <div>No existe notas para esta materia aun</div>}
        </div>
    );
};

export default FormCreateOrEditNoteStudent;

export function TrimesterView({
    trimester,
    partial,
    project,
    evaluation,
    getData
}: {
    trimester: 1 | 2 | 3;
    partial: number | undefined;
    project: number | undefined;
    evaluation: number | undefined;
    getData: (partialFirst: number, ponderateFirst: number) => void;

}) {
    const [ponderate, setPonderate] = useState(0);
    const [partialTotal, setPartialTotal] = useState(0);
    
    useEffect(() => {
        const partialFinal = (
            ((+(partial || 0)* 9) + (+(project || 0)/2) + (+(evaluation || 0)/2)) / 10
        ).toFixed(2);
        const ponderate = (+partialFinal / 3.3333333333333).toFixed(2);
        setPonderate(ponderate as any);
        setPartialTotal(+partialFinal);
        getData(+partialFinal, +ponderate);
    }, []);
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3">
                <div>Aporte 90%</div>
                <div>{partial}</div>
            </div>
            <div className="col-span-3">
                <div>Proyecto 5%</div>
                <div>{project}</div>
            </div>
            <div className="col-span-3">
                <div>Evaluación 5%</div>
                <div>{evaluation}</div>
            </div>
            <div className="col-span-3 flex gap-2">
                <div className="border-r p-2">
                    <div>Puntos</div>
                    {partialTotal}
                </div>
                <div className="p-2">
                    <div>Puntaje</div>
                    {ponderate}
                </div>
            </div>
        </div>
    );
}
