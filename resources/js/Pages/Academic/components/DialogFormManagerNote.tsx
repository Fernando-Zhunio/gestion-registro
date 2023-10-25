import DialogCustom from "@/Components/DialogCustom";
import { useState } from "react";
import { IManagerNote, INote } from "../types/acedemy.type";
import { showToast } from "@/Helpers/alerts";
import { router } from "@inertiajs/react";
import { useFieldArray, useForm } from "react-hook-form";
import { patchValues } from "@/Helpers/patchValues";
import Input from "@/Components/Input";
export function DialogFormManagerNote({
    note,
    close,
}: {
    note: IManagerNote | null;
    close: () => void;
}) {
    const [notes, setNotes] = useState<INote[]>(note?.notes || []);
    const [isLoading, setIsLoading] = useState(false);
    const { control, handleSubmit } = useForm({
        defaultValues: patchValues(
            {
                notes: "",
                partials: "",
                period_id: "",
            },
            note
        ),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "notes",
    });

    function addNote() {
        append({
            name: "",
            value: 0,
        });
    }

    function validation() {
        if (notes.reduce((acc, { value }) => acc + value, 0) !== 100) {
            showToast({
                icon: "error",
                text: "La suma de los valores debe ser 100%",
            });
            return false;
        }
        return true;
    }

    function deleteItem(index: number) {
        if (fields.length < 2) {
            return;
        }
        remove(index);
        // setNotes((prev) => prev.filter((_, i) => i !== index));
    }
    function saveInServer(data: any) {
        setIsLoading(true);
        const options = {
            preserveState: true,
            onSuccess: (e: any) => {
                console.log({ e });
                setIsLoading(false);
                close && close();
            },
            onError: (e: any) => {
                console.log({ e });
                setIsLoading(false);
                showToast({
                    icon: "error",
                    text: Object.values(e).join("\n"),
                    title: "Error al crear el Notes",
                });
            },
        };
        if (!note) {
            router.post("/academic/manager-notes", data, options);
        } else {
            router.put(`/academic/manager-notes/${note?.id}`, data, options);
        }
    }
    return (
        <DialogCustom
            title={
                <div className="flex justify-between items-center">
                    <span>
                        Notas <br />
                        <small className="text-red-500 mt-2">
                            La suma de los valores debe ser 100%
                        </small>
                    </span>
                    <button
                        onClick={addNote}
                        className="bg-slate-800 text-white p-2 rounded-lg text-sm"
                    >
                        Agregar
                    </button>
                </div>
            }
            open={true}
        >
            <form onSubmit={handleSubmit(saveInServer)}>
                <div>
                    <Input
                        control={control}
                        name="partials"
                        rules={{ required: true }}
                        label="Numero de parciales"
                        type="number"
                    />
                </div>

                {fields.map((item, index) => (
                    <div
                        className="shadow-lg p-3 rounded-lg mb-2 grid grid-cols-3 gap-2"
                        key={index}
                    >
                        <div className="col-span-2">
                            <Input
                                control={control}
                                rules={{ required: true }}
                                name={`notes.${index}.name`}
                                label="Nombre de la nota"
                                type="text"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Input
                                control={control}
                                 rules={{ required: true, min: 1, max: 100 }}
                                name={`notes.${index}.value`}
                                label="Valor de la nota %"
                                type="number"
                            />
                            <div className="mt-3">
                                <button
                                    type="button"
                                    onClick={() => deleteItem(index)}
                                >
                                    <i className="fa-solid fa-trash-can text-red-500"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="col-span-12 flex gap-4">
                    <button
                        disabled={isLoading}
                        className="btn bg-create"
                        type="submit"
                    >
                        Guardar <i className="fa-regular fa-paper-plane"></i>
                        {isLoading && (
                            <i className="fa-solid fa-spinner animate-spin ml-2"></i>
                        )}
                    </button>
                    <button
                        disabled={isLoading}
                        className="btn bg-delete"
                        type="button"
                        onClick={() => close()}
                    >
                        Cerrar <i className="fa-solid fa-xmark ml-2"></i>
                    </button>
                </div>
            </form>
        </DialogCustom>
    );
}
