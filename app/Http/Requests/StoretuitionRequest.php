<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Const\ConstMiscellany;

class StoretuitionRequest extends FormRequest
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
            'student.first_name' => 'required|string|max:255',
            'student.last_name' => 'required|string|max:255',
            'student.email' => 'required|email|unique:students,email',
            'student.phone' => 'nullable|digits:10|max:255',
            'student.address' => 'required|string|max:1000',
            'student.doc_type' => 'required|string|max:255|in:' . ConstMiscellany::CI . ',' . ConstMiscellany::PASSPORT . ',' . ConstMiscellany::FOREIGNER_ID,
            'student.doc_number' => 'required|string|unique:students,doc_number|max:255',
            'student.birthday' => 'required|date', 
            'student.gender' => 'required|string|max:255|in:' . ConstMiscellany::MALE . ',' . ConstMiscellany::FEMALE,
            'student.photo' => 'required|file|max:1024|mimes:jpeg,jpg,png',
            'student.previous_institution' => 'required|string|max:255',
            'student.illness_or_disability' => 'nullable|string|max:255',
            'student.course_id' => 'required|integer|exists:courses,id',
            'representative_id' => 'nullable|integer|exists:representatives,id',
            // 'student.representative_id' => 'required|integer|exists:representatives,id',

            
            
        ];
    }
}
