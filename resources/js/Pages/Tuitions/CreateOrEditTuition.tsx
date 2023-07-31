import { useCallback, useEffect, useState } from "react";

import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import FormCreateOrEditTuition from "./Components/FormCreateOrEditTuition";
// import { useForm } from "react-hook-form";
import DialogSearch from "@/Components/DialogSearch";
import { ITuition } from "./types/tuition";
import { IStudent } from "../Students/types/student.types";
import { ConstDocTypes, ConstGender } from "@/Classes/Consts";
import { IRepresentative } from "../Representatives/types/representatives";
import { IParallel } from "../Parallels/types/parallel.types";
import { useFetch } from "@/Hooks/UseFetch";
import { useForm } from "react-hook-form";
import { router, usePage } from "@inertiajs/react";
import { Avatar } from "@mui/material";
import axios from "axios";
import { showToast } from "@/Helpers/alerts";

interface CreateOrEditCourseProps {
    state: "create" | "edit";
    isOpen: boolean;
    data?: ITuition;
    setIsOpen: (isOpen: boolean) => void;
}

const CreateOrEditTuition = ({ data }: CreateOrEditCourseProps) => {
    const [student, setStudent] = useState<IStudent | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [representative, setRepresentative] =
        useState<IRepresentative | null>(null);
    const [optionsSearch, setOptionsSearch] = useState({
        placeholder: "Buscador Representante",
        path: "/tuitions/representatives",
        columns: {
            first_name: "Nombres",
            last_name: "Apellidos",
            doc_number: "DNI",
        },
    });

    const [isOpenRepresentativeSelect, setIsOpenRepresentativeSelect] =
        useState(false);

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const constDocTypes = useCallback(ConstDocTypes, []);
    const constGender = useCallback(ConstGender, []);
    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
    } = useForm();

    const { props: {courses} } = usePage<any>();

    useEffect(() => {
        console.log({ data });
        if (data) {
            setIsEdit(true);
        }
        console.log({ data });
    }, [data]);

    const closeModalRepresentativeSelect = () => {
        setIsOpenRepresentativeSelect(false);
    };

    function onSelectRow(row: IStudent | IRepresentative) {
        console.log({ row, optionsSearch });
        if (optionsSearch.path === "/tuitions/representatives") {
            console.log("representative");
            setRepresentative(row as IRepresentative);
        } else if (optionsSearch.path === "/tuitions/students") {
            setStudent(row as IStudent);
        }
    }

    function searchRepresentative() {
        const optionsSearch = {
            placeholder: "Buscador Representante",
            path: "/tuitions/representatives",
            columns: {
                first_name: "Nombres",
                last_name: "Apellidos",
                doc_number: "DNI",
            },
        };
        setOptionsSearch(optionsSearch);
        setIsOpenRepresentativeSelect(true);
    }

    function searchStudent() {
        const optionsSearch = {
            placeholder: "Buscador Estudiante",
            path: "/tuitions/students",
            columns: {
                first_name: "Nombres",
                last_name: "Apellidos",
                doc_number: "DNI",
                photo: "Foto",
            },
        };
        setOptionsSearch(optionsSearch);
        setIsOpenRepresentativeSelect(true);
    }

    function openSearch(option: "student" | "representative" = "student") {
        if (option === "student") {
            searchStudent();
        } else {
            searchRepresentative();
        }
    }

    function clearRepresentative() {
        setRepresentative(null);
    }

    const [parallels, setParallels] = useState<IParallel[]>([]);
    const { fetchUrl } = useFetch(
        "/tuitions/parallels",
        "GET" as any,
        {},
        false
    );

    async function getParallelsByCourse(courseId: number) {
        console.log({ courseId });
        const parallels = await fetchUrl({
            info: { params: { course_id: courseId } },
        });
        console.log({ data: parallels.data });
        setParallels(parallels.data);
    }

    function saveInServer(data : any) {
        console.log({data})
        const options = {
            forceFormData: true,
            onSuccess: () => {
                setIsLoading(false);
            },
            onError: (error: any) => {
                console.log({ error });
                setIsLoading(false);
                showToast({
                    icon: "error",
                    text: Object.values(error).join("\n"),
                    title: "Error al crear el estudiante",
                });
            },
        };
        router.post("/tuitions/students/"+student?.id, data, options);
    }


    return (
        <div className="Container">
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
            <Card>
                <CardContent>
                    {student ? (
                        <form onSubmit={handleSubmit(saveInServer)} className="col-span-12 border px-4 py-3 rounded-lg mt-5">
                            <div className="col-span-12 flex justify-between items-center">
                                <h2 className="flex items-center text-slate-700 border-b-1 font-bold text-2xl gap-2">
                                    <Avatar
                                        src={student.photo || "/img/avatar.png"}
                                    />
                                    Estudiante
                                </h2>
                                <button
                                    onClick={(e) => setStudent(null)}
                                    type="button"
                                    className="btn-custom bg-red-700 text-white rounded-sm my-2 shadow-sm"
                                >
                                    Quitar estudiante
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
                                    {
                                        (constGender() as any)[
                                            student.gender as any
                                        ]
                                    }
                                </div>
                                <div className="md:col-span-3">
                                    <h3 className="bold text-2xl">Teléfono:</h3>
                                    {student.phone}
                                </div>
                                <div className="md:col-span-3">
                                    <h3 className="bold text-2xl">
                                        Tipo de documento:
                                    </h3>
                                    {
                                        (constDocTypes() as any)[
                                            student.doc_type as any
                                        ]
                                    }
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
                                <div className="md:col-span-3">
                                    <label htmlFor="course_id">Curso</label>
                                    <select
                                        className={`${
                                            errors.course_id &&
                                            "invalid-control"
                                        } form-control w-full `}
                                        {...register("course_id", {
                                            required: true,
                                        })}
                                        onChange={($event: any) =>
                                            getParallelsByCourse(
                                                $event.target.value
                                            )
                                        }
                                    >
                                        {courses?.map((item: any) => {
                                            return (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.name} - {item.nivel}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {errors?.course_id?.type === "required" && (
                                        <small className="text-red-600">
                                            El curso es requerido
                                        </small>
                                    )}
                                </div>
                                {/* paralelo - parallel_id */}
                                <div className="md:col-span-3">
                                    <label htmlFor="course_id">Paralelo</label>
                                    <select
                                        className={`${
                                            errors.course_id &&
                                            "invalid-control"
                                        } form-control w-full `}
                                        {...register("parallel_id", {
                                            required: true,
                                        })}
                                    >
                                        {parallels?.map((item: any) => {
                                            return (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.name} - {item.nivel}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {errors?.course_id?.type === "required" && (
                                        <small className="text-red-600">
                                            El curso es requerido
                                        </small>
                                    )}
                                </div>
                                <div className="col-span-12 my-3">
                                    <button
                                        disabled={isLoading}
                                        className={`rounded-md bg-slate-800 text-white px-3 py-2 ${isLoading ? "is-loading" : ""}`}
                                        type="submit"
                                    >
                                        Generar matricula{" "}
                                        <i className="fa-regular fa-paper-plane"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <FormCreateOrEditTuition
                            isEdit={isEdit}
                            openSearch={openSearch}
                            setRepresentative={setRepresentative}
                            representative={representative}
                            clearRepresentative={clearRepresentative}
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
