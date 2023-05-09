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
            ],
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'doc_type' => 'required|string|in:CI,PASSPORT',
            'doc_number' => 'required|string|max:20',
            'birthday' => 'required|date',
            'academic_title' => 'required|string|max:50',
            'working_day' => 'required|date',
            'period_id' => 'required|integer|exists:periods,id',

            'observation' => 'nullable|string|max:1000',
            'start_date' => 'required_if:contract_type,defined',
            'start_date' => 'nullable|before:end_date|date',
            'end_date' => 'required_if:contract_type,defined',
            'contract_file' => 'nullable|string|max:255',
            // 'contract_state' => 'required|string|in:ACTIVE,INACTIVE',
            'contract_type' => 'required|string|in:defined,undefined',
            'salary' => 'required|numeric',

        ];
    }
}
