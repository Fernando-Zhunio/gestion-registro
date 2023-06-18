<?php

use App\Models\CurrentState;
use Illuminate\Support\Facades\Cache;


if (!function_exists('currentState')) {
    function currentState(): CurrentState
    {
        if (Cache::has('current_state')) {
            return Cache::get('current_state');
        } else {
            $currentState = CurrentState::first();
            Cache::put('current_state', $currentState);
            return $currentState;
        }
    }
}

if (!function_exists('validationException')) {
    /**
     * Lanza una exception de tipo validation
     *
     * @param string $field
     * @param string $message
     * @return void
     */
    function validationException(string $field, string $message)
    {
        throw \Illuminate\Validation\ValidationException::withMessages([
            $field => [$message],
        ]);
    }
}
