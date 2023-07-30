import DialogCustom from "@/Components/DialogCustom";
// import TextField from "@mui/material/TextField";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { ICourse } from "./types/course.types";
import Button from "@mui/material/Button";
import axios from "axios";
import { router } from "@inertiajs/react";
// import DialogActions from "@mui/material/DialogActions";
import { useForm } from "react-hook-form";
import Input from "@/Components/Input";
import { patchValues } from "@/Helpers/patchValues";
import { showToast } from "@/Helpers/alerts";
// import dayjs from "dayjs";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import { showToast } from "@/Helpers/alerts";

interface CreateOrEditCourseProps {
    // state: "create" | "edit";
    isOpen: boolean;
    course?: ICourse;
    setIsOpen: (isOpen: boolean) => void;
}

export const CreateOrEditCourse = ({
    isOpen,
    course,
    setIsOpen,
}: CreateOrEditCourseProps) => {
    // const {
    //     data: form,
    //     setData: setForm,
    //     reset,
    //     post,
    //     errors,
    //     clearErrors,
    //     put,
    // } = useForm<any>({
    //     name: "",
    //     description: "",
    //     nivel: "",
    // });
    const {control, handleSubmit}= useForm<any>({
        defaultValues: patchValues({
            name: "",
            description: "",
            nivel: "",
        }, course),
    });

    // const [state, setState] = useState<"create" | "edit">("create");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // useEffect(() => {
    //     if (data) {
    //         setForm({
    //             ...data,
    //         });
    //         setState("edit");
    //     }
    // }, [data]);

    // function handlerSetForm(e: any) {
    //     setForm({ ...form, [e.target.id]: e.target.value });
    // }

    

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
        if (!course) {
            router.post("/courses", data, options);
        } else {
            router.put(`/courses/${course?.id}`, data, options);
        }
    }

    return (
        <div>
            <DialogCustom
                open={isOpen}
                title={`${!course  ? "Creando" : "Editando"} curso`}
            >
                <form onSubmit={handleSubmit(saveInServer)}>
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <Input
                                control={control}
                                name="name"
                                label="Nombre"
                                rules={{ required: true }}
                            />
                        </div>

                        <div>
                            <Input
                                control={control}
                                name="nivel"
                                label="Nivel"
                                rules={{ required: true }}
                            />
                        </div>

                        <div>
                            <Input
                                control={control}
                                name="description"
                                label="Observación"
                            />
                        </div>

                        

                        <div></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className={`btn-custom text-white bg-slate-900 ${isLoading ? "is-loading" : ""}`}
                        >
                            Guardar
                            <i className="fa-regular fa-paper-plane ml-2"></i>
                        </button>
                        <button
                            disabled={isLoading}
                            className="btn-custom text-white bg-red-600"
                            onClick={() => setIsOpen(false)}
                        >
                            Cerrar <i className="fa-solid fa-xmark ml-2"></i>
                        </button>
                    </div>
                </form>
            </DialogCustom>
        </div>
    );
};
