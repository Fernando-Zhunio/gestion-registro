<?php

namespace App\Observers;

use App\Models\CurrentState;
use App\Models\Parallel;
use App\Models\Student;
use Illuminate\Validation\ValidationException;

class StudentObserver
{
    /**
     * Handle the Student "created" event.
     */
    public function created(Student $student): void
    {
        // $currentState = CurrentState::first();
        // $currentState->number_students = ($currentState?->number_students || 0) + 1 ;
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
        // $currentState = CurrentState::first();
        // $currentState->number_students = ($currentState?->number_students || 0) - 1 ;
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
        $this->validateParallel($student);
        // if ($student->parallel_id == $student->getOriginal('parallel_id')) {
        //     return;
        // } else {
        //     $parallelDb = Parallel::find($student->parallel_id);
        //     if ($parallelDb->registered >= $parallelDb->quota) {
        //         // $parallel->quota++;
        //       throw new ValidationException::withMessages([
        //             'parallel_id' => 'El paralelo no existe en el curso seleccionado',
        //         ]);
        //     } else {
        //         $parallelDb->registered++;
        //         $parallelDb->save();
        //         $parallelDb = Parallel::find($student->getOriginal('parallel_id'));
        //         $parallelDb->registered--;
        //         $parallelDb->save();
        //     }

        // }
        // $currentPeriod = currentState();
        // $countPeriod = Student::where('parallel_id', $currentPeriod->id)->count();
    }

    public function creating(Student $student): void
    {
        $this->validateParallel($student);
    }

    private function validateParallel(Student $student)
    {
        $currentState = currentState();
        $countStudents = Student::where('parallel_id', $student->parallel_id)->whereHas('tuitions', function ($query) use( $currentState) {
            $query->where('period_id', $currentState->period_id);
        })->count();
        $parallel = Parallel::find($student->parallel_id);
        if (!$parallel) {
             validationException(
                'parallel_id' , 'El paralelo no existe no se puede registrar el estudiante.'
            );
        }
        // dd($countStudents, $parallel->quota);
        if ($countStudents >= $parallel->quota) {
             validationException(
                'parallel_id', 'No se puede asignar el cupo de este paralelo, ya que la cantidad de estudiantes registrados alcanzó el cupo máximo.'
            );
        }
    }
}
