<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\schedule;
use App\Http\Requests\StorescheduleRequest;
use App\Http\Requests\UpdatescheduleRequest;
use App\Models\Parallel;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
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

    public function schedulesByParallel(Request $request, $parallel_id)
    {
        $period_id = currentState()->period_id;
        $schedules = Schedule::with('teacher:id,first_name,last_name,doc_number', 'subject:id,name')
        ->where('period_id', $period_id)->where('parallel_id', $parallel_id)->get();
        return response()->json(['data' => $schedules, 'success' => true]);
    }

    public function parallelSearch(Request $response)
    {
        $search = $response->get('search', null);
        $pageSize = $response->get('pageSize', null);
        $parallels = Parallel::search($search)->paginate($pageSize);
        return response()->json(['data' => $parallels, 'success' => true]);
    }

    public function teacherSearch(Request $response)
    {
        $search = $response->get('search', null);
        $pageSize = $response->get('pageSize', null);
        $teachers = Teacher::search($search, 'first_name', ['last_name', 'doc_number'])->paginate($pageSize);
        return response()->json(['data' => $teachers, 'success' => true]);
    }

    public function subjectSearch(Request $response)
    {
        $search = $response->get('search', null);
        $pageSize = $response->get('pageSize', null);
        $course_id = $response->get('course_id', null);
        $courses = Subject::where('course_id', $course_id)->search($search)->paginate($pageSize);
        return response()->json(['data' => $courses, 'success' => true]);
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
        $data = $request->all();
        $period_id = currentState()->period_id;
        $overlap = Schedule::where('day', $data['day'])
            ->where('parallel_id', $data['parallel_id'])
            ->where('period_id', $period_id)
            ->where('start_time' , '<', $data['end_time'])
            ->where('end_time', '>', $data['start_time'])->get();
        if ($overlap->count() > 0) {
            validationException('start_time','Este horario se cruza con otro horario existente.');
        }
        $schedule = Schedule::create([
            'day' => $data['day'],
            'start_time' => $data['start_time'],
            'end_time' => $data['end_time'],
            'status' => 1,
            'observation' => $data['observation'] ?? null,
            'parallel_id' => $data['parallel_id'],
            'subject_id' => $data['subject_id'],
            'teacher_id' => $data['teacher_id'],
            'period_id' => $period_id,
        ]);

        return response()->json([
            'success' => true,
            'data' => $schedule->load('teacher:id,first_name,last_name,doc_number', 'subject:id,name'),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Schedule $schedule)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatescheduleRequest $request, Schedule $schedule)
    {
        $data = $request->all();
        $period_id = currentState()->period_id;
        $overlap = Schedule::where('day', $data['day'])
            ->where('id', '!=', $schedule->id)
            ->where('parallel_id', $data['parallel_id'])
            ->where('period_id', $period_id)
            ->where('start_time' , '<', $data['end_time'])
            ->where('end_time', '>', $data['start_time'])->get();
        if ($overlap->count() > 0) {
            validationException('start_time','Este horario se cruza con otro horario existente.');
        }
        $schedule->update([
            'day' => $data['day'],
            'start_time' => $data['start_time'],
            'end_time' => $data['end_time'],
            'status' => 1,
            'observation' => $data['observation'] ?? null,
            'parallel_id' => $data['parallel_id'],
            'subject_id' => $data['subject_id'],
            'teacher_id' => $data['teacher_id'],
            'period_id' => $period_id,
        ]);

        return response()->json([
            'success' => true,
            'data' => $schedule->load('teacher:id,first_name,last_name,doc_number', 'subject:id,name'),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        $schedule->delete();
        return response()->json([
            'success' => true,
            'data' => $schedule,
        ]);
    }
}
