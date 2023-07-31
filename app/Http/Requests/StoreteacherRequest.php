<?php

namespace App\Http\Requests;

use App\Const\ConstMiscellany;
use Illuminate\Foundation\Http\FormRequest;

class StoreteacherRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
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
                'email',
                'max:255',
                'unique:teachers,email',
                'unique:users,email',
            ],
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'doc_type' => 'required|string|max:255|in:' . ConstMiscellany::CI . ',' . ConstMiscellany::PASSPORT . ',' . ConstMiscellany::FOREIGNER_ID,
            'doc_number' => 'required|string|max:20',
            'birthday' => 'required|date',
            'academic_title' => 'required|string|max:50',
            'working_day' => 'required|date',
            'observation' => 'nullable|string|max:1000',
            'start_date' => 'required|date|date_format:Y-m-d',
            'end_date' => 'nullable|date|date_format:Y-m-d|after:start_date',
            'contract_file' => 'nullable|string|max:255',
            // 'contract_state' => 'boolean',
            'salary' => 'required|numeric',

        ];
    }
}
