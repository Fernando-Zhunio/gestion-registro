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
    isEdit: boolean;
    data?: IPeriod;
}

const CreateOrEditSubject = ({ isEdit, data }: CreateOrEditSubjectProps) => {
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
        
    } = useForm();

  
    useEffect(() => {
        setValue("course_id", '4');
    }, []);
    const onSubmit = (data: any) => {
        console.log(data);
    }

    return (
        <div>
            {/* <DialogSearch
                close={closeModalRepresentativeSelect}
                isOpen={isOpenRepresentativeSelect}
                {...optionsSearch}
                onSelectRow={onSelectRow}
            /> */}
            <div className="font-bold text-4xl mb-3">
                {" "}
                {!isEdit ? "Creando" : "Editando"} Materia
            </div>
            <Card style={{overflow: 'inherit'}}>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}  className="grid md:grid-cols-12 gap-4">
                        <FormSubject
                            errors={errors}
                            register={register}
                            setValue={setValue}
                        ></FormSubject>
                        <div className="col-span-12 my-3">
                    <button
                        // disabled={isLoading}
                        className="rounded-md bg-slate-800 text-white px-3 py-2"
                        type="submit"
                    >
                        {isEdit ? "Actualizar" : "Crear"} materia{" "}
                        <i className="fa-regular fa-paper-plane"></i>
                    </button>
                </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateOrEditSubject;
