<?php

namespace App\Observers;

use App\Models\CurrentState;
use App\Models\Parallel;
// use App\Models\Student;
use App\Models\Tuition;
use Illuminate\Validation\ValidationException;

class TuitionObserver
{
    /**
     * Handle the Student "created" event.
     */
    public function created(Tuition $Tuition): void
    {
        // $currentState = CurrentState::first();
        // $currentState->number_Tuitions = ($currentState?->number_Tuitions || 0) + 1 ;
    }

    /**
     * Handle the Tuition "updated" event.
     */
    public function updated(Tuition $Tuition): void
    {
        //
    }

    /**
     * Handle the Tuition "deleted" event.
     */
    public function deleted(Tuition $Tuition): void
    {
        // $currentState = CurrentState::first();
        // $currentState->number_Tuitions = ($currentState?->number_Tuitions || 0) - 1 ;
    }

    /**
     * Handle the Tuition "restored" event.
     */
    public function restored(Tuition $Tuition): void
    {
        //
    }

    /**
     * Handle the Tuition "force deleted" event.
     */
    public function forceDeleted(Tuition $Tuition): void
    {
        //
    }

    public function updating(Tuition $Tuition): void
    {
        $this->validateParallel($Tuition);
        if ($Tuition->parallel_id == $Tuition->getOriginal('parallel_id')) {
            return;
        } else {
            $parallelDb = Parallel::find($Tuition->parallel_id);
            if ($parallelDb->registered >= $parallelDb->quota) {
                // $parallel->quota++;
              throw new ValidationException::withMessages([
                    'parallel_id' => 'El paralelo no existe en el curso seleccionado',
                ]);
            } else {
                $parallelDb->registered++;
                $parallelDb->save();
                $parallelDb = Parallel::find($Tuition->getOriginal('parallel_id'));
                $parallelDb->registered--;
                $parallelDb->save();
            }

        }
        $currentPeriod = currentState();
        $countPeriod = Tuition::where('parallel_id', $currentPeriod->id)->count();
    }

    public function creating(Tuition $Tuition): void
    {
        $this->validateParallel($Tuition);
    }

    private function validateParallel(Tuition $Tuition)
    {
        // $currentState = currentState();
        // $countStudents = Student::where('parallel_id', $student->parallel_id)->whereHas('tuitions', function ($query) use( $currentState) {
        //     $query->where('period_id', $currentState->period_id);
        // })->count();
        // $parallel = Parallel::find($student->parallel_id);
        // if (!$parallel) {
        //      validationException(
        //         'parallel_id' , 'El paralelo no existe no se puede registrar el estudiante.'
        //     );
        // }
        // // dd($countStudents, $parallel->quota);
        // if ($countStudents >= $parallel->quota) {
        //      validationException(
        //         'parallel_id', 'No se puede asignar el cupo de este paralelo, ya que la cantidad de estudiantes registrados alcanzó el cupo máximo.'
        //     );
        // }
    }
}
