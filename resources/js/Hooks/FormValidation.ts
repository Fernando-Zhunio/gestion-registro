import { Validator } from "@/Classes/Validator";
import { useCallback, useEffect, useState } from "react";

export const useFormValidation = (values: any, setValues: any) => {
    // const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    // useEffect(() => {
    //   if (isSubmitting) {
    //     const noErrors = Object.keys(errors).length === 0;
    //     if (noErrors) {
    //       callback();
    //       setIsSubmitting(false);
    //     } else {
    //       setIsSubmitting(false);
    //     }
    //   }
    // }, [errors]);

    const markAsTouched = useCallback((key: string) => {
      
    }, [errors]);
  
    const handleChange = useCallback((key: string, value: any, validators: (() => Validator) | null = null)=> {
      if (validators !== null) {
        const validatorBuilder = validators().builder();
        console.log(validatorBuilder);
          setErrors({
            ...errors,
            [key]: validatorBuilder.message
          });
      }
      setValues({
        ...values,
        [key]: value
      });
    }, [errors]
  ) 
    const handleBlur = () => {
      // const validationErrors = validate(values);
      // setErrors(validationErrors);
    };
  
    const handleSubmit = (event: any) => {
      // event.preventDefault();
      // const validationErrors = validate(values);
      // setErrors(validationErrors);
      // setIsSubmitting(true);
    };
  
    return {
      handleSubmit,
      handleChange,
      handleBlur,
      values,
      errors,
      isSubmitting
    };
};