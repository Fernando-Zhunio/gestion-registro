import DialogCustom from "@/Components/DialogCustom";
import Input from "@/Components/Input";
import { showToast } from "@/Helpers/alerts";
import { patchValues } from "@/Helpers/patchValues";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DialogFormManagerNote } from "./DialogFormManagerNote";
import { IManagerNote } from "../types/acedemy.type";

export default function ManagerNote() {
    // const { control, handleSubmit } = useForm({
    //     defaultValues: patchValues({
    //         name: "",
    //         description: "",
    //         nivel: "",
    //     }, note),
    // });
    const {
        props: { managerNotes },
    }: { props: { managerNotes: IManagerNote[] | [] } } = usePage();
    const [isOpen, setIsOpen] = useState(false);
    function close() {
        setIsOpen(false);
    }

    return (
        <div>
            <h3 className="text-3xl font-bold mt-3">
                <span>Manager de Notas</span>
                <button
                    onClick={() => {
                        setIsOpen(true);
                    }}
                    className="bg-slate-800 ml-2 text-white p-2 rounded-lg text-sm"
                >
                   {managerNotes ? 'Editar' : 'Agregar'}
                </button>
            </h3>
            {managerNotes && (
                <div className="table shadow-md rounded-lg p-3">
                    <table>
                        <thead>
                            <tr>
                                <th>Parcial</th>
                                <th>Notas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {managerNotes?.map(
                                (item, index) => (
                                    <tr key={item.id}>
                                        <td className="text-center p-2">{item.partial}</td>
                                        <td className="text-center p-2">
                                            <ul>
                                               {
                                                   item.input_notes.map((note, index) => (
                                                       <li key={note.id}>{note.name} | {note.value}%</li>
                                                   ))
                                               }
                                            </ul>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            {isOpen && (
                <DialogFormManagerNote
                    note={managerNotes[0]}
                    close={() => {
                        setIsOpen(false);
                    }}
                ></DialogFormManagerNote>
            )}
        </div>
    );
}
