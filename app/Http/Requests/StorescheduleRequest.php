<?php

namespace App\Http\Requests;

use App\Rules\FormatTime;
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
            'observation' => 'nullable|string|max:255',
            'status' => 'boolean',
            'day' => 'required|integer|between:1,7',
            'start_time' => ['required', new FormatTime],
            'end_time' => ['required', new FormatTime, function ($attribute, $value, $fail) {
                if ($value <= $this->start_time) {
                    $fail('La hora de finalización debe ser mayor a la hora de inicio.');
                }
            }],
            'subject_id' => 'required|integer|exists:subjects,id',
            'parallel_id' => 'required|integer|exists:parallels,id',
            // 'period_id' => 'required|integer|exists:periods,id',
            'teacher_id' => 'required|integer|exists:teachers,id',
        ];
    }
}
