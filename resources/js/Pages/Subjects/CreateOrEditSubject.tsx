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
    state: "create" | "edit";
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const CreateOrEditSubject = ({
    data,
    state,
    isOpen,
    setIsOpen,
}: CreateOrEditSubjectProps) => {
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

    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
        setError,
    } = useForm();

    useEffect(() => {
        // setValue("course_id", null);
        // 
        register("course_id", {required: true});
    }, []);
    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div>
            {/* <DialogSearch
                close={closeModalRepresentativeSelect}
                isOpen={isOpenRepresentativeSelect}
                {...optionsSearch}
                onSelectRow={onSelectRow}
            /> */}
            <DialogCustom
                open={isOpen}
                title={`${state === "create" ? "Creando" : "Editando"} Materia`}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <hr />
                    <div className="grid md:grid-cols-12 gap-4 py-3">
                        <FormSubject
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
                            className="rounded-md bg-slate-800 text-white px-3 py-2"
                        >
                            Guardar{" "}
                            <i className="fa-regular fa-paper-plane ml-2"></i>
                        </button>
                        <button
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
