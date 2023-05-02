<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreteacherRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'email' => [
                'required',
                'string',
                'email:rfc,dns',
                'max:255',
                'unique:teachers,email',
            ],
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'doc_type' => 'required|string|max:20',
            'doc_number' => 'required|string|max:20',
            'birthday' => 'required|date',
            'academic_title' => 'required|string|max:50',
            'working_day' => 'required|string|max:50',
            
        ];
    }
}
