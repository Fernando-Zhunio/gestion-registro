<?php

namespace App\Http\Requests;

use App\Const\ConstMiscellany;
use Illuminate\Foundation\Http\FormRequest;

class UpdatetuitionRequest extends FormRequest
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
                'student.first_name' => 'required|string|max:255',
                'student.last_name' => 'required|string|max:255',
                'student.email' => 'required|email|unique:students,email',
                'student.phone' => 'nullable|digits:10|max:255',
                'student.address' => 'required|string|max:1000',
                'student.doc_type' => 'required|string|max:255|in:' . ConstMiscellany::CI . ',' . ConstMiscellany::PASSPORT . ',' . ConstMiscellany::FOREIGNER_ID,
                'student.doc_number' => 'required|string|unique:students,doc_number|max:255',
                'student.birthday' => 'required|date', 
                'student.gender' => 'required|string|max:255|in:' . ConstMiscellany::MALE . ',' . ConstMiscellany::FEMALE,
                'student.photo' => 'nullable|file|max:1024|mimes:jpeg,jpg,png',
                'student.previous_institution' => 'required|string|max:255',
                'student.illness_or_disability' => 'nullable|string|max:255',
                'student.course_id' => 'required|integer|exists:courses,id',
                // 'student.representative_id' => 'required|integer|exists:representatives,id',
    
                'representative.first_name' => 'required|string|max:255',
                'representative.last_name' => 'required|string|max:255',
                'representative.email' => 'required|email|unique:students,email',
                'representative.phone' => 'required|string|max:255',
                'representative.address' => 'required|string|max:1000',
                'representative.doc_type' => 'required|string|max:255|in:' . ConstMiscellany::CI . ',' . ConstMiscellany::PASSPORT . ',' . ConstMiscellany::FOREIGNER_ID,
                'representative.doc_number' => 'required|string|unique:representatives,doc_number|max:255',
                'representative.gender' => 'required|string|max:255|in:' . ConstMiscellany::MALE . ',' . ConstMiscellany::FEMALE,
                'representative.occupation' => 'required|string|max:255',
                
            ];
    }
}
