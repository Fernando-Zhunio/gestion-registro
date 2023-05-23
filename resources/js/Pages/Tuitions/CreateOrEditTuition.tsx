import { useCallback, useEffect, useState } from "react";
import { router, useForm as useFormInertia } from "@inertiajs/react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import FormCreateOrEditTuition from "./Components/FormCreateOrEditTuition";
import { useForm } from "react-hook-form";
import DialogSearch from "@/Components/DialogSearch";
import { ITuition } from "./types/tuition";
import { IStudent } from "../Students/types/student.types";
import { ConstDocTypes, ConstGender } from "@/Classes/Consts";

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

    const [student, setStudent] = useState<IStudent | null>(null);

    const [isOpenRepresentativeSelect, setIsOpenRepresentativeSelect] =
        useState(false);

    const [state, setState] = useState<"create" | "edit">("create");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const constDocTypes = useCallback(ConstDocTypes, []);
    const constGender = useCallback(ConstGender, []);

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

    function onSelectRow(row: IStudent) {
        setStudent(row);
        console.log({ row });
    }

    return (
        <div className="Container">
            <DialogSearch
                close={closeModalRepresentativeSelect}
                isOpen={isOpenRepresentativeSelect}
                placeholder="Buscador Estudiante"
                path="/tuitions/students"
                columns={{
                    first_name: "Nombres",
                    last_name: "Apellidos",
                    doc_number: "DNI",
                    photo: "Foto",
                }}
                onSelectRow={onSelectRow}
            />
            <div className="font-bold text-4xl mb-3">
                {" "}
                {state === "create" ? "Creando" : "Editando"} Matricula
            </div>
            <Card>
                <CardContent>
                    {student ? (
                        <div className="col-span-12 border px-4 py-3 rounded-lg mt-5">
                            <div className="col-span-12 flex justify-between items-center">
                                <h2 className="flex items-center text-slate-700 border-b-1 font-bold text-3xl">
                                    <img
                                        className="h-16 w-16 object-cover rounded-full"
                                        src={student.photo || "/img/avatar.png"}
                                        alt="Current profile photo"
                                    />{" "}
                                    Estudiante
                                </h2>
                                <button
                                    onClick={(e) => setStudent(null)}
                                    type="button"
                                    className="px-3 py-1 bg-slate-600 text-white rounded-sm my-2 shadow-sm"
                                >
                                    El estudiante no existe
                                </button>
                            </div>
                            <hr />
                            <br />
                            <div className="grid md:grid-cols-12 gap-4">
                                <div className="md:col-span-3">
                                    <h3 className="bold text-2xl">Nombres:</h3>
                                    {student.first_name}
                                </div>
                                <div className="md:col-span-3">
                                    <h3 className="bold text-2xl">
                                        Apellidos:
                                    </h3>
                                    {student.last_name}
                                </div>
                                <div className="md:col-span-3">
                                    <h3 className="bold text-2xl">
                                        Correo electrónico:
                                    </h3>
                                    {student.email}
                                </div>
                                <div className="md:col-span-3">
                                    <h3 className="bold text-2xl">
                                        Fecha de nacimiento:
                                    </h3>
                                    {student.birthday}
                                </div>
                                <div className="md:col-span-6">
                                    <h3 className="bold text-2xl">
                                        Dirección:
                                    </h3>
                                    {student.address}
                                </div>
                                <div className="md:col-span-3">
                                    <h3 className="bold text-2xl">Sexo:</h3>
                                    {constGender()[student.gender as any]}
                                </div>
                                <div className="md:col-span-3">
                                    <h3 className="bold text-2xl">Teléfono:</h3>
                                    {student.phone}
                                </div>
                                <div className="md:col-span-3">
                                    <h3 className="bold text-2xl">
                                        Tipo de documento:
                                    </h3>
                                    {constDocTypes()[student.doc_type as any]}
                                </div>
                                <div className="md:col-span-3">
                                    <h3 className="bold text-2xl">Curso:</h3>
                                    {student.course?.name}
                                </div>
                                <div className="md:col-span-3">
                                    <h3 className="bold text-2xl">
                                        Anterior institución:
                                    </h3>
                                    {student.previous_institution || "Ninguna"}
                                </div>
                                <div className="md:col-span-3">
                                    <h3 className="bold text-2xl">
                                        Discapacidad:
                                    </h3>
                                    {student.illness_or_disability || "Ninguna"}
                                </div>
                                <div className="col-span-12 my-3">
                                    <button
                                        // disabled={isLoading}
                                        className="rounded-md bg-slate-800 text-white px-3 py-2"
                                        type="submit"
                                    >
                                        Generar matricula{" "}
                                        <i className="fa-regular fa-paper-plane"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <FormCreateOrEditTuition
                            setIsOpen={setIsOpenRepresentativeSelect}
                            handlerSetForm={handlerSetForm}
                            errors={errors as unknown as any}
                            form={form}
                        ></FormCreateOrEditTuition>
                    )}
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
