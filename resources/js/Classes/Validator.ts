export class Validator {
    value: any;
    key:string | undefined;
    constructor(value: any, key?: string) {
        this.value = value;
        this.key = key;
    }
    private _validations: {isValid: boolean, message: string}[] = [];
    required(message: string = 'Este campo es requerido'): Validator {
        const valid = this.value?.trim() !== '';
        console.log(this.value, valid);
        this._validations.push({isValid: valid, message});
        return this;
    }

    minLength(minLength: number, message = 'Mínimo de longitud es '+ minLength): Validator {
        const valid = this.value.trim().length >= minLength;
        this._validations.push({isValid: valid, message});
        return this;
    }

    static maxLength(value: string, maxLength: number): boolean {
        return value.trim().length <= maxLength;
    }

    email(message: string = 'El campo debe ser un email valido'): Validator {
        const valid = this.value.trim().match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) !== null;
        this._validations.push({isValid: valid, message});
        return this;
    }

    static phone(value: string): boolean {
        return value.trim().match(/^[0-9]{10,10}$/) !== null;
    }

    static min(value: number, min: number): boolean {
        return value >= min;
    }

    static max(value: number, max: number): boolean {
        return value <= max;
    }

    builder() {
        return {
            isValid: this._validations.every((validation) => validation.isValid),
            message: this._validations.filter(validation => !validation.isValid).map((validation) => validation.message).join(', '),
        };
    }

}

// export class FormControl {
//     private _value: string;
//     private _validations: string[];
//     private _valid: boolean;
//     private _errors: string[];

//     constructor(value: string, validations: string[]) {
//         this._value = value;
//         this._validations = validations;
//         this._valid = false;
//         this._errors = [];
//     }

//     get value(): string {
//         return this._value;
//     }

//     get valid(): boolean {
//         return this._valid;
//     }

//     get errors(): string[] {
//         return this._errors;
//     }

//     validate(): void {
//         this._errors = [];
//         this._valid = true;
//         this._validations.forEach((validation) => {
//             const [rule, params] = validation.split(':');
//             const isValid = Validator[rule](this._value, params);
//             if (!isValid) {
//                 this._valid = false;
//                 this._errors.push(`Invalid value for ${rule}`);
//             }
//         });
//     }
// }