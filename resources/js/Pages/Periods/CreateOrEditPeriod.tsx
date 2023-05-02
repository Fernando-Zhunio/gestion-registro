import DialogCustom from "@/Components/DialogCustom";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { Period } from "./types/period.types";
import Button from "@mui/material/Button";
import axios from "axios";
import { router } from "@inertiajs/react";
import DialogActions from "@mui/material/DialogActions";
import dayjs from "dayjs";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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
    const [form, setForm] = useState<any>(
        { ...data } || {
            description: "",
            start_date: "",
            end_date: "",
            promotion: "",
        }
    );
    const [state, setState] = useState<"create" | "edit">(
        data ? "edit" : "create"
    );
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
        // value = value?.format("YYYY-MM-DD");
        setForm((values: any) => ({
            ...values,
            [key]: value,
        }));
    }

    function getFormValues() {
        console.log(form);
        return {
            values: {
                description: form.description,
                start_date: form.start_date?.format("YYYY-MM-DD"),
                end_date: form.end_date?.format("YYYY-MM-DD"),
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
        setIsLoading(true);
        const { values, isValid } = getFormValues();
        if (isValid) {
            if (state === "create") {
                // axios.post("/periods", form).then((response) => {
                //     setIsLoading(false);
                //     console.log(response);
                // });
                router.post("/periods", values, {
                    preserveState: true,
                    onSuccess: () => {
                        setIsLoading(false);
                        setIsOpen(false);
                    },
                });
            } else if (state === "edit") {
                // axios.put(`/periods/${data?.id}`, form).then((response) => {
                //     setIsLoading(false);
                //     console.log(response);
                // });
                router.put(`/periods/${data?.id}`, values);
            }
        } else {
        }
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
                            fullWidth
                            label="Descripción"
                            variant="filled"
                            value={form.description}
                            onChange={handlerSetForm}
                            id="description"
                        ></TextField>

                        <DatePicker
                            onChange={(value: any) =>
                                handleChangeDate("start_date", value)
                            }
                            className="w-full"
                            slotProps={{
                                textField: {
                                    variant: "filled",
                                    fullWidth: true,
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
                                    variant: "filled",
                                    fullWidth: true,
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
                            label="Promoción"
                            variant="filled"
                            value={form.promotion}
                            id="promotion"
                            onChange={handlerSetForm}
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

            <Snackbar  autoHideDuration={6000} >
                <Alert
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {}
                </Alert>
            </Snackbar>
        </div>
    );
};
