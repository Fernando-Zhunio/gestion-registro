<?php

namespace App\Http\Controllers;

use App\Models\Period;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcademicController extends Controller
{
    public function index()
    {
        
        return Inertia::render('Academic/Index', [
            'success' => true,
            'data' => [
                // 'schedules' => Schedule::all(),
            ],
        ]);
    }

    public function getPeriods(Request $request) {
        $pageSize = $request->get('pageSize', null);
        $periods = Period::paginate($pageSize);
        return response()->json(['success' => true,'data' => $periods]);
    }

}
