import { SelectHTMLAttributes } from "react";
import { Controller } from "react-hook-form";

export default function Select({
    label,
    rules,
    name,
    control,
    className = "",
    children,
    ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
    control: any;
    name: string;
    rules?: any;
    label?: string;
}) {
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
                        <select
                            {...props}
                            {...field}
                            className={
                                `${
                                    error && "invalid-control"
                                } border py-2 px-3 w-full block border-gray-300  focus:border-indigo-500  focus:ring-indigo-500 rounded-md shadow-sm ${className}` 
                            }
                        >
                        {children}
                        </select>
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
