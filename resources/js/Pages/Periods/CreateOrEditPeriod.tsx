import DialogCustom from "@/Components/DialogCustom";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { Period } from "./types/period.types";
import Button from "@mui/material/Button";
import axios from "axios";
import { router, useForm } from "@inertiajs/react";
import DialogActions from "@mui/material/DialogActions";
import dayjs from "dayjs";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { showToast } from "@/Helpers/alerts";

interface CreateOrEditPeriodProps {
    state: "create" | "edit";
    isOpen: boolean;
    data?: Period;
    setIsOpen: (isOpen: boolean) => void;
}

export const CreateOrEditPeriod = ({
    isOpen,
    data,
    setIsOpen,
}: CreateOrEditPeriodProps) => {
    const {
        data: form,
        setData: setForm,
        post,
        errors,
        put,
    } = useForm<any>({
        description: "",
        start_date: "",
        end_date: "",
        promotion: "",
    });

    const [state, setState] = useState<"create" | "edit">("create");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (data) {
            setForm({
                ...data,
                start_date: dayjs(data.start_date),
                end_date: dayjs(data.end_date),
            });
            setState("edit");
        } else {
            setForm({
                description: "",
                start_date: "",
                end_date: "",
                promotion: "",
            });
            setState("create");
        }
    }, [data]);

    function handlerSetForm(e: any) {
        setForm({ ...form, [e.target.id]: e.target.value });
    }

    function handleChangeDate(key: string, value: any): void {
        setForm((values: any) => ({
            ...values,
            [key]: value,
        }));
    }

    function getFormValues() {
        console.log(form);
        form.start_value;
        return {
            values: {
                description: form.description,
                start_date: form.start_date?.format?.("YYYY-MM-DD"),
                end_date: form.end_date?.format?.("YYYY/MM/DD"),
                promotion: form.promotion,
            },
            isValid: Object.keys(form).every(
                (key) =>
                    form[key] !== "" &&
                    form[key] !== null &&
                    form[key] !== undefined
            ),
        };
    }

    function saveInServer() {
        const { values, isValid } = getFormValues();
        // if (isValid) {
        setIsLoading(true);
        if (state === "create") {
            post("/periods", {
                preserveState: true,
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
        } else if (state === "edit") {
            put(`/periods/${data?.id}`, {
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
        // } else {
        //     showToast({
        //         icon: "error",
        //         text: "Todos los campos son requeridos",
        //     });
        // }
    }

    return (
        <div>
            <DialogCustom
                open={isOpen}
                title={`${state === "create" ? "Creando" : "Editando"} periodo`}
            >
                <form>
                    <div className="grid grid-cols-1 gap-5">
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

                        <DatePicker
                            onChange={(value: any) =>
                                handleChangeDate("start_date", value)
                            }
                            className="w-full"
                            slotProps={{
                                textField: {
                                    required: true,
                                    variant: "filled",
                                    fullWidth: true,
                                    error: Boolean(errors.start_date),
                                    helperText: errors.start_date,
                                },
                            }}
                            format="DD/MM/YYYY"
                            disableFuture
                            value={form.start_date}
                            label="Inicio"
                            maxDate={form.end_date}
                        />

                        <DatePicker
                            onChange={(value: any) =>
                                handleChangeDate("end_date", value)
                            }
                            className="w-full"
                            slotProps={{
                                textField: {
                                    required: true,
                                    variant: "filled",
                                    fullWidth: true,
                                    error: Boolean(errors.end_date),
                                    helperText: errors.end_date,
                                },
                            }}
                            format="DD/MM/YYYY"
                            disableFuture
                            minDate={form.start_date}
                            value={form.end_date}
                            label="Finalización"
                        />

                        <TextField
                            fullWidth
                            required
                            label="Promoción"
                            variant="filled"
                            value={form.promotion}
                            id="promotion"
                            onChange={handlerSetForm}
                            error={Boolean(errors.promotion)}
                            helperText={errors.promotion}
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
