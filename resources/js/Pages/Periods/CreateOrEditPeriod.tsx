import DialogCustom from "@/Components/DialogCustom";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { IPeriod } from "./types/period.types";
import Button from "@mui/material/Button";
import axios from "axios";
import { router } from "@inertiajs/react";
import DialogActions from "@mui/material/DialogActions";
import dayjs from "dayjs";
import Input from "@/Components/Input";
import { useForm } from "react-hook-form";
import InputDate from "@/Components/InputDate";
import { patchValues } from "@/Helpers/patchValues";
import { showToast } from "@/Helpers/alerts";

interface CreateOrEditPeriodProps {
    // state: "create" | "edit";
    isOpen: boolean;
    period?: IPeriod;
    setIsOpen: (isOpen: boolean) => void;
}

export const CreateOrEditPeriod = ({
    isOpen,
    period,
    setIsOpen,
}: CreateOrEditPeriodProps) => {
    // const {
    //     data: form,
    //     setData: setForm,
    //     post,
    //     errors,
    //     put,
    // } = useForm<any>({
    //     description: "",
    //     start_date: "",
    //     end_date: "",
    //     promotion: "",
    // });
    const { control, setValue, handleSubmit } = useForm({
        defaultValues: patchValues(
            {
                observation: null,
                start_date: null,
                end_date: null,
                promotion: null,
            },
            period
        ),
    });

    // const [state, setState] = useState<"create" | "edit">("create");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // useEffect(() => {
        // if (data) {
        //     setForm({
        //         ...data,
        //         start_date: dayjs(data.start_date),
        //         end_date: dayjs(data.end_date),
        //     });
        //     setState("edit");
        // } else {
        //     setForm({
        //         description: "",
        //         start_date: "",
        //         end_date: "",
        //         promotion: "",
        //     });
        //     setState("create");
        // }
    // }, [data]);

    // function handlerSetForm(e: any) {
    //     setForm({ ...form, [e.target.id]: e.target.value });
    // }

    // function handleChangeDate(key: string, value: any): void {
    //     setForm((values: any) => ({
    //         ...values,
    //         [key]: value,
    //     }));
    // }

    // function getFormValues() {
    //     console.log(form);
    //     form.start_value;
    //     return {
    //         values: {
    //             description: form.description,
    //             start_date: form.start_date?.format?.("YYYY-MM-DD"),
    //             end_date: form.end_date?.format?.("YYYY/MM/DD"),
    //             promotion: form.promotion,
    //         },
    //         isValid: Object.keys(form).every(
    //             (key) =>
    //                 form[key] !== "" &&
    //                 form[key] !== null &&
    //                 form[key] !== undefined
    //         ),
    //     };
    // }

    function saveInServer(data: any) {
        // const { values, isValid } = getFormValues();
        // if (isValid) {
        setIsLoading(true);
        console.log({ data });
        const options = {
            preserveState: true,
            onSuccess: (e: any) => {
                console.log({ e });
                setIsLoading(false);
                setIsOpen(false);
            },
            onError: (e: any) => {
                setIsLoading(false);
                showToast({
                    icon: "error",
                    text: Object.values(e).join("\n"),
                    title: "Error al crear el estudiante",
                });
            },
        };
        if (!period) {
            router.post("/periods", data, options);
        } else {
            router.put(`/periods/${period?.id}`, data, options);
        }
    }

    return (
        <div>
            <DialogCustom
                open={isOpen}
                title={`${!period ? "Creando" : "Editando"} periodo`}
            >
                <form onSubmit={handleSubmit(saveInServer)}>
                    <div className="grid grid-cols-1 gap-5">
                        <Input
                            name="observation"
                            control={control}
                            label="Observación"
                        />
                        <InputDate
                            control={control}
                            readOnly
                            name="start_date"
                            label="Inicio"
                            rules={{ required: true }}
                            setValue={setValue}
                        />

                        <InputDate
                            readOnly
                            control={control}
                            name="end_date"
                            label="Final"
                            rules={{ required: true }}
                            setValue={setValue}
                        />

                        <Input
                            control={control}
                            name="promotion"
                            label="Promoción"
                            rules={{ required: true }}
                        />

                        <div className="flex items-center gap-2">
                            <button
                                disabled={isLoading}
                                type="submit"
                                className={`${
                                    isLoading ? "is-loading" : ""
                                } btn-custom btn-created bg-slate-900 text-white`}
                            >
                                Guardar
                                <i className="fa-regular fa-paper-plane"></i>
                            </button>
                            <button
                                disabled={isLoading}
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className={`btn-custom btn-created bg-red-500 text-white`}
                            >
                                Cerrar <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </DialogCustom>
        </div>
    );
};
