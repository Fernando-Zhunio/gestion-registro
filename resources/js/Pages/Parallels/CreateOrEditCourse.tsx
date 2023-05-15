import DialogCustom from "@/Components/DialogCustom";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { Course } from "./types/course.types";
import Button from "@mui/material/Button";
import axios from "axios";
import { router, useForm } from "@inertiajs/react";
import DialogActions from "@mui/material/DialogActions";
// import dayjs from "dayjs";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import { showToast } from "@/Helpers/alerts";

interface CreateOrEditCourseProps {
    state: "create" | "edit";
    isOpen: boolean;
    data?: Course;
    setIsOpen: (isOpen: boolean) => void;
}

export const CreateOrEditCourse = ({
    isOpen,
    data,
    setIsOpen,
}: CreateOrEditCourseProps) => {
    const {
        data: form,
        setData: setForm,
        reset,
        post,
        errors,
        clearErrors,
        put,
    } = useForm<any>({
        name: "",
        description: "",
        nivel: "",
    });

    const [state, setState] = useState<"create" | "edit">("create");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (data) {
            setForm({
                ...data,
            });
            setState("edit");
        } else {
            setForm({
                name: "",
                description: "",
                nivel: "",
            });
            setState("create");
        }
        console.log({ data })
    }, [data]);

    function handlerSetForm(e: any) {
        setForm({ ...form, [e.target.id]: e.target.value });
    }

    

    function saveInServer() {
        if (state === "create") {
            post("/courses", {
                preserveState: true,
                onSuccess: (e) => {
                    console.log({ e });
                    setIsLoading(false);
                    setIsOpen(false);
                    reset();
                },
                onError: (e) => {
                    console.log({ e });
                    setIsLoading(false);
                },
            });
        } else if (state === "edit") {
            put(`/courses/${data?.id}`, {
                preserveState: true,
                replace: false,
                preserveScroll: true,
                onSuccess: (e) => {
                    console.log({ e });
                    setIsLoading(false);
                    setIsOpen(false);
                },
                onError: (e) => {
                    console.log({ e });
                    setIsLoading(false);
                },
            });
        }
    }

    return (
        <div>
            <DialogCustom
                open={isOpen}
                title={`${state === "create" ? "Creando" : "Editando"} curso`}
            >
                <form>
                    <div className="grid grid-cols-1 gap-5">
                        <TextField
                            required
                            fullWidth
                            label="Nombre"
                            variant="filled"
                            value={form.name}
                            onChange={handlerSetForm}
                            id="name"
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                        ></TextField>
                        <TextField
                            required
                            fullWidth
                            label="Descripción"
                            variant="filled"
                            value={form.description}
                            onChange={handlerSetForm}
                            id="description"
                            error={Boolean(errors.description)}
                            helperText={errors.description}
                        ></TextField>
                        <TextField
                            fullWidth
                            required
                            label="Promoción"
                            variant="filled"
                            value={form.nivel}
                            id="nivel"
                            onChange={handlerSetForm}
                            error={Boolean(errors.nivel)}
                            helperText={errors.nivel}
                        ></TextField>

                        <div></div>
                    </div>
                </form>
                <DialogActions slot="slotAction">
                    <Button
                        disabled={isLoading}
                        onClick={saveInServer}
                        variant="contained"
                        color="success"
                    >
                        Guardar{" "}
                        <i className="fa-regular fa-paper-plane ml-2"></i>
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => setIsOpen(false)}
                    >
                        Cerrar <i className="fa-solid fa-xmark ml-2"></i>
                    </Button>
                </DialogActions>
            </DialogCustom>
        </div>
    );
};
