<?php

use App\Models\CurrentState;
use App\Models\Parallel;
use App\Models\Student;
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
        $validator = \Illuminate\Validation\ValidationException::withMessages([
            $field => [$message],
        ]);

        // dd($validator);
        throw $validator;
    }
}

if (!function_exists('validateParallel')) {
    /**
     * Valida que el paralelo tenga cupos disponibles
     *
     * @param Student $student
     * @return void
     */
    function validateParallel(int $parallel_id, int $course_id = null)
    {
        $parallel = null;
        if ($course_id) {
            $parallel = Parallel::where('course_id', $course_id)->where('id', $parallel_id)->first();
            if (!$parallel) {
                validationException(
                    'parallel_id',
                    'El paralelo no existe en el curso seleccionado',
                );
            }
        } else {
            $parallel = Parallel::find($parallel_id);
            if (!$parallel) {
                validationException(
                    'parallel_id',
                    'El paralelo no existe no se puede registrar el estudiante.'
                );
            }
        }
        $currentState = currentState();
        $countStudents = Student::where('parallel_id', $parallel->id)->whereHas('tuitions', function ($query) use ($currentState) {
            $query->where('period_id', $currentState->period_id);
        })->count();
        // dd($countStudents, $parallel->quota);
        if ($countStudents >= $parallel->quota) {
            validationException(
                'parallel_id',
                'No se puede asignar el cupo de este paralelo, ya que la cantidad de estudiantes registrados alcanzó el cupo máximo.'
            );
        }
    }
}
