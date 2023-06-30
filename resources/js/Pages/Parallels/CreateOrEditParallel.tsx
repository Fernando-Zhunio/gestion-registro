import DialogCustom from "@/Components/DialogCustom";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { router } from "@inertiajs/react";
import DialogActions from "@mui/material/DialogActions";
import { IParallel } from "./types/parallel.types";
import { useForm } from "react-hook-form";
import { useFetch } from "@/Hooks/UseFetch";
import { showToast } from "@/Helpers/alerts";
// import dayjs from "dayjs";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import { showToast } from "@/Helpers/alerts";

interface CreateOrEditCourseProps {
    state: "create" | "edit";
    isOpen: boolean;
    data?: IParallel;
    setIsOpen: (isOpen: boolean) => void;
}

export const CreateOrEditCourse = ({
    isOpen,
    data,
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
    const {
        register,
        formState: { errors },
        resetField,
        reset,
        setValue,
        handleSubmit,
    } = useForm<any>();
    const [state, setState] = useState<"create" | "edit">("create");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data: courses } = useFetch("/parallels/courses");

    useEffect(() => {
        reset()
        if (data) {
            Object.keys(data).forEach((key) => {
                setValue(key, (data as any)[key]);
            });
            
            setState("edit");
        } else {
            // reset()
            setState("create");
        }
        
    }, [data, isOpen]);

    function handlerSetForm(e: any) {
        // setForm({ ...form, [e.target.id]: e.target.value });
    }

    function onSubmit(_data: any) {
        if (state === "create") {
            router.post("/parallels", _data, {
                preserveState: true,
                onSuccess: (e) => {
                    console.log({ e });
                    setIsLoading(false);
                    setIsOpen(false);
                    reset();
                },
                onError: (e) => {
                    console.log({ e });
                    showToast({
                        icon: "error",
                        text: Object.values(e).join("\n"),
                        title: "Error al crear el estudiante",
                    });
                    setIsLoading(false);
                },
            });
        } else if (state === "edit") {
            router.put(`/parallels/${data?.id}`, _data, {
                preserveState: true,
                replace: false,
                preserveScroll: true,
                onSuccess: (e) => {
                    console.log({ e });
                    setIsLoading(false);
                    setIsOpen(false);
                },
                onError: (e) => {
                    showToast({
                        icon: "error",
                        text: Object.values(e).join("\n"),
                        title: "Error al crear el estudiante",
                    });
                    setIsLoading(false);
                },
            });
        }
    }

    return (
        <div>
            <DialogCustom
                open={isOpen}
                title={`${state === "create" ? "Creando" : "Editando"} Paralelo`}
            >   
            <hr />
                <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid md:grid-cols-12 gap-4">
                        <div className="md:col-span-6">
                            <label htmlFor="name">*Nombres:</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Ingrese el nombre"
                                className={`${
                                    errors.name && "invalid-control"
                                } form-control w-full `}
                                {...register("name", { required: true })}
                                aria-invalid={errors.name ? "true" : "false"}
                            />
                            {errors?.name?.type === "required" && (
                                <small className="text-red-600">
                                    Los nombre es requerido
                                </small>
                            )}
                        </div>
                        <div className="md:col-span-6">
                            <label htmlFor="description">*Descripción:</label>
                            <input
                                id="description"
                                type="text"
                                placeholder="Ingrese la descripción"
                                className={`${
                                    errors.description && "invalid-control"
                                } form-control w-full `}
                                {...register("description", { required: true })}
                            />
                            {errors?.description?.type === "required" && (
                                <small className="text-red-600">
                                    Los descripción es requerido
                                </small>
                            )}
                        </div>
                        <div className="md:col-span-6">
                            <label htmlFor="quota">
                                *Numero de estudiantes:
                            </label>
                            <input
                                id="quota"
                                type="number"
                                min={1}
                                placeholder="Ingrese el numero de estudiantes"
                                className={`${
                                    errors.quota && "invalid-control"
                                } form-control w-full `}
                                {...register("quota", { required: true })}
                            />
                            {errors?.quota?.type === "required" && (
                                <small className="text-red-600">
                                    El numero de estudiantes es requerido
                                </small>
                            )}
                        </div>

                        {/* genero - r_gender */}
                        <div className="md:col-span-6">
                            <label htmlFor="course_id">*Curso</label>
                            <select
                                id="course_id"
                                className={`${
                                    errors.course_id && "invalid-control"
                                } form-control w-full `}
                                {...register("course_id", { required: true })}
                            >
                                {courses?.data?.map((item: any, index: number) => {
                                    return (
                                        <option key={index} value={item.id}>
                                           {item.name} - {item.nivel}
                                        </option>
                                    );
                                })}
                            </select>
                            {errors?.course_id?.type === "required" && (
                                <small className="text-red-600">
                                    El curso es requerido
                                </small>
                            )}
                        </div>
                    </div>
                        <hr className="my-3" />
                    <div className="flex gap-4">
                    <button
                         className="btn bg-create"
                        type="submit"
                        disabled={isLoading}
                    >
                        Guardar <i className="fa-regular fa-paper-plane"></i>
                    </button>
                    <button
                        className="btn bg-delete"
                        type="button"
                        onClick={() => setIsOpen(false)}
                    >
                        Cerrar <i className="fa-solid fa-xmark ml-2"></i>
                    </button>
                    </div>
                </form>
                {/* <DialogActions slot="slotAction"> */}
                    {/* <Button
                        disabled={isLoading}
                        onClick={saveInServer}
                        variant="contained"
                        color="success"
                    >
                        Guardar{" "}
                        <i className="fa-regular fa-paper-plane ml-2"></i>
                    </Button> */}
                    {/* <Button
                        variant="contained"
                        color="error"
                        onClick={() => setIsOpen(false)}
                    >
                        Cerrar <i className="fa-solid fa-xmark ml-2"></i>
                    </Button> */}
                {/* </DialogActions> */}
            </DialogCustom>
        </div>
    );
};
