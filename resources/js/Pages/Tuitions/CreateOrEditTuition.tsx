import DialogCustom from "@/Components/DialogCustom";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { router, useForm as useFormInertia } from "@inertiajs/react";
import DialogActions from "@mui/material/DialogActions";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import FormCreateOrEditTuition from "./Components/FormCreateOrEditTuition";
import { useForm } from "react-hook-form";
import DialogSearch from "@/Components/DialogSearch";
import { ITuition } from "./types/tuition";

interface CreateOrEditCourseProps {
    state: "create" | "edit";
    isOpen: boolean;
    data?: ITuition;
    setIsOpen: (isOpen: boolean) => void;
}

const CreateOrEditTuition = ({ data }: CreateOrEditCourseProps) => {
    const {
        data: form,
        setData: setForm,
        reset,
        post,
        errors,
        clearErrors,
        put,
    } = useFormInertia<any>({
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

    const [isOpenRepresentativeSelect, setIsOpenRepresentativeSelect] =
        useState(false);

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

    const closeModalRepresentativeSelect = () => {
        setIsOpenRepresentativeSelect(false);
    };

    return (
        <div className="Container">
            <DialogSearch
                close={closeModalRepresentativeSelect}
                isOpen={isOpenRepresentativeSelect}
                placeholder="Buscador Estudiante"
                path="/students"
                columns={{ first_name: "Nombres", last_name: "Apellidos", doc_number: "DNI", photo: "Foto" }}
            />
            <div className="font-bold text-4xl mb-3">
                {" "}
                {state === "create" ? "Creando" : "Editando"} Matricula
            </div>
            <Card>
                <CardContent>
                        <FormCreateOrEditTuition
                            setIsOpen={setIsOpenRepresentativeSelect}
                            handlerSetForm={handlerSetForm}
                            errors={errors as unknown as any}
                            form={form}
                        ></FormCreateOrEditTuition>
                </CardContent>
            </Card>
            {/* <DialogActions slot="slotAction">
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
            </DialogActions> */}
        </div>
    );
};

export default CreateOrEditTuition;
