<?php

namespace App\Http\Requests;

use App\Const\ConstMiscellany;
use Illuminate\Foundation\Http\FormRequest;

class UpdatestudentRequest extends FormRequest
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
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            // 'email' => 'required|email|unique:students,email',
            'phone' => 'nullable|digits:10|max:255',
            'address' => 'required|string|max:1000',
            'doc_type' => 'required|string|max:255|in:' . ConstMiscellany::CI . ',' . ConstMiscellany::PASSPORT . ',' . ConstMiscellany::FOREIGNER_ID,
            'doc_number' => 'required|string|unique:students,doc_number,' . $this->route('student')->id.'|max:255',
            'birthday' => 'required|date', 
            'gender' => 'required|string|max:255|in:' . ConstMiscellany::MALE . ',' . ConstMiscellany::FEMALE,
            'photo' => 'nullable|file|max:1024|mimes:jpeg,jpg,png',
            'previous_institution' => 'required|string|max:255',
            'illness_or_disability' => 'nullable|string|max:255',
            'course_id' => 'required|integer|exists:courses,id',
        ];
    }
}
