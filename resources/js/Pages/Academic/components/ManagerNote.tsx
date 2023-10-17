import DialogCustom from "@/Components/DialogCustom";
import Input from "@/Components/Input";
import { showToast } from "@/Helpers/alerts";
import { patchValues } from "@/Helpers/patchValues";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface INote {
    name: string;
    value: number;
}

export default function ManagerNote({note}: any) {
    const { control, handleSubmit } = useForm({
        defaultValues: patchValues({
            name: "",
            description: "",
            nivel: "",
        }, note),
    });
    const [notes, setNotes] = useState<INote[]>([
        {
            name: "Examen",
            value: 50,
        },
        {
            name: "Tareas",
            value: 10,
        },
        {
            name: "Aporte",
            value: 20,
        },
        {
            name: "Exposición",
            value: 20,
        },
    ]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function  addNote() {
        setNotes(prev => [...prev, {
            name: "",
            value: 0,
        },])
    }

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
        }
        if (!note) {
            router.post("/courses", data, options);
        } else {
            router.put(`/courses/${note?.id}`, data, options);
        }
    }

    return (
        <div>
            <h3 className="text-3xl font-bold mt-3">
                <span>Manager de Notas</span> 
                <button onClick={addNote} className="bg-slate-800 text-white p-2 rounded-lg text-sm">
                                    Agregar
                                </button>
            </h3>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map(({ value, name }, index) => (
                            <tr key={index}>
                                <td>{name}</td>
                                <td>{value}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <div>
                    <DialogCustom
                        title={
                            <div className="flex justify-between items-center">
                                Notas{" "}
                                <button onClick={addNote} className="bg-slate-800 text-white p-2 rounded-lg text-sm">
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
                                    name="name"
                                    label="Intervalo de meses"
                                    type="number"
                                />
                            </div>
                            <span className="text-red-500 mt-2">
                                La suma de los valores debe ser 100%
                            </span>
                            {notes.map(({ value, name }, index) => (
                                <div
                                    className="shadow-lg p-3 rounded-lg mb-2"
                                    key={index}
                                >
                                    <div>
                                        <Input
                                            control={control}
                                            name="name"
                                            label="Nombre de la nota"
                                            value={name}
                                            type="text"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <Input
                                            control={control}
                                            name="name"
                                            label="Valor de la nota %"
                                            type="number"
                                            value={value}
                                        />
                                    </div>
                                </div>
                            ))}
                            <div></div>
                        </form>
                    </DialogCustom>
                </div>
            </div>
        </div>
    );
}
