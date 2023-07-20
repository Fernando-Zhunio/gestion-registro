<?php

namespace App\Http\Controllers;

use App\Models\Parallel;
use App\Http\Requests\StoreparallelRequest;
use App\Http\Requests\UpdateparallelRequest;
use App\Models\Course;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ParallelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $pageSize = $request->get('pageSize', 10);
        $currentState = currentState();
        $parallels = Parallel::search($search)
        ->paginate($pageSize);
        $parallels->getCollection()->map(function ($parallel) use($currentState) {
            $countStudents = Student::where('parallel_id', $parallel->id)->whereHas('tuitions', function ($query) use( $currentState) {
                $query->where('period_id', $currentState->period_id);
            })->count();
            $parallel->registered = $countStudents;
            return $parallel;
        });
        // dd($parallels->toArray());
        return Inertia::render('Parallels/Index', [
            'success' => true,
            'data' => $parallels,
        ]);
    }

    public function courses(Request $request)
    {
        $search = $request->get('search', '');
        $pageSize = $request->get('pageSize', 10);
        $courses = Course::where('status', true)->get();
        return response()->json([
            'success' => true,
            'data' => $courses,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreparallelRequest $request)
    {
        $request->validated();
        Parallel::create($request->all());
        return to_route('parallels.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Parallel $parallel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Parallel $parallel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateparallelRequest $request, Parallel $parallel)
    {
        $request->validated();
        $parallel->update($request->all());
        return to_route('parallels.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Parallel $parallel)
    {
        //
    }
}
