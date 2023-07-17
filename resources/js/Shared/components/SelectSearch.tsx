import { useFetch } from "@/Hooks/UseFetch";
import { ICourse } from "@/Pages/Courses/types/course.types";
import { ResponsePaginator } from "@/types/global";
import { InputHTMLAttributes } from "react";
import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";

type SelectSearchProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    path: string;
    cbMap?: (item: any) => any;
    control: any;
    defaultValue?: any;
    moreParams?: { [key: string]: any };
    cacheOptions?: boolean;
    label?: string;
    rules?: { [key: string]: any };
    className?: string;
};
const SelectSearch = ({
    path,
    name,
    cbMap,
    control,
    defaultValue,
    moreParams = {},
    cacheOptions,
    label,
    rules,
    className,

    ...props
}: SelectSearchProps) => {
    const { fetchUrl } = useFetch(path);
    const loadOptions = async (inputValue: string) => {
        const response = await fetchUrl<ResponsePaginator<ICourse>>({
            info: {
                params: {
                    search: inputValue,
                    ...moreParams,
                },
            },
        });
        const data = response.data.data;
        const data2 = data.map(
            cbMap ||
                ((item: { id: any; name: any }) => {
                    return {
                        value: item.id,
                        label: item.name,
                        item,
                    };
                })
        );
        return data2;
    };
    return (
        <div>
            {label && (
                <label htmlFor={name}>
                    {rules?.required ? "*" : ""}
                    {label}
                </label>
            )}
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <AsyncSelect
                            cacheOptions={cacheOptions}
                            {...field}
                            className={"w-full " + (className || '')}
                            defaultValue={defaultValue || null}
                            loadOptions={loadOptions}
                            {...props}
                        />
                        {(error as any)?.type === "required" && (
                            <small className="text-red-600">
                                Este campo es requerido
                            </small>
                        )}
                    </>
                )}
            ></Controller>
        </div>
    );
};

export default SelectSearch;
