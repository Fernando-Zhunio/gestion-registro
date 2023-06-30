import { useFetch } from "@/Hooks/UseFetch";
import { ICourse } from "@/Pages/Courses/types/course.types";
import { ResponsePaginator } from "@/types/global";
import AsyncSelect from "react-select/async";
// import { components, InputProps } from "react-select";
import { useForm, Controller } from "react-hook-form";

interface FormCourseProps {
    // handlerSetForm: (key: any, value: any) => void;
    onSubmit?: (data: any) => void;
    // form: IStudent;
    errors: any;
    // genders: { label: string; value: string }[];
    // courses: { id: number; name: string; nivel: string }[];
    // docTypes: { label: string; value: string }[];
    register: any;
    setValue: any;
    isEdit: boolean
    control: any
    data: any
    // img?: string;
    // validators?: { [key: string]: any };
}
export default function FormSubject({
    errors,
    // genders,
    // courses,
    // docTypes,
    setValue,
    register,
    isEdit,
    control,
    data
}: // img = "/img/avatar.png",
// validators
FormCourseProps) {
    // const loadOptionsCourse = async (inputValue: string) => {
    //     const response = await axios.get(`/api/courses/search/${inputValue}`);
    //     const data = await response.data;
    //     return data;
    // }
    const { fetchUrl } = useFetch("/subjects/courses/search");
    const loadOptionsCourse = async (inputValue: string) => {
        const response = await fetchUrl<ResponsePaginator<ICourse>>({
            info: {
                params: {
                    search: inputValue,
                },
            },
        });
        const data = response.data.data;
        console.log({ response, data });
        const data2 = data.map((course: { id: any; name: any }) => {
            return {
                value: course.id,
                label: course.name,
            };
        });
        return data2;
    };
    return (
        <>
            {/* Nombres */}
            <div className="md:col-span-6">
                <div className="md:col-span-12">
                    <label htmlFor="name">*Nombres:</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Ingrese el nombre"
                        className={`${
                            errors.name && "invalid-control"
                        } form-control w-full `}
                        {...register("name", { required: true })}
                        aria-invalid={errors.name ? "true" : "false"}
                    />
                    {errors?.name?.type === "required" && (
                        <small className="text-red-600">
                            El nombre es requerido
                        </small>
                    )}
                </div>
                <div className="md:col-span-12 mt-3">
                    <label htmlFor="course_id">*Curso:</label>
                    <Controller
                        control={control}
                        name="course_id"
                        defaultValue={data?.course_id}
                        render={({  }) => (
                            <AsyncSelect
                                onChange={(e: any) => {
                                    console.log({ e });
                                    setValue("course_id", e?.value);
                                }}
                                // value='data?.course_id'
                                
                                className="w-full"
                                defaultValue={data ? {
                                    value: data.course.id,
                                    label: data.course.name,
                                }: null}
                                
                                loadOptions={loadOptionsCourse}
                            />

                        )}
                    ></Controller>
                    {errors?.course_id?.type === "required" && (
                        <small className="text-red-600">
                            El curso es requerido
                        </small>
                    )}
                </div>
                {/* <select hidden {...register("course_id", { required: true })}></select> */}
            </div>

            {/* Descripción */}
            <div className="md:col-span-6">
                <div>
                    <label htmlFor="description">*Descripción:</label>
                    <textarea
                        id="description"
                        type="text"
                        placeholder="Ingrese la descripción"
                        className={`
                         form-control w-full `}
                        {...register("description")}
                    ></textarea>
                    {/* {errors?.description?.type === "required" && (
                        <small description="text-red-600">
                            El nombre es requerido
                        </small>
                    )} */}
                </div>
                {isEdit &&  <div className="center mt-3">
                    <label htmlFor="name">Estado:</label>
                    <input
                        id="name"
                        type="checkbox"
                        placeholder="Ingrese el nombre"
                        className={`${
                            errors.name && "invalid-control"
                        } form-control  `}
                        {...register("status")}
                    />
                   
                </div>}
            </div>
            {/* Curso */}
            {/* <div className="md:col-span-6">
                <label htmlFor="name">*Curso:</label>
                <input
                    id="course_id"
                    type="text"
                    placeholder="Ingrese el curso"
                    className={`${
                        errors.course_id && "invalid-control"
                    } form-control w-full `}
                    {...register("name", { required: true })}
                    aria-invalid={errors.course_id ? "true" : "false"}
                />
                {errors?.course_id?.type === "required" && (
                    <small className="text-red-600">
                        El curso es requerido
                    </small>
                )}
            </div> */}
            {/* <div className="md:col-span-6">
                <label htmlFor="course_id">*Curso:</label>
                <AsyncSelect
                    onChange={(e) => {
                        console.log({ e });
                        setValue("course_id", e?.value);
                    }}
                    // {...register("course_id", { required: true })}
                    className="w-full"
                    cacheOptions
                    defaultOptions
                    loadOptions={loadOptionsCourse}
                />
                {errors?.course_id?.type === "required" && (
                    <small className="text-red-600">
                        El curso es requerido
                    </small>
                )}
            </div> */}
        </>
    );
}
