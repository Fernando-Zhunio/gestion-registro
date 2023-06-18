<?php

namespace App\Observers;

use App\Models\CurrentState;
use App\Models\Parallel;
use App\Models\Student;

class StudentObserver
{
    /**
     * Handle the Student "created" event.
     */
    public function created(Student $student): void
    {
        $currentState = CurrentState::first();
        $currentState->number_students = ($currentState?->number_students || 0) + 1 ;
    }

    /**
     * Handle the Student "updated" event.
     */
    public function updated(Student $student): void
    {
        //
    }

    /**
     * Handle the Student "deleted" event.
     */
    public function deleted(Student $student): void
    {
        $currentState = CurrentState::first();
        $currentState->number_students = ($currentState?->number_students || 0) - 1 ;
    }

    /**
     * Handle the Student "restored" event.
     */
    public function restored(Student $student): void
    {
        //
    }

    /**
     * Handle the Student "force deleted" event.
     */
    public function forceDeleted(Student $student): void
    {
        //
    }

    public function updating(Student $student): void
    {
        if ($student->parallel_id == $student->getOriginal('parallel_id')) {
            return;
        } else {
            $parallelDb = Parallel::find($student->parallel_id);
            if ($parallelDb->registered >= $parallelDb->quota) {
                // $parallel->quota++;
              throw new ValidationException::withMessages([
                    'parallel_id' => 'El paralelo no existe en el curso seleccionado',
                ]);
            } else {
                $parallelDb->registered++;
                $parallelDb->save();
                $parallelDb = Parallel::find($student->getOriginal('parallel_id'));
                $parallelDb->registered--;
                $parallelDb->save();
            }

        }
    }

    public function creating(Student $student): void
    {
        $parallelDb = Parallel::find($student->parallel_id);
        if ($parallelDb->registered >= $parallelDb->quota) {
            throw new \Exception('No se puede agregar este estudiante a este paralelo, ya que la cantidad de estudiantes registrados alcanzó el cupo máximo.');
        } else {
            $parallelDb->registered++;
            $parallelDb->save();
        }
    }
}
