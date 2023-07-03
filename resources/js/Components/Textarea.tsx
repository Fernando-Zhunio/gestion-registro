import { TextareaHTMLAttributes } from "react";
import { Controller } from "react-hook-form";

export default function Textarea({
    label,
    rules,
    name,
    control,
    className = "",
    ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
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
                        <textarea
                            {...props}
                            {...field}
                            className={
                                `${
                                    error && "invalid-control"
                                } w-full block border-gray-300  focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ${className}` 
                            }
                        ></textarea>
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
