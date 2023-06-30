<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoresubjectRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            // 'nivel' => 'required|string|max:255',
            // 'hours' => 'required|time|max:255',
            // 'status' => 'required|string|max:1',
            'course_id' => 'required|integer',
        ];
    }
}
