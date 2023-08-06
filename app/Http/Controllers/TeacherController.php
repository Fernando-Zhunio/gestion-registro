<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Http\Requests\StoreteacherRequest;
use App\Http\Requests\UpdateteacherRequest;
use App\Models\ContractTeacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

use function PHPUnit\Framework\isEmpty;

class TeacherController extends Controller
{
    public function __construct() {
        $this->middleware(['role:super-admin|admin|secretary']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $onlyCurrent = $request->get('onlyCurrent', true);
        $currentState = currentState();
        $teachersBuilder = Teacher::query();
        $teachersBuilder->search($request->get('search'), 'first_name', ['last_name', 'doc_number']);
        // if ($onlyCurrent) {
        //     $teachersBuilder->where('period_id', $currentState->period_id);
        // }
        $teachers = $teachersBuilder->orderBy('id', 'DESC')->paginate(10);
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
        $data = $request->all();
        $user = $this->generateUserTeacher($data['first_name'] . ' ' . $data['last_name'], $data['email']);
        $teacher = Teacher::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'address' => $data['address'],
            'doc_type' => $data['doc_type'],
            'doc_number' => $data['doc_number'],
            'birthday' => date('Y-m-d', strtotime($data['birthday'])),
            'academic_title' => $data['academic_title'],
            'working_day' => $data['working_day'],
            'observation' => $data['observation'] ?? null,
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'contract_file' => null,
            'contract_state' => 1,
            'salary' => $data['salary'],
            'period_id' => currentState()->period_id,
            'user_id' => $user->id,
        ]);
        return redirect()->route('teachers.index');
    }

    private function generateUserTeacher($name, $email)
    {
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make('fernando1991') // Hash::make(time()),
        ]);
        $user->assignRole('teacher');
        return $user;
    }

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Teacher $teacher)
    {
        return Inertia::render('Teachers/CreateOrEditTeacher', [
            'isEdit' => true,
            'teacher' => $teacher,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateteacherRequest $request, Teacher $teacher)
    {
        $data = $request->all();
        $teacher->update([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'address' => $data['address'],
            'doc_type' => $data['doc_type'],
            'doc_number' => $data['doc_number'],
            'birthday' => $data['birthday'],
            'academic_title' => $data['academic_title'],
            'working_day' => $data['working_day'],
            'observation' => $data['observation'] ?? null,
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'contract_file' => null,
            'contract_state' => 1,
            'salary' => $data['salary'],
            'period_id' => currentState()->period_id,
        ]);

        return redirect()->route('teachers.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        //
    }
}
