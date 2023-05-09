const ConvertValidationError = (error: any) => {
    let errors = [];
    for (let key in error) {
        errors.push(error[key]);
    }
    return errors.join('\n');
}

export default ConvertValidationError;