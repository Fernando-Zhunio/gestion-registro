<?php

namespace App\Http\Controllers;

use App\Models\teacher;
use App\Http\Requests\StoreteacherRequest;
use App\Http\Requests\UpdateteacherRequest;
use App\Models\ContractTeacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $onlyCurrent = $request->get('onlyCurrent', true);
        $currentState = currentState();
        $teachersBuilder = Teacher::query();
        $teachersBuilder->search($request->get('search', null));
        if ($onlyCurrent) {
            $teachersBuilder->where('period_id', $currentState->period_id);
        }
        $teachers = $teachersBuilder->paginate(10);
        return Inertia::render('Teachers/Index', [
            'success' => true,
            'data' => $teachers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $periods = \App\Models\Period::all();
        return Inertia::render('Teachers/CreateOrEditTeacher', [
            'isEdit' => false,
            'periods' => $periods,
        ]); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreteacherRequest $request)
    {
        $request->validated();
        DB::beginTransaction();

        try {
            $data = $request->all();
            $teacher = Teacher::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'address' => $data['address'],
                'doc_type' => Teacher::$DOC_TYPES[$data['doc_type']],
                'doc_number' => $data['doc_number'],
                'birthday' => date('Y-m-d', strtotime($data['birthday'])),
                'academic_title' => $data['academic_title'],
                'working_day' => $data['working_day'],
                'period_id' => $data['period_id'],
            ]);

            $teacher->contractsTeacher()->create([
                'observation' => $data['observation'],
                'start_date' => date('Y-m-d', strtotime($data['start_date'])),
                'end_date' => date('Y-m-d', strtotime($data['end_date'])),
                'contract_file' => $data['contract_file'],
                'contract_state' => $data['contract_state'],
                'contract_type' => $data['contract_type'],
                'salary' => $data['salary'],
                'period_id' => $data['period_id'],
            ]);
            DB::commit();

        } catch (\Throwable $th) {
            DB::rollBack();
            throw new \Exception($th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(teacher $teacher)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(teacher $teacher)
    {
        return Inertia::render('Teachers/CreateOrEditTeacher', [
            'isEdit' => true,
            'teacher' => $teacher->load('contractsTeacher'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateteacherRequest $request, teacher $teacher)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(teacher $teacher)
    {
        //
    }
}
