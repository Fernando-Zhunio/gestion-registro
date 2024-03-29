import AirDatepicker from "air-datepicker";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import localeEs from "air-datepicker/locale/es";
// import { IRepresentative } from "@/Pages/Representatives/types/representatives";
import { IStudent } from "@/Pages/Students/types/student.types";
import { IParallel } from "@/Pages/Parallels/types/parallel.types";
import { useFetch } from "@/Hooks/UseFetch";
import Input from "@/Components/Input";
import Select from "@/Components/Select";
import InputDate from "@/Components/InputDate";

interface FormRepresentativeProps {
    // handlerSetForm: (key: any, value: any) => void;
    onSubmit?: (data: any) => void;
    // form: IStudent;
    _parallels: IParallel[];
    errors: any;
    genders: { label: string; value: string }[];
    courses: { id: number; name: string; nivel: string }[];
    docTypes: { label: string; value: string }[];
    register: any;
    img?: string;
    validators?: { [key: string]: any };
    control: any;
    setValue: any;
}

export default function FormStudent({
    // handlerSetForm,
    // onSubmit,
    // form,
    setValue,
    errors,
    genders,
    courses,
    docTypes,
    register,
    control,
    _parallels,
    img = "/img/avatar.png",
    validators,
}: FormRepresentativeProps) {
    // const {
    //     register,
    //     formState: { errors },
    //     handleSubmit,
    // } = useForm();
    const [preview, setPreview] = useState<any>(null);
    const [_validators, setValidator] = useState<any>({
        photo: { required: true },
    });
    const { fetchUrl } = useFetch(
        "/tuitions/parallels",
        "GET" as any,
        {},
        false
    );

    const [parallels, setParallels] = useState<IParallel[]>([]);

    async function getParallelsByCourse(courseId: number) {
        console.log({ courseId });
        const parallels = await fetchUrl({
            info: { params: { course_id: courseId } },
        });
        console.log({ data: parallels.data });
        setParallels(parallels.data);
    }

    useEffect(() => {
        new AirDatepicker("#birthday", {
            locale: localeEs,
            dateFormat: "yyyy-MM-dd",
        });

        setParallels(_parallels);

        if (validators) {
            setValidator((prevState: any) => {
                return {
                    ...prevState,
                    ...validators,
                };
            });
        }
    }, []);

    function handleFileChange(key: string, e: any) {
        const selectedFile = e.target.files[0];
        // console.log({ selectedFile });

        if (selectedFile) {
            // handlerSetForm(key, selectedFile);

            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    }

    return (
        <>
            {/* Nombres */}
            <div className="md:col-span-6">
                {/* <label htmlFor="first_name">*Nombres:</label>
                <input
                    id="first_name"
                    type="text"
                    placeholder="Ingrese el nombre"
                    className={`${
                        errors.first_name && "invalid-control"
                    } form-control w-full `}
                    {...register("first_name", { required: true })}
                    aria-invalid={errors.first_name ? "true" : "false"}
                />
                {errors?.first_name?.type === "required" && (
                    <small className="text-red-600">
                        Los nombres es requerido
                    </small>
                )} */}
                <Input
                    label="Nombres"
                    type="text"
                    name="first_name"
                    control={control}
                    rules={{ required: true }}
                />
            </div>
            {/* Apellidos */}
            <div className="md:col-span-6">
                {/* <label htmlFor="last_name">*Apellidos:</label>
                <input
                    type="text"
                    className={`${
                        errors.last_name && "invalid-control"
                    } form-control w-full `}
                    {...register("last_name", { required: true })}
                />
                {errors?.last_name?.type === "required" && (
                    <small className="text-red-600">
                        Los apellidos es requerido
                    </small>
                )} */}
                <Input
                    label="Apellidos"
                    type="text"
                    name="last_name"
                    control={control}
                    rules={{ required: true }}
                />
            </div>

            {/* Foto - photo */}
            <div className="md:col-span-4">
                <div className="flex items-center space-x-6">
                    <div className="shrink-0">
                        <img
                            className="h-16 w-16 object-cover rounded-full"
                            src={preview || img}
                            alt="Current profile photo"
                        />
                    </div>
                    <label className="block">
                        <span className="sr-only">Seleccione una imagen</span>
                        <input
                            type="file"
                            {...register("photo", {
                                required: _validators?.photo?.required,
                                onChange: (e: any) =>
                                    handleFileChange("photo", e),
                            })}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        />
                        {errors?.photo && (
                            <small className="text-red-600">
                                La imagen del estudiante es requerida
                            </small>
                        )}
                    </label>
                </div>
            </div>
            <div className="md:col-span-4">
                {/* <label htmlFor="phone">Teléfono</label>
                <input
                    type="number"
                    className={`form-control w-full `}
                    {...register("phone")}
                /> */}
                <Input
                    label="Teléfono"
                    type="number"
                    name="phone"
                    control={control}
                />
            </div>
            {/* genero - gender */}
            <div className="md:col-span-4">
                {/* <label htmlFor="gender">*Genero</label> */}
                <Select
                    label="Genero"
                    name="gender"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={""}
                >
                    <option value="">Seleccione una opción</option>
                    {genders?.map((item: any, index: number) => {
                        return (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        );
                    })}
                </Select>
                {/* {errors?.gender?.type === "required" && (
                    <small className="text-red-600">
                        El Genero es requerido
                    </small>
                )} */}
            </div>
            {/* direccion - address */}
            <div className="md:col-span-8">
                {/* <label htmlFor="address">*Dirección:</label>
                <input
                    id="address"
                    type="text"
                    placeholder="Ingrese la dirección"
                    className={`${
                        errors.address && "invalid-control"
                    } form-control w-full `}
                    {...register("address", { required: true })}
                    aria-invalid={errors.address ? "true" : "false"}
                />
                {errors?.address?.type === "required" && (
                    <small className="text-red-600">
                        La dirección es requerida
                    </small>
                )} */}
                <Input
                    label="Dirección"
                    type="text"
                    name="address"
                    control={control}
                    rules={{ required: true }}
                />
            </div>

            {/* fecha de nacimiento - birthday */}
            <div className="md:col-span-3">
                {/* <label htmlFor="birthday">*Fecha de nacimiento:</label>
                <input
                    id="birthday"
                    type="text"
                    readOnly={true}
                    placeholder="Ingrese la fecha de nacimiento"
                    className={`${
                        errors.birthday && "invalid-control"
                    } form-control w-full `}
                    {...register("birthday", { required: true })}
                    aria-invalid={errors.birthday ? "true" : "false"}
                />
                {errors?.birthday?.type === "required" && (
                    <small className="text-red-600">
                        La fecha de nacimiento es requerida
                    </small>
                )} */}
                <InputDate
                    label="Fecha de nacimiento"
                    name="birthday"
                    control={control}
                    readOnly={true}
                    rules={{ required: true }}
                    setValue={setValue}
                />
            </div>

            {/* curso - course_id */}
            <div className="md:col-span-3">
                {/* <label htmlFor="course_id">Curso</label>
                <select
                    className={`${
                        errors.course_id && "invalid-control"
                    } form-control w-full `}
                    {...register("course_id", { required: true })}
                    onChange={($event: any) =>
                        getParallelsByCourse($event.target.value)
                    }
                >
                    <option value="">Seleccione una opción</option>
                    {courses?.map((item: any) => {
                        return (
                            <option key={item.id} value={item.id}>
                                {item.name} - {item.nivel}
                            </option>
                        );
                    })}
                </select>
                {errors?.course_id?.type === "required" && (
                    <small className="text-red-600">
                        El curso es requerido
                    </small>
                )} */}
                <Select
                    label="Curso"
                    name="course_id"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={""}
                    onChange={($event: any) => {
                        setValue("course_id", $event.target.value);
                        getParallelsByCourse($event.target.value);
                    }}
                >
                    <option value="">Seleccione una opción</option>
                    {courses?.map((item: any) => {
                        return (
                            <option key={item.id} value={item.id}>
                                {item.name} - {item.nivel}
                            </option>
                        );
                    })}
                </Select>
            </div>

            {/* tipo de documento - doc_type */}
            <div className="md:col-span-3">
                {/* <label htmlFor="course_id">*Tipo de documento</label> */}
                <Select
                    // className={`${
                    //     errors.doc_type && "invalid-control"
                    // } form-control w-full `}
                    // {...register("doc_type", { required: true })}
                    label="Tipo de documento"
                    name="doc_type"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={""}
                >
                    <option value="">Seleccione una opción</option>
                    {docTypes?.map((item: any) => {
                        return (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        );
                    })}
                </Select>
                {/* {errors?.course_id?.type === "required" && (
                    <small className="text-red-600">
                        El curso es requerido
                    </small>
                )} */}
            </div>

            {/* numero de identificacion - doc_number */}
            <div className="md:col-span-3">
                {/* <label htmlFor="doc_number">*Numero de identificacion:</label>
                <input
                    id="doc_number"
                    type="text"
                    placeholder="Ingrese la fecha de nacimiento"
                    className={`${
                        errors.doc_number && "invalid-control"
                    } form-control w-full `}
                    {...register("doc_number", { required: true })}
                    aria-invalid={errors.doc_number ? "true" : "false"}
                />
                {errors?.doc_number?.type === "required" && (
                    <small className="text-red-600">
                        El numero de identificacion es requerido
                    </small>
                )} */}
                <Input
                    label="Numero de identificacion"
                    type="text"
                    name="doc_number"
                    control={control}
                    rules={{ required: true }}
                />
            </div>

            {/* anterior institucion - previous_institution */}
            <div className="md:col-span-4">
                {/* <label htmlFor="previous_institution">
                    Anterior institución:
                </label>
                <input
                    id="previous_institution"
                    type="text"
                    placeholder="Ingrese la institución anterior"
                    className={`${
                        errors.previous_institution && "invalid-control"
                    } form-control w-full `}
                    {...register("previous_institution", { required: true })}
                    aria-invalid={
                        errors.previous_institution ? "true" : "false"
                    }
                />
                {errors?.previous_institution?.type === "required" && (
                    <small className="text-red-600">
                        La anterior institución es requerido
                    </small>
                )} */}
                <Input
                    label="Anterior institución"
                    type="text"
                    name="previous_institution"
                    control={control}
                    rules={{ required: true }}
                />
            </div>

            <div className="md:col-span-4">
                {/* <label htmlFor="illness_or_disability">Discapacidad:</label>
                <input
                    id="illness_or_disability"
                    type="text"
                    placeholder="Ingrese la discapacidad"
                    className={`form-control w-full`}
                    {...register("illness_or_disability")}
                /> */}
                <Input
                    label="Discapacidad"
                    type="text"
                    name="illness_or_disability"
                    control={control}
                />
            </div>

            {/* paralelo - parallel_id */}
            <div className="md:col-span-3">
                <label htmlFor="parallel_id">*Paralelo</label>
                <select
                    className={`${
                        errors.parallel_id && "invalid-control"
                    } form-control w-full `}
                    {...register("parallel_id", { required: true })}
                    defaultValue={""}
                >
                    <option value="">Seleccione una opción</option>
                    {parallels?.map((item) => {
                        return (
                            <option key={item.id} value={item.id}>
                                {item.name} - {item.observation}
                            </option>
                        );
                    })}
                </select>
                {errors?.parallel_id?.type === "required" && (
                    <small className="text-red-600">
                        El paralelo es requerido
                    </small>
                )}
            </div>
        </>
    );
}
