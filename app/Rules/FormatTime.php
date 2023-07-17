<?php

namespace App\Rules;

use Closure;
use DateTime;
use Illuminate\Contracts\Validation\ValidationRule;

class FormatTime implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $dateObj = DateTime::createFromFormat('H:i', $value);
        $result = $dateObj && $dateObj->format('H:i') == $value;
        if (!$result) {
            $fail('El ' . $attribute . ' no tiene el formato correcto.');
        }
    }
}
