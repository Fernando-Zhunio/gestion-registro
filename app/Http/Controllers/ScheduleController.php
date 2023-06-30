<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\schedule;
use App\Http\Requests\StorescheduleRequest;
use App\Http\Requests\UpdatescheduleRequest;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        return Inertia::render('Schedules/Index', [
            'success' => true,
            'data' => [
                'schedules' => Schedule::all(),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Schedules/CreateOrEditSchedule', [
            'isEdit' => false,
            'data' => [
                'courses' => Course::where('status', 'A')->get(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorescheduleRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(schedule $schedule)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(schedule $schedule)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatescheduleRequest $request, schedule $schedule)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(schedule $schedule)
    {
        //
    }
}
