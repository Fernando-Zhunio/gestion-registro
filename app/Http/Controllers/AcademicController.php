<?php

namespace App\Http\Controllers;

use App\Models\Period;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class AcademicController extends Controller
{
    public function index()
    {
        $period_id = currentState()->period_id;
        $periods = Period::where('id', '>', $period_id)->get();
        return Inertia::render('Academic/Index', [
            'success' => true,
            'data' => [
                'periods' => $periods,
            ],
        ]);
    }

    public function getPeriods(Request $request) {
        /**
         * @var User $user
         */
        $user = auth()->user();

        if ($user->hasRole('student')) {
            $student = $user->student();
            $periods = Period::whereHas('tuitions', function ($query) use($student) {
                $query->where('student_id', $student->id);
            })->get();
        }
        $periods = Period::all();
        return response()->json(['success' => true,'data' => $periods]);
    }

    public function getPeriodsNext(Request $request) {
        // $pageSize = $request->get('pageSize', null);

        $period_id = currentState()->period_id;
        $periods = Period::where('id', '>', $period_id)->get();
        return response()->json(['success' => true,'data' => $periods]);
    }

    public function changePeriod(Request $request, Period $period){
        $period_current_id = currentState()->period_id;
        if ($period_current_id >= $period->id) {
            validationException('period_id', 'El periodo que se va a cambiar debe ser mayor que el actual.');
        }

        $currentState = currentState();
        $currentState->period_id = $period->id;
        $currentState->save();
        Cache::put('current_state', $currentState);
        // $periods = Period::where('id', '>', $period_id)->get();
    }

}
