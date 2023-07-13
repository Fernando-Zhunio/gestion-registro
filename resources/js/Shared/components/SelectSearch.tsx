import { useFetch } from "@/Hooks/UseFetch";
import { ICourse } from "@/Pages/Courses/types/course.types";
import { ResponsePaginator } from "@/types/global";
import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";

const SelectSearch = ({ path, cbMap, control, defaultValue }: { path: string, cbMap: (item: any) => any, control: any, defaultValue?: any }) => {
    const { fetchUrl } = useFetch(path);
    const loadOptions = async (inputValue: string) => {
        const response = await fetchUrl<ResponsePaginator<ICourse>>({
            info: {
                params: {
                    search: inputValue,
                },
            },
        });
        const data = response.data.data;
        const data2 = data.map((course: { id: any; name: any }) => {
            return {
                value: course.id,
                label: course.name,
            };
        });
        return data2;
    };
    return (
        <Controller
            control={control}
            name="course_id"
            defaultValue={defaultValue}
            render={({ field, fieldState: { error } }) => (
                <>
                    <AsyncSelect
                        {...field}
                        // onChange={(e: any) => {
                        //     console.log({ e });
                        //     // setValue("course_id", e?.value);
                        // }}
                        // value='data?.course_id'

                        className="w-full"
                        defaultValue={defaultValue || null}

                        loadOptions={loadOptions}
                    />
                    {(error as any)?.type === "required" && (
                        <small className="text-red-600">
                            Este campo es requerido
                        </small>
                    )}
                </>

            )}
        ></Controller>
    )

};

export default SelectSearch;