import DialogCustom from "@/Components/DialogCustom";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { IStudent } from "./types/student.types";
import Button from "@mui/material/Button";
import axios from "axios";
import { router } from "@inertiajs/react";
import DialogActions from "@mui/material/DialogActions";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import FormCreateOrEditStudent from "./Components/FormCreateOrEditStudent";
import { useForm } from "react-hook-form";
import DialogSearch from "@/Components/DialogSearch";
import FormStudent from "@/Shared/FormStudent";
import { showToast } from "@/Helpers/alerts";
import { IParallel } from "../Parallels/types/parallel.types";
import { ITuition } from "../Tuitions/types/tuition";
// import dayjs from "dayjs";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import { showToast } from "@/Helpers/alerts";
const studentKeys = [
    "first_name",
    "last_name",
    // "email",
    "phone",
    "address",
    "doc_type",
    "doc_number",
    "birthday",
    "gender",
    "photo",
    "previous_institution",
    "illness_or_disability",
    // "course_id",
    "representative_id",
    // "user_id",
];
interface CreateOrEditCourseProps {
    data?: IStudent;
    genders: any[];
    courses: any[];
    docTypes: any[];
    periods: any[];
    parallels: IParallel[];
    tuition: ITuition;
}

const CreateOrEditStudent = ({
    data,
    genders,
    courses,
    docTypes,
    periods,
    parallels,
    tuition,
}: CreateOrEditCourseProps) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        control,
    } = useForm();

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpenDialog, setOpenDialog] = useState<boolean>(false);
    // const [representative, setRepresentative] = useState<any>(null);

    useEffect(() => {
        if (data) {
            setIsEdit(true);
            const student: any = data;
            console.log({ student });
            studentKeys.forEach((key) => {
                if (student.hasOwnProperty(key)) {
                    setValue(key, student[key]);
                }
            });
            console.log({ student });
            onSelectRow(student.representative);
            setValue('parallel_id', tuition.parallel_id);
            setValue('course_id', tuition.course_id);
        }
        console.log({ data });
    }, [data]);

    function onSubmit(values: any) {
        setIsLoading(true);
        console.log({ values });
        const options = {
            forceFormData: !(typeof values.photo === "string" || !values.photo),
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
        if (typeof values.photo === "string" || !values.photo) {
            delete values.photo;
        } else {
            values.photo = values.photo[0];
        }
        router.put(`/tuitions/${tuition.id}`, values, options);
    }

    function closeModalRepresentativeSelect(): void {
        setOpenDialog(false);
    }

    function onSelectRow(row: any): void {
        console.log({ row });
        setValue("representative", `${row?.first_name || ''} ${row?.last_name || ''}`);
        setValue("representative_id", row?.id);
        closeModalRepresentativeSelect();
    }

    return (
        <div className="Container">
            <DialogSearch
                close={closeModalRepresentativeSelect}
                isOpen={isOpenDialog}
                placeholder="Buscador Representante"
                path="/tuitions/representatives"
                columns={{
                    first_name: "Nombres",
                    last_name: "Apellidos",
                    doc_number: "DNI",
                }}
                onSelectRow={onSelectRow}
            />
            <div className="font-bold text-4xl mb-3">
                {!isEdit ? "Creando" : "Editando"} Estudiante
            </div>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid md:grid-cols-12 gap-4">
                            <FormStudent
                                setValue={setValue}
                                control={control}
                                _parallels={parallels}
                                courses={courses}
                                docTypes={docTypes}
                                genders={genders}
                                register={register}
                                errors={errors}
                                img={data?.photo}
                                validators={{ photo: { required: false } }}
                            ></FormStudent>
                            {/* Nombres */}
                            <div className="md:col-span-4">
                                <label htmlFor="representative">
                                    *Representante:
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        readOnly
                                        id="representative"
                                        type="text"
                                        placeholder="Busque el representante"
                                        className={`${
                                            errors.representative &&
                                            "invalid-control"
                                        } form-control w-full pl-12`}
                                        {...register("representative", {
                                            required: true,
                                        })}
                                        aria-invalid={
                                            errors.representative
                                                ? "true"
                                                : "false"
                                        }
                                    />
                                    <button
                                        onClick={() => setOpenDialog(true)}
                                        type="button"
                                        className="rounded-full absolute ml-2 bg-slate-200 w-8 h-8 "
                                    >
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </div>
                                {errors?.representative?.type ===
                                    "required" && (
                                    <small className="text-red-600">
                                        Los representante es requerido
                                    </small>
                                )}
                            </div>
                        </div>
                        <button
                            disabled={isLoading}
                            className={`rounded-md mt-3 bg-slate-800 text-white px-3 py-2 ${isLoading ? "is-loading" : ""}`}
                            type="submit"
                        >
                            Guardar{" "}
                            <i className="fa-regular fa-paper-plane ml-2"></i>
                        </button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateOrEditStudent;
