<?php

namespace App\Observers;

use App\Models\Parallel;
use App\Models\Student;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ParallelObserver
{
    /**
     * Handle the Parallel "created" event.
     */
    // public function created(Parallel $parallel): void
    // {
    //     //
    // }

    // /**
    //  * Handle the Parallel "updated" event.
    //  */
    // public function updated(Parallel $parallel): void
    // {
    //     //
    // }

    // /**
    //  * Handle the Parallel "deleted" event.
    //  */
    // public function deleted(Parallel $parallel): void
    // {
    //     //
    // }

    // /**
    //  * Handle the Parallel "restored" event.
    //  */
    // public function restored(Parallel $parallel): void
    // {
    //     //
    // }

    // /**
    //  * Handle the Parallel "force deleted" event.
    //  */
    // public function forceDeleted(Parallel $parallel): void
    // {
    //     //
    // }


    public function updating(Parallel $parallel): void
    {
        // $parallelDb = Parallel::find($parallel->id);
        // if ($parallelDb->registered > $parallelDb->quota) {
        //     // $parallel->quota++;
        //     throw new \Exception('No se puede agregar este estudiante a este paralelo, ya que la cantidad de estudiantes registrados alcanzó el cupo máximo.');
        // }
        $currentState = currentState();
        $countStudents = Student::where('parallel_id', $parallel->id)->whereHas('tuitions', function ($query) use( $currentState) {
            $query->where('period_id', $currentState->period_id);
        })->count();
        // $parallel->registered = $countStudents;
        if ($countStudents >= $parallel->quota) {
             validationException(
                'parallel_id', 'No se puede cambiar el cupo de este paralelo, ya que la cantidad de estudiantes registrados alcanzó el cupo máximo.'
            );
        }
        
    }

}
