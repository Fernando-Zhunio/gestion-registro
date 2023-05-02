<?php

use App\Models\CurrentState;
use Illuminate\Support\Facades\Cache;

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