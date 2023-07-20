<?php

namespace App\Http\Controllers;

use App\Builders\BuilderForRoles;
use App\Const\ConstMiscellany;
use App\Models\Student;
use App\Http\Requests\StorestudentRequest;
use App\Http\Requests\UpdatestudentRequest;
use App\Models\Course;
use App\Models\Period;
use App\Models\Tuition;
use App\Traits\GenerateFile;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    use GenerateFile;
    public function index()
    {
        // $genders = ConstMiscellany::getGendersSelect();
        // $docTypes = ConstMiscellany::getDocTypesSelect();
        // $courses = Course::all();
        // $builder = Student::query();
        // $builder->with('course');
        // $students = BuilderForRoles::PaginateSearch($builder, 'first_name', ['last_name', 'doc_number']);
        // BuilderSearchClass(Student::class, 'first_name', ['last_name']);
        // $students = Student::search(request()->get('search', ''))->paginate();
        $period_id = request('period_id', null) ?? currentState()->period_id;
        $students = Student::search(request()->get('search', ''))->whereHas('tuitions', function($query) use($period_id) {
            return $query->where('period_id', $period_id);
        })->paginate();
        return Inertia::render('Students/Index', [
            'success' => true,
            'data' => $students,
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
        $period = Period::find($currentPeriod);
        $courses = Course::all();
        $genders = ConstMiscellany::getGendersSelect();
        $docTypes = ConstMiscellany::getDocTypesSelect();
        $courses = Course::all();
        return Inertia::render('Students/CreateOrEditStudent', [
            'success' => true,
            'data' => $student,
            'genders' => $genders,
            'courses' => $courses,
            'docTypes' => $docTypes,
            'periods' => [$period],
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
