import Input from "@/Components/Input";
import { IManagerNote, IInputNote } from "@/Pages/Academic/types/acedemy.type";
import { INote } from "@/Pages/Notes/types/note.types";
import { router } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const noteMinApproved = 7;

// function getTotal(subTotal: any) {
//     return Object.values<number>(subTotal).reduce(
//         (a: number, b: number) => (+a || 0) + (+b || 0),
//         0
//     );
// }

export function InputsNote({
    id,
    managerNote,
    setNoteTotal,
    baseNote,
    isActive,
    parallel_id,
    subject_id,
    student_id,
    values,
}: {
    id: number;
    managerNote: IManagerNote;
    setNoteTotal: any;
    baseNote: number;
    isActive: boolean;
    parallel_id: number;
    subject_id?: number;
    student_id?: number;
    values?:  INote[];
}) {
    const [disabled, setDisabled] = useState(false);
    const [subTotal, setSubTotal] = useState({});
    const {control, handleSubmit, setValue} = useForm();
    const total = useMemo(() => {
        const note = Object.values<number>(subTotal).reduce(
            (a: number, b: number) => (+a || 0) + (+b || 0),
            0
        );
        setNoteTotal(id, note);
        return note;
    }, [subTotal]);

    useEffect(() => {
        if (values) {
            const subTotal: any = {}
            managerNote.input_notes?.forEach((note: IInputNote) => {
                const value = values?.find((x) => x.input_note_id === note.id)?.value || 0; 
                setValue(note.id.toString(), value);
                subTotal[note.id] =
                (value / baseNote) *
                note.value;
            });
            setSubTotal(subTotal);
        }
    }, [values])

    function onSubmit(data: any) {
        // console.log({ data });
        // return;
        setDisabled(true);
        router.post(`/notes/manager-note/${managerNote.id}/save`, {
            notes: data,
            student_id,
            subject_id,
            parallel_id,
        }, {
            preserveState: true,
        });
    }

    return (
        <form  onSubmit={handleSubmit(onSubmit)} className="flex gap-x-4 flex-wrap items-center">
            { managerNote.input_notes?.map((note, index) => (
                <div key={index} className="col-span-3 mt-2">
                    <Input
                        disabled={!isActive}
                        control={control}
                        name={note.id.toString()}
                        label={`${note.name} - ${note.value}%`}
                        type="number"
                        min="1"
                        max={baseNote}
                        onChange={(e: any) => {
                            if (
                                !isNaN(e.target.value) &&
                                e.target.value <= baseNote
                            ) {
                                setSubTotal((curr: any) => {
                                    curr[note.id] =
                                        (e.target.value / baseNote) *
                                        note.value;
                                    return { ...curr };
                                });
                                setValue(note.id.toString(), e.target.value);
                            }
                        }}
                    />
                </div>
            ))}
            <div>
                <small>Nota del parcial: </small>
                <div>{((total / 100) * baseNote).toFixed(2)}</div>
            </div>
            <div>
                <button disabled={!isActive} className="bg-slate-800 text-white p-2 rounded-lg text-sm mt-3">
                    Guardar
                </button>
            </div>
        </form>
    );
}
