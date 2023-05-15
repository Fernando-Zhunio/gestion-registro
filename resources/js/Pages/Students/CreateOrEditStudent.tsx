import DialogCustom from "@/Components/DialogCustom";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { Student } from "./types/student.types";
import Button from "@mui/material/Button";
import axios from "axios";
import { router, useForm } from "@inertiajs/react";
import DialogActions from "@mui/material/DialogActions";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import FormCreateOrEditStudent from "./Components/FormCreateOrEditStudent";
// import dayjs from "dayjs";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import { showToast } from "@/Helpers/alerts";

interface CreateOrEditCourseProps {
    state: "create" | "edit";
    isOpen: boolean;
    data?: Student;
    setIsOpen: (isOpen: boolean) => void;
}

const CreateOrEditStudent = ({ data }: CreateOrEditCourseProps) => {
    const {
        data: form,
        setData: setForm,
        reset,
        post,
        errors,
        clearErrors,
        put,
    } = useForm<any>({
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        address: null,
        doc_type: null,
        doc_number: null,
        birthday: null,
        gender: null,
        photo: null,
        previous_institution: null,
        illness_or_disability: null,
        course_id: null,
        representative_id: null,
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
        console.log({ data });
    }, [data]);

    function handlerSetForm(key: string, value: any) {
        setForm({ ...form, [key]: value });
    }

    function saveInServer() {
        if (state === "create") {
            post("/courses", {
                preserveState: true,
                onSuccess: (e) => {
                    console.log({ e });
                    setIsLoading(false);
                    // setIsOpen(false);
                    reset();
                },
                onError: (e) => {
                    console.log({ e });
                    setIsLoading(false);
                },
            });
        } else if (state === "edit") {
            put(`/students/${data?.id}`, {
                preserveState: true,
                replace: false,
                preserveScroll: true,
                onSuccess: (e) => {
                    console.log({ e });
                    setIsLoading(false);
                    // setIsOpen(false);
                },
                onError: (e) => {
                    console.log({ e });
                    setIsLoading(false);
                },
            });
        }
    }

    return (
        <div className="Container">
            <div className="font-bold text-4xl mb-3">
                {" "}
                {state === "create" ? "Creando" : "Editando"} Estudiante
            </div>
            <Card>
                <CardContent>
                    <FormCreateOrEditStudent handlerSetForm={handlerSetForm} errors={errors as unknown as Student} form={form}></FormCreateOrEditStudent>
                </CardContent>
            </Card>
            <DialogActions slot="slotAction">
                <Button
                    disabled={isLoading}
                    onClick={saveInServer}
                    variant="contained"
                    color="success"
                >
                    Guardar <i className="fa-regular fa-paper-plane ml-2"></i>
                </Button>
                <Button variant="contained" color="error">
                    Cerrar <i className="fa-solid fa-xmark ml-2"></i>
                </Button>
            </DialogActions>
        </div>
    );
};

export default CreateOrEditStudent;
