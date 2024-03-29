<?php

use App\Models\CurrentState;
use App\Models\InputNote;
use App\Models\ManagerNote;
use App\Models\Note;
use App\Models\Parallel;
use App\Models\Period;
use App\Models\Student;
use App\Models\Tuition;
use Illuminate\Database\Eloquent\Collection;
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

if (!function_exists('refreshCurrentState')) {
    function refreshCurrentState(): CurrentState
    {
        $currentState = CurrentState::first();
        Cache::put('current_state', $currentState);
        return $currentState;
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
        $countStudents = Tuition::where('parallel_id', $parallel->id)->where('period_id', $currentState->period_id)->count();
        // dd($countStudents, $parallel->quota);
        if ($countStudents >= $parallel->quota) {
            validationException(
                'parallel_id',
                'No se puede asignar el cupo de este paralelo, ya que la cantidad de estudiantes registrados alcanzó el cupo máximo.'
            );
        }
    }
}

if (!function_exists('getParallelsByRoleAndPeriod')) {
    /**
     * Retorna el listado de paralelos por rol y periodo
     *
     * @param Parallel $parallel
     * @param int $period_id
     */
    function getParallelsByRoleAndPeriod(int $period_id)
    {
        /**
         * @var \App\Models\User $user
         */
        $user = auth()->user();
        if ($user->hasRole('student')) {
            $student_id = $user->student->id;
            $parallel = Parallel::whereHas('tuitions', function ($query) use ($period_id, $student_id) {
                // $query->where('period_id', $period_id);
                $query->where('student_id', $student_id);
            })->get();
            return $parallel;
        } else  if ($user->hasRole('teacher')) {
            $teacher_id = $user->teacher->id;
            $parallel = Parallel::whereHas('schedules', function ($query) use ($period_id, $teacher_id) {
                // $query->where('period_id', $period_id);
                $query->where('teacher_id', $teacher_id);
            })->get();
            return $parallel;
        }

        return Parallel::all();
    }
}

if (!function_exists('getPeriodByRole')) {
    /**
     * Retorna el listado de paralelos por rol y periodo
     *
     * @param Parallel $parallel
     * @param int $period_id
     */
    function getPeriodByRole()
    {
        /**
         * @var \App\Models\User $user
         */
        $user = auth()->user();
        if ($user->hasRole('student')) {
            $student_id = $user->student->id;
            $parallel = Period::whereHas('tuitions', function ($query) use ($student_id) {
                $query->where('student_id', $student_id);
            })->where('id', '<=', currentState()->period_id)->get();
            return $parallel;
        } else  if ($user->hasRole('teacher')) {
            $teacher_id = $user->teacher->id;
            $parallel = Period::whereHas('schedules', function ($query) use ($teacher_id) {
                $query->where('teacher_id', $teacher_id);
            })->where('id', '<=', currentState()->period_id)->get();
            return $parallel;
        }

        return Period::get();
    }
}


if (!function_exists('addAverageInNotes')) {
    function addAverageInNotes(Collection $notes): Collection
    {
        /**
         * @var \App\Models\User $user
         */
        // dd($notes);
        foreach ($notes as $key => $note) {
            $note['averageFirstTrimester'] = ((($note?->partial_trimester_1 ?? 0) * 9) + (($note?->integrating_project_1 ?? 0) / 2) + (($note?->evaluation_mechanism_1 ?? 0) / 2)) / 10;
            $note['averageSecondTrimester'] = ((($note?->partial_trimester_2 ?? 0) * 9) + (($note?->integrating_project_2 ?? 0) / 2) + (($note?->evaluation_mechanism_2 ?? 0) / 2)) / 10;
            $note['averageThirdTrimester'] = ((($note?->partial_trimester_3 ?? 0) * 9) + (($note?->integrating_project_3 ?? 0) / 2) + (($note?->evaluation_mechanism_3 ?? 0) / 2)) / 10;
            $note['noteFinal'] = round((($note['averageFirstTrimester']  + $note['averageSecondTrimester'] + $note['averageThirdTrimester']) / 3.3333333333) + (($note->project_final ?? 0) / 10), 2);
            // dd($note, $note['noteFinal']);
        }
        return $notes;
    }
}

if (!function_exists('noteBySubject')) {
    function noteByStudentAndSubject($student_id, $subject_id, $period_id, $managerNotes)
    {
        $notes = Note::where('student_id', $student_id)
            ->where('period_id', $period_id)
            ->where('subject_id', $subject_id)
            ->get();
        
        $acc = 0;
        $notes = collect($notes);
        $baseNote = 12;
        // $managerNotes = ManagerNote::with('inputNotes')->where('period_id', $period_id)->get();
        foreach ($managerNotes as $key => $value) {
            foreach ($value->inputNotes as $key1 => $inputNote) {
                $value = $notes->where('input_note_id', $inputNote->id)->first()?->value ?? 0;
                $acc += (($value / $baseNote) * $inputNote->value);
                // dd($acc);
            }
        }
        $noteFinal = (round(((($acc / 100)* $baseNote)/ $managerNotes->count()), 2) );
        return  $noteFinal;
    }
}
