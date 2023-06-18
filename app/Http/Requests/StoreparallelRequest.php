<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreparallelRequest extends FormRequest
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
            'name' => 'required|string|max:255|unique:parallels,name',
            'description' => 'required|string|max:1000',
            'quota' => 'required|integer',
            // 'registered' => 'nullable|integer',
            'course_id' => 'required|integer|exists:courses,id',
        ];
    }
}
