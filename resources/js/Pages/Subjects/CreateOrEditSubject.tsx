import DialogCustom from "@/Components/DialogCustom";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { IPeriod } from "../Periods/types/period.types";
import Button from "@mui/material/Button";
import axios from "axios";
import { router } from "@inertiajs/react";
import DialogActions from "@mui/material/DialogActions";
import dayjs from "dayjs";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { showToast } from "@/Helpers/alerts";
import DialogSearch from "@/Components/DialogSearch";
import { ISubject } from "./types/subject.types";
import FormSubject from "@/Shared/FormSubject";
import { set, useForm } from "react-hook-form";
import { Card, CardContent } from "@mui/material";

interface CreateOrEditSubjectProps {
    // isEdit: boolean;
    data?: ISubject;
    // state: "create" | "edit";
    setIsOpen: (isOpen: boolean) => void;
}

const CreateOrEditSubject = ({
    data,
    // state,
    setIsOpen,
}: CreateOrEditSubjectProps) => {
    const [state, setState] = useState<"create" | "edit">("create");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [optionsSearch, setOptionsSearch] = useState({
    //     placeholder: "Buscador Paralelos",
    //     path: "subjects/parallels",
    //     columns: {
    //         first_name: "Nombres",
    //         last_name: "Apellidos",
    //         doc_number: "DNI",
    //     },
    // });
    // const [isOpenRepresentativeSelect, setIsOpenRepresentativeSelect] =
    // useState(false);

    useEffect(() => {
        
        register("course_id", { required: true });
        if (data) {
            console.log({ data });
            // Object.keys(data).forEach((key) => {
            //     setValue(key, (data as any)[key]);
            // });

            setValue("course_id", data.course_id);
            setValue("name", data.name);
            setValue("description", data.description);
            setValue("status", data.status == '1' ? true : false);
            console.log({ data });
            setState("edit");
        } else {
            // reset()
            console.log({ data });
            setState("create");
        }
    }, []);

    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
        setError,
        reset,
        control,
    } = useForm();

    useEffect(() => {
        
    }, []);

    const onSubmit = (_data: any) => {
        if (state === "create") {
            router.post("/subjects", _data, {
                preserveState: true,
                onSuccess: (e) => {
                    console.log({ e });
                    setIsLoading(false);
                    setIsOpen(false);
                    reset();
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
        } else if (state === "edit") {
            console.log({ data });
            router.put(`/subjects/${data?.id}`, _data, {
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
    };

    return (
        <div>
            <DialogCustom
                open={true}
                title={`${state === "create" ? "Creando" : "Editando"} Materia`}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <hr />
                    <div className="grid md:grid-cols-12 gap-4 py-3">
                        <FormSubject
                        data={data}
                            control={control}
                            isEdit={state === "edit"}
                            errors={errors}
                            register={register}
                            setValue={setValue}
                        ></FormSubject>
                        {/* <div className="col-span-12 my-3">
                                <button
                                    // disabled={isLoading}
                                    className="rounded-md bg-slate-800 text-white px-3 py-2"
                                    type="submit"
                                >
                                     Guardar
                                    <i className="fa-regular fa-paper-plane"></i>
                                </button>
                            </div> */}
                    </div>
                    <hr />
                    <DialogActions slot="slotAction">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-md bg-slate-800 text-white px-3 py-2"
                        >
                            Guardar{" "}
                            <i className="fa-regular fa-paper-plane ml-2"></i>
                        </button>
                        <button
                            type="button"
                            className="rounded-md bg-red-800 text-white px-3 py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Cerrar <i className="fa-solid fa-xmark ml-2"></i>
                        </button>
                    </DialogActions>
                </form>
            </DialogCustom>
        </div>
    );
};

export default CreateOrEditSubject;
