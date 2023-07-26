import Input from "@/Components/Input";
import Textarea from "@/Components/Textarea";
import { showToast } from "@/Helpers/alerts";
import { patchValues } from "@/Helpers/patchValues";
import { INote } from "@/Pages/Notes/types/note.types";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const FormCreateOrEditNote = ({ note = null, student_id, subject_id, parallel_id  }: { note?: INote | null, student_id?: number, subject_id?: number, parallel_id: number }) => {
    useEffect(() => {
        reset(patchValues({
            partial_trimester_1: 0,
            partial_trimester_2: 0,
            partial_trimester_3: 0,
            integrating_project_1: 0,
            integrating_project_2: 0,
            integrating_project_3: 0,
            evaluation_mechanism_1: 0,
            evaluation_mechanism_2: 0,
            evaluation_mechanism_3: 0,
            project_final: 0,
            observation: "",
        }, note));
    }, [note]);
    const {
        handleSubmit,
        getValues,
        setValue,
        watch,
        reset,
        formState: { errors },
        control,
    } = useForm<INote>({
        defaultValues: {
            partial_trimester_1: 0,
            partial_trimester_2: 0,
            partial_trimester_3: 0,
            integrating_project_1: 0,
            integrating_project_2: 0,
            integrating_project_3: 0,
            evaluation_mechanism_1: 0,
            evaluation_mechanism_2: 0,
            evaluation_mechanism_3: 0,
            project_final: 0,
            observation: "",
            ...note,
        },
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ponderateFirst, setPonderateFirst] = useState(0);
    const [ponderateSecond, setPonderateSecond] = useState(0);
    const [ponderateThird, setPonderateThird] = useState(0);
    const [noteFinal, setNoteFinal] = useState(0);

    const watchProjectFinal = watch("project_final");
    useEffect(() => {
        const note =
            (ponderateFirst || 0) +
            (ponderateSecond || 0) +
            (ponderateThird || 0) +
            (+(watchProjectFinal / 10) || 0);
        setNoteFinal(note?.toFixed(2) as any);
    }, [ponderateFirst, ponderateSecond, ponderateThird, watchProjectFinal]);

    function getPonterate1(partial: number, ponderate: number) {
        setPonderateFirst(ponderate);
    }

    function getPonterate2(partial: number, ponderate: number) {
        setPonderateSecond(ponderate);
    }

    function getPonterate3(partial: number, ponderate: number) {
        setPonderateThird(ponderate);
    }

    const onSubmit = (data: INote) => {
        if (!parallel_id) {
            showToast({
                icon: "error",
                title: "Error",
                text: "Debe seleccionar un paralelo",
            });
            return;
        }
        if (!subject_id) {
            showToast({
                icon: "error",
                title: "Error",
                text: "Debe seleccionar un materia",
            });
            return;
        }
        if (!student_id) {
            showToast({
                icon: "error",
                title: "Error",
                text: "Debe seleccionar un estudiante",
            });
            return;
        }

        setIsLoading(true);

        const params = {
            ...data,
            student_id,
            subject_id,
            parallel_id,
        }
        if (note) {
            axios.put(`/notes/${note?.id}`, params).then((res) => {
                showToast({
                    icon: "success",
                    title: "Éxito",
                    text: "Nota actualizada",
                })
                setIsLoading(false);
            })
            return;
        }

        axios.post("/notes", params).then((res) => {
            showToast({
                icon: "success",
                title: "Éxito",
                text: "Nota creada",
            })
            setIsLoading(false);
            console.log(res.data.data)
            note = res.data.data;
        }).catch((err: AxiosError) => {
            console.log(err);
            showToast({
                icon: "error",
                title: "Error",
                text: (err?.response?.data as any)?.message || "No se pudo crear la nota, vuelva a intentarlo",
            })
            setIsLoading(false);
        });
    }

    return (
        <div className="border-l px-4 h-full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="border border-gray-200 p-4 rounded-md mb-3">
                    <h3 className="text-2xl mb-2">Primer Trimestre</h3>
                    
                    <InputsTrimester
                        control={control}
                        setValue={setValue}
                        watch={watch}
                        trimester={1}
                        getData={getPonterate1}
                    />
                </div>
                <div className="border border-gray-200 p-4 rounded-md mb-3">
                    <h3 className="text-2xl mb-2">Segundo Trimestre</h3>
                    <InputsTrimester
                        control={control}
                        setValue={setValue}
                        watch={watch}
                        trimester={2}
                        getData={getPonterate2}
                    />
                </div>
                <div className="border border-gray-200 p-4 rounded-md mb-3">
                    <h3 className="text-2xl mb-2">Tercer Trimestre</h3>
                    <InputsTrimester
                        control={control}
                        setValue={setValue}
                        watch={watch}
                        trimester={3}
                        getData={getPonterate3}
                    />
                </div>
                <div className="border border-gray-200 p-4 rounded-md mb-3">
                    {/* <h3 className="text-2xl mb-2">Proyecto final</h3> */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-8">
                            <Textarea
                                control={control}
                                name="observation"
                                label="Observación"
                                rows={3}
                            />
                        </div>
                        <div className="col-span-4">
                            <Input
                                control={control}
                                name="project_final"
                                label="Proyecto final 10%"
                                type="number"
                                max={10}
                                onChange={(e: any) => {
                                    if (
                                        !isNaN(e.target.value) &&
                                        e.target.value <= 10
                                    ) {
                                        setValue(
                                            "project_final",
                                            e.target.value
                                        );
                                    }
                                }}
                            />
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
                <button type="submit" disabled={isLoading} className={`btn-custom btn-store ${isLoading ? "is-loading" : ""}`}>Guardar</button>
            </form>
        </div>
    );
};

export default FormCreateOrEditNote;

export function InputsTrimester({
    control,
    setValue,
    watch,
    trimester,
    getData,
}: {
    control: any;
    setValue: any;
    watch: any;
    trimester: 1 | 2 | 3;
    getData: (partialFirst: number, ponderateFirst: number) => void;
}) {
    const [partialFirst, setPartialFirst] = useState(0);
    const [ponderateFirst, setPonderateFirst] = useState(0);
    const watchPartialFirst = watch(
        [
            `partial_trimester_${trimester}`,
            `integrating_project_${trimester}`,
            `evaluation_mechanism_${trimester}`,
        ],
        [0, 0, 0]
    );
    useEffect(() => {
        // console.log(watchPartialFirst);
        const partial = (
            (watchPartialFirst.reduce((a: number, b: number) => (+a || 0) + (+b || 0), 0) ||
                0) / 10
        ).toFixed(2);
        const ponderate = (+partial / 3.3333333333333).toFixed(2);
        setPonderateFirst(ponderate as any);
        setPartialFirst(+partial);
        getData(+partialFirst, +ponderateFirst);
    }, [watchPartialFirst]);
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3">
                <Input
                    control={control}
                    name={`partial_trimester_${trimester}`}
                    label="Aporte 90%"
                    type="number"
                    onChange={(e: any) => {
                        console.log(
                            e.target.value,
                            !isNaN(e.target.value) && e.target.value <= 90
                        );
                        if (!isNaN(e.target.value) && e.target.value <= 90) {
                            setValue(
                                `partial_trimester_${trimester}`,
                                e.target.value
                            );
                        }
                    }}
                />
            </div>
            <div className="col-span-3">
                <Input
                    control={control}
                    name={`integrating_project_${trimester}`}
                    label="Proyecto 5%"
                    type="number"
                    onChange={(e: any) => {
                        console.log(e.target.value, e.target.value <= 5);
                        if (!isNaN(e.target.value) && e.target.value <= 5) {
                            setValue(
                                `integrating_project_${trimester}`,
                                e.target.value
                            );
                        }
                    }}
                />
            </div>
            <div className="col-span-3">
                <Input
                    control={control}
                    name={`evaluation_mechanism_${trimester}`}
                    label="Evaluación 5%"
                    max={5}
                    type="number"
                    onChange={(e: any) => {
                        if (e.target.value <= 5) {
                            setValue(
                                `evaluation_mechanism_${trimester}`,
                                e.target.value
                            );
                        }
                    }}
                />
            </div>
            <div className="col-span-3 flex gap-2">
                <div className="border-r p-2">
                    <div>Puntos</div>
                    {partialFirst}
                </div>
                <div className="p-2">
                    <div>Puntaje</div>
                    {ponderateFirst}
                </div>
            </div>
        </div>
    );
}
