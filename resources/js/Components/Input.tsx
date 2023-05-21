import { InputHTMLAttributes } from "react";

export default function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {

    return (
        <input
            {...props}
            type="text"
            className={
                'block border-gray-300  focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
                className
            }
        />
    );
}