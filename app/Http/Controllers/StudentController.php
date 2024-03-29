<?php

namespace App\Http\Controllers;

use App\Builders\BuilderForRoles;
use App\Const\ConstMiscellany;
use App\Models\Student;
use App\Http\Requests\StorestudentRequest;
use App\Http\Requests\UpdatestudentRequest;
use App\Models\Course;
use App\Models\Parallel;
use App\Models\Period;
use App\Models\Tuition;
use App\Traits\GenerateFile;
use Inertia\Inertia;

class StudentController extends Controller
{

    public function __construct() {
        $this->middleware(['role:super-admin|admin|secretary|teacher']);
    }
    /**
     * Display a listing of the resource.
     */
    use GenerateFile;
    public function index()
    {
        $period_id = request('period_id', null) ?? currentState()->period_id;
        $course_id = request('course_id', null);
        $parallel_id = request('parallel_id', null);
        $students = Student::search(request()->get('search', ''), 'first_name', ['last_name', 'doc_number'])
        ->with('tuitions.course', 'representative', 'user')
        ->whereHas('tuitions', function($query) use($period_id, $course_id, $parallel_id){ 
            $course_id && $query->where('course_id', $course_id);
            $parallel_id && $query->where('parallel_id', $parallel_id);
            return $query->where('period_id', $period_id);
        })->paginate();
        $periods = Period::all();
        $courses = Course::all();
        $parallels = [];
        if($course_id) {
            $parallels = Parallel::where('course_id', $course_id)->get();
        }

        $role = auth()->user()->roles[0]->name;

        return Inertia::render('Students/Index', [
            'success' => true,
            'data' => $students,
            'metadata' => ['periods' =>$periods, 'role' => $role, 'courses' => $courses, 'parallels' => $parallels, 'current_period' => $period_id],
        ]);
    }

    public function indexReports()
    {
        /**
         * @var User $user
         * */
        $user = auth()->user();
        if ($user->hasRole('teacher')) {
            validationException('user', 'No se puede mostrar reportes para un profesor(a).');            
        }
        $period_id = request('period_id', null) ?? currentState()->period_id;
        $course_id = request('course_id', null);
        $parallel_id = request('parallel_id', null);
        $students = Student::search(request()->get('search', ''), 'first_name', ['last_name', 'doc_number'])
        ->with('tuitions.course', 'representative', 'user')
        ->whereHas('tuitions', function($query) use($period_id, $course_id, $parallel_id){ 
            $course_id && $query->where('course_id', $course_id);
            $parallel_id && $query->where('parallel_id', $parallel_id);
            return $query->where('period_id', $period_id);
        })->paginate();
        $periods = Period::all();
        $courses = Course::all();
        $parallels = [];
        if($course_id) {
            $parallels = Parallel::where('course_id', $course_id)->get();
        }

        return Inertia::render('Reports/Index', [
            'success' => true,
            'data' => $students,
            'metadata' => ['periods' =>$periods, 'courses' => $courses, 'parallels' => $parallels, 'current_period' => $period_id],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorestudentRequest $request)
    {
        $request->validated();
        Student::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(student $student)
    {
        $student->load('representative');
        $currentPeriod = currentState()->period_id;
        $tuition = Tuition::with('course')->where('student_id', $student->id)->where('period_id', $currentPeriod)->first();
        $period = Period::find($currentPeriod);
        $courses = Course::all();
        $genders = ConstMiscellany::getGendersSelect();
        $docTypes = ConstMiscellany::getDocTypesSelect();
        $courses = Course::all();
        $parallels = Parallel::where('course_id', $tuition->course_id)->get();
        return Inertia::render('Students/CreateOrEditStudent', [
            'success' => true,
            'data' => $student,
            'genders' => $genders,
            'courses' => $courses,
            'docTypes' => $docTypes,
            'periods' => [$period],
            'parallels' => $parallels,
            'tuition' => $tuition,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatestudentRequest $request, student $student)
    {
        $request->validated();
        $dataStudent = $request->all();
        if ($request->hasFile('photo')) {
            $dataStudent['photo'] = $this->generateFile($dataStudent['photo']);
        }
        $student->update($dataStudent);
        return redirect()->route('students.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(student $student)
    {
        //
    }
}
