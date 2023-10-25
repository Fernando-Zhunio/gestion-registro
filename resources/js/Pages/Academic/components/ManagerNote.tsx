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
        props: { managerNote },
    }: { props: { managerNote: IManagerNote | null } } = usePage();
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
                   {managerNote ? 'Editar' : 'Agregar'}
                </button>
            </h3>
            {managerNote && (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {managerNote?.notes?.map(
                                ({ value, name }, index) => (
                                    <tr key={index}>
                                        <td>{name}</td>
                                        <td>{value}%</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            {isOpen && (
                <DialogFormManagerNote
                    note={managerNote}
                    close={() => {
                        setIsOpen(false);
                    }}
                ></DialogFormManagerNote>
            )}
        </div>
    );
}
