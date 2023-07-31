<?php

namespace App\Http\Requests;

use App\Const\ConstMiscellany;
use Illuminate\Foundation\Http\FormRequest;

class UpdaterepresentativeRequest extends FormRequest
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
            'email' => 'required|email|unique:representatives,email,'.$this->id,
            'phone' => 'required|string|max:255',
            'address' => 'required|string|max:1000',
            'doc_type' => 'required|string|max:255|in:' . ConstMiscellany::CI . ',' . ConstMiscellany::PASSPORT . ',' . ConstMiscellany::FOREIGNER_ID,
            'doc_number' => 'required|string',
            'gender' => 'required|string|max:255|in:' . ConstMiscellany::MALE . ',' . ConstMiscellany::FEMALE,
            'occupation' => 'required|string|max:255',
        ];
    }
}
