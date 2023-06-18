import DialogCustom from "@/Components/DialogCustom";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { IPeriod } from "../Periods/types/period.types";
import Button from "@mui/material/Button";
import axios from "axios";
import { router, useForm } from "@inertiajs/react";
import DialogActions from "@mui/material/DialogActions";
import dayjs from "dayjs";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { showToast } from "@/Helpers/alerts";
import DialogSearch from "@/Components/DialogSearch";

interface CreateOrEditSubjectProps {
    isEdit: boolean;
    data?: IPeriod;
}

export const CreateOrEditSubject = ({
    isEdit,
    data,
}: CreateOrEditSubjectProps) => {
    const [optionsSearch, setOptionsSearch] = useState({
        placeholder: "Buscador Paralelos",
        path: "subjects/parallels",
        columns: {
            first_name: "Nombres",
            last_name: "Apellidos",
            doc_number: "DNI",
        },
    });
    const [isOpenRepresentativeSelect, setIsOpenRepresentativeSelect] =
    useState(false);

    const closeModalRepresentativeSelect = () => {
        setIsOpenRepresentativeSelect(false);
    };

    function onSelectRow(row: IParallel) {
        console.log({ row, optionsSearch });
        if (optionsSearch.path === "/tuitions/representatives") {
            console.log("representative");
            setRepresentative(row as IRepresentative);
        } else if (optionsSearch.path === "/tuitions/students") {
            setStudent(row as IStudent);

        }
    }

    return (
        <div>
            <DialogSearch
                close={closeModalRepresentativeSelect}
                isOpen={isOpenRepresentativeSelect}
                {...optionsSearch}
                onSelectRow={onSelectRow}
            />
            <div className="font-bold text-4xl mb-3">
                {" "}
                {!isEdit ? "Creando" : "Editando"} Matricula
            </div>
        </div>
    );
};
