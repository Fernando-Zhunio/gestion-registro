import Input from "@/Components/Input";
// import Textarea from "@/Components/Textarea";
import { showToast } from "@/Helpers/alerts";
// import { patchValues } from "@/Helpers/patchValues";
import { IManagerNote } from "@/Pages/Academic/types/acedemy.type";
import { INote } from "@/Pages/Notes/types/note.types";
import { usePage } from "@inertiajs/react";
import axios, { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { InputsNote } from "./InputsNote";

const baseNote = 12;
const noteMinApproved = 7;
function getNoteFinal(notesTotal: any, divisor: number) {
    const prev = Object.values<number>(notesTotal).reduce(
        (a: number, b: number) => (+a || 0) + (+b || 0),
        0
    );
    return ((prev / divisor / 100) * baseNote).toFixed(2);
}

const FormCreateOrEditNote = ({
    note = null,
    student_id,
    subject_id,
    parallel_id,
    disabled,
    groupNoteByPartial,
}: {
    note?: INote | null;
    student_id?: number;
    subject_id?: number;
    parallel_id: number;
    disabled: boolean;
    groupNoteByPartial: {[key: string]: INote}
}) => {
    const {
        props: {
            data: { manager_notes: notes },
        },
    } = usePage() as { props: { data: { manager_notes: IManagerNote[] } } };
    const [managerNotes, setManagerNotes] = useState<IManagerNote[]>([]);
    useEffect(() => {
        // reset(
        //     patchValues(
        //         {
        //             partial_trimester_1: 0,
        //             partial_trimester_2: 0,
        //             partial_trimester_3: 0,
        //             integrating_project_1: 0,
        //             integrating_project_2: 0,
        //             integrating_project_3: 0,
        //             evaluation_mechanism_1: 0,
        //             evaluation_mechanism_2: 0,
        //             evaluation_mechanism_3: 0,
        //             project_final: 0,
        //             observation: "",
        //         },
        //         note
        //     )
        // );
        console.log({ note });
    }, [note, student_id]);

    const {
        handleSubmit,
        getValues,
        setValue,
        watch,
        reset,

        formState: { errors },
        control,
    } = useForm<INote>();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [notesTotal, setNotesTotal] = useState({});
    const noteFinal = useMemo(
        () => getNoteFinal(notesTotal, managerNotes.length),
        [notesTotal]
    );

    function setNoteTotal(key: number, value: number) {
        setNotesTotal((curr: any) => {
            curr[key] = value;
            return { ...curr };
        });
    }

    useEffect(() => {
        setManagerNotes(() => {
            return notes.sort((a, b) => a.partial - b.partial) as any;
        });
    }, [notes]);

    return (
        <div className="shadow-lg-fz px-4 h-auto py-4 rounded-xl">
            <div>
                {managerNotes.map((note, index) => (
                    <div
                        key={note.id}
                        className="border shadow-lg-fz border-gray-200 p-6 rounded-xl mb-7 section-note-trimester"
                    >
                        <h3>Parcial {note.partial}</h3>
                        <InputsNote
                            student_id={student_id}
                            subject_id={subject_id}
                            parallel_id={parallel_id}
                            isActive={note.is_active}
                            baseNote={baseNote}
                            setNoteTotal={setNoteTotal}
                            id={note?.id}
                            // setValue={setValue}
                            values={groupNoteByPartial?.[note.id] as any}
                            // disabled={disabled}
                            managerNote={note}
                        ></InputsNote>
                    </div>
                ))}
                {/*<div className="border shadow-lg-fz border-gray-200 p-6 rounded-xl mb-7 section-note-trimester">
                    <h3 className="">Primer Trimestre</h3>

                    <InputsTrimester
                        disabled={disabled}
                        control={control}
                        setValue={setValue}
                        watch={watch}
                        trimester={1}
                        getData={getPonterate1}
                    />
                </div>
                 <div className="border shadow-lg-fz border-gray-200 p-4 rounded-xl mb-7 section-note-trimester">
                    <h3 className="">Segundo Trimestre</h3>
                    <InputsTrimester
                        disabled={disabled}
                        control={control}
                        setValue={setValue}
                        watch={watch}
                        trimester={2}
                        getData={getPonterate2}
                    />
                </div>
                <div className="border shadow-lg-fz border-gray-200 p-4 rounded-xl mb-7 section-note-trimester">
                    <h3 className="">Tercer Trimestre</h3>
                    <InputsTrimester
                        disabled={disabled}
                        control={control}
                        setValue={setValue}
                        watch={watch}
                        trimester={3}
                        getData={getPonterate3}
                    />
                </div>
                <div className="border shadow-lg-fz border-gray-200 p-4 rounded-xl mb-3">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-8">
                            <Textarea
                                control={control}
                                name="observation"
                                label="Observación"
                                disabled={disabled}
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
                                min={0}
                                disabled={disabled}
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
                </div> */}
                <div>
                    <div
                        className={`${
                            +noteFinal >= noteMinApproved
                                ? "bg-green-500"
                                : "bg-red-500"
                        } text-white p-2 rounded-md mb-3 inline-block`}
                    >
                        Nota Final: <span>{noteFinal}</span>
                        <small>
                            {+noteFinal >= noteMinApproved
                                ? " Curso Aprobado"
                                : " Curso Reprobado"}
                        </small>
                    </div>
                </div>
                {!disabled && (
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`btn-custom btn-store ${
                            isLoading ? "is-loading" : ""
                        }`}
                    >
                        Guardar
                    </button>
                )}
            </div>
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
    disabled,
}: {
    control: any;
    setValue: any;
    watch: any;
    trimester: 1 | 2 | 3;
    disabled: boolean;
    getData: (partialFirst: number, ponderateFirst: number) => void;
}) {
    const [partialFirst, setPartialFirst] = useState(0);
    const [ponderateFirst, setPonderateFirst] = useState(0);
    const wPartial = watch(
        [
            `partial_trimester_${trimester}`,
            `integrating_project_${trimester}`,
            `evaluation_mechanism_${trimester}`,
        ],
        [0, 0, 0]
    );
    useEffect(() => {
        const partial = // (watchPartialFirst.reduce(
        //     (a: number, b: number) => (+a || 0) + (+b || 0),
        //     0
        // ) || 0) / 10
        (
            ((+wPartial[0] || 0) * 9 +
                (+wPartial[1] || 0) / 2 +
                (+wPartial[2] || 0) / 2) /
            10
        ).toFixed(2);
        const ponderate = (+partial / 3.3333333333333).toFixed(2);
        setPonderateFirst(ponderate as any);
        setPartialFirst(+partial);
        getData(+partialFirst, +ponderateFirst);
    }, [wPartial]);
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3">
                <Input
                    control={control}
                    name={`partial_trimester_${trimester}`}
                    label="Aporte 90%"
                    type="number"
                    min="0"
                    max="10"
                    disabled={disabled}
                    onChange={(e: any) => {
                        if (!isNaN(e.target.value) && e.target.value <= 10) {
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
                    min="0"
                    max="10"
                    disabled={disabled}
                    onChange={(e: any) => {
                        if (!isNaN(e.target.value) && e.target.value <= 10) {
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
                    disabled={disabled}
                    min={0}
                    max={10}
                    type="number"
                    onChange={(e: any) => {
                        if (!isNaN(e.target.value) && e.target.value <= 10) {
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
