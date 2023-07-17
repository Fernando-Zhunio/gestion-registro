<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorescheduleRequest extends FormRequest
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
            'description' => 'required|string|max:255',
            'status' => 'boolean',
            'day' => 'required|integer|between:1,7',
            'start_time' => 'required|date|date_format:H:i',
            'end_time' => 'nullable|date|date_format:H:i|after:start_date',
            'subject_id' => 'required|integer|exists:subjects,id',
            'parallel_id' => 'required|integer|exists:paralelos,id',
            'period_id' => 'required|integer|exists:periods,id',
            'teacher_id' => 'required|integer|exists:teachers,id',
        ];
    }
}
