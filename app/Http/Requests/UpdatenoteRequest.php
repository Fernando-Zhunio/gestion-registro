<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatenoteRequest extends FormRequest
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
            'partial_trimester_1' => 'numeric|max:90|min:0',
            'partial_trimester_2' => 'numeric|max:90|min:0',
            'partial_trimester_3' => 'numeric|max:90|min:0',
            'integrating_project_1' => 'numeric|max:5|min:0',
            'integrating_project_2' => 'numeric|max:5|min:0',
            'integrating_project_3' => 'numeric|max:5|min:0',
            'evaluation_mechanism_1' => 'numeric|max:5|min:0',
            'evaluation_mechanism_2' => 'numeric|max:5|min:0',
            'evaluation_mechanism_3' => 'numeric|max:5|min:0',
            'project_final' => 'numeric|max:10|min:0',
            'observation' => 'max:1000',
            'subject_id' => 'exists:subjects,id',
            'teacher_id' => 'exists:teachers,id',
            'student_id' => 'exists:students,id',
            'period_id' => 'exists:periods,id',
        ];
    }
}
