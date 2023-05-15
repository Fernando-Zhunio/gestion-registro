<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatecourseRequest extends FormRequest
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
            'name' => 'required|string|max:255|unique:courses,name',
            'description' => 'nullable|string|max:255',
            'nivel' => 'required|string|max:255|unique:courses,name',
            // 'journey' => 'required|string|max:255|in:Diurno,Nocturno',
            // 'specialty_id' => 'required|integer|exists:specialties,id|unique:course,name'
        ];
    }
}
