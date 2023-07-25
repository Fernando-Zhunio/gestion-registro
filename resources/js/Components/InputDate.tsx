import AirDatepicker from "air-datepicker";
import { InputHTMLAttributes, useEffect } from "react";
import { Controller, set } from "react-hook-form";
import localeEs from "air-datepicker/locale/es";

export default function InputDate({
    label,
    rules,
    name,
    control,
    setValue,
    defaultValue,
    className = "",
    children,
    ...props
}: InputHTMLAttributes<HTMLInputElement> & {
    control: any;
    name: string;
    rules?: any;
    setValue: any;
    label?: string;
}) {
    useEffect(() => {
        new AirDatepicker(`#${name}`, {
            locale: localeEs,
            dateFormat: "yyyy-MM-dd",
            classes:'z-2000',
            onSelect: function ({ date, formattedDate, datepicker }) {
                setValue(name, formattedDate);
            },
        });
    }, []);
    return (
        <div>
            {label && (
                <label htmlFor={name}>
                    {rules?.required ? "*" : ""}
                    {label}
                </label>
            )}
            <Controller
                name={name}
                rules={rules}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <input
                            id={name}
                            {...props}
                            {...field}
                            className={`${
                                error && "invalid-control"
                            } border py-2 px-3 w-full block border-gray-300  focus:border-indigo-500  focus:ring-indigo-500 rounded-md shadow-sm ${className}`}
                        />
                        {children}
                        {(error as any)?.type === "required" && (
                            <small className="text-red-600">
                                Este campo es requerido
                            </small>
                        )}
                    </>
                )}
            />
        </div>
    );
}
