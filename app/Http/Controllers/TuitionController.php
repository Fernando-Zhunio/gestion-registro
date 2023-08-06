<?php

namespace App\Http\Controllers;

use App\Builders\BuilderForRoles;
use App\Const\ConstMiscellany;
use App\Models\Course;
use App\Models\Period;
use App\Models\Tuition;
use App\Http\Requests\StoretuitionRequest;
use App\Http\Requests\UpdatetuitionRequest;
use App\Models\Parallel;
use App\Models\Representative;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Student;
use App\Traits\GenerateFile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class TuitionController extends Controller
{
    use GenerateFile;

    public function __construct() {
        $this->middleware(['role:super-admin|admin|secretary'])->except(['index']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $search = request()->get('search', '');
        $period_id = request('period_id', null) ?? currentState()->period_id;
        $tuitions = Tuition::whereHas('student', function ($query) use ($search, $period_id) {
            $query->search($search, 'first_name', ['last_name']);
        })->with('student', 'course', 'period', 'student.user', 'parallel')
        ->where('period_id', $period_id)->orderBy('created_at', 'desc')->paginate();
        $role = auth()->user()->roles[0]->name;
        return Inertia::render('Tuitions/Index', [
            'success' => true,
            'data' => $tuitions,
            'metadata' => ['currentPeriodId' => $period_id, 'role' => $role],
        ]);
    }

    public function parallelsIndex(Request $request)
    {
        $parallels = Parallel::where('course_id', $request->course_id)->get();
        return response()->json([
            'success' => true,
            'data' => $parallels,
        ]);
    }

    public function students(Request $request)
    {
        $search = $request->get('search', null);
        $pageSize = $request->get('pageSize', 10);
        // $currentPeriod = currentState()->period_id;
        // return $currentPeriod;
        $students = Student::search($search, 'first_name', ['last_name'])
            /* ->whereHas('tuitions', function ($query) use ($currentPeriod) {
            $query->where('period_id', $currentPeriod);
        }) */->paginate($pageSize);

        return response()->json([
            'success' => true,
            'data' => $students,
        ]);
    }

    public function representatives(Request $request)
    {
        $search = $request->get('search', null);
        $pageSize = $request->get('pageSize', 10);
        // $currentPeriod = currentState()->period_id;
        $students = Representative::search($search, 'first_name', ['last_name'])->paginate($pageSize);

        return response()->json([
            'success' => true,
            'data' => $students,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $currentPeriod = currentState()->period_id;
        $period = Period::find($currentPeriod);
        $courses = Course::all();
        $genders = ConstMiscellany::getGendersSelect();
        $docTypes = ConstMiscellany::getDocTypesSelect();
        $courses = Course::all();
        return Inertia::render('Tuitions/CreateOrEditTuition', [
            'success' => true,
            'data' => '',
            'genders' => $genders,
            'courses' => $courses,
            'docTypes' => $docTypes,
            'period' => [$period],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $parallel_id = $request->get('parallel_id');
        $course_id = $request->get('course_id');
        validateParallel($parallel_id, $course_id);
        DB::beginTransaction();
        $request->validate($this->rulesStudent());
        try {

            $data = $request->all();
            $currentPeriod = currentState()->period_id;

            $user = $this->generateUserStudent($data['first_name'] . ' ' . $data['last_name'], $data['email']);

            $data['photo'] = $this->generateFile($data['photo']);
            $data['user_id'] = $user->id;
            $student = Student::create($data);
            Tuition::create([
                'student_id' => $student->id,
                'period_id' => $currentPeriod,
                'course_id' => $course_id,
                'parallel_id' => $parallel_id,
                'status' => '1',
                'approved' => '0'
            ]);
            DB::commit();
            return to_route('tuitions.index');
        } catch (\Exception $e) {
            dd($e);
            DB::rollBack();
            validationException(
                'student',
                'No se pudo crear la matricula intentelo nuevamente',
            );
        }
    }

    public function renew(Request $request, Student $student)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'parallel_id' => 'required|exists:parallels,id',
        ], $request->all());
        validateParallel($request->parallel_id, $request->course_id);

        $tuition = Tuition::where([
            'student_id' => $student->id,
            'period_id' => currentState()->period_id,
        ]);
        if ($tuition->exists()) {
            $tuition->update([
                'course_id' => $request->course_id,
                'parallel_id' => $request->parallel_id
            ]);
            return to_route('tuitions.index');
        }
        Tuition::create([
            'student_id' => $student->id,
            'period_id' => currentState()->period_id,
            'course_id' => $request->course_id,
            'parallel_id' => $request->parallel_id,
            'status' => '1',
            'approved' => '0'
        ]);
        return to_route('tuitions.index');
    }

    public function rulesStudent(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'nullable|digits:10|max:255',
            'address' => 'required|string|max:1000',
            'doc_type' => 'required|string|max:255|in:' . ConstMiscellany::CI . ',' . ConstMiscellany::PASSPORT . ',' . ConstMiscellany::FOREIGNER_ID,
            'doc_number' => 'required|string|unique:students,doc_number|max:255',
            'birthday' => 'required|date',
            'gender' => 'required|string|max:255|in:' . ConstMiscellany::MALE . ',' . ConstMiscellany::FEMALE,
            'photo' => 'required|file|max:1024|mimes:jpeg,jpg,png',
            'previous_institution' => 'required|string|max:255',
            'illness_or_disability' => 'nullable|string|max:255',
            'course_id' => 'required|integer|exists:courses,id',
            'representative_id' => 'required|integer|exists:representatives,id',
        ];
    }

    // private function rulesRepresentative()
    // {
    //     return [
    //         'representative.first_name' => 'required|string|max:255',
    //         'representative.last_name' => 'required|string|max:255',
    //         'representative.email' => 'required|email|unique:representatives,email',
    //         'representative.phone' => 'required|string|max:255',
    //         'representative.address' => 'required|string|max:1000',
    //         'representative.doc_type' => 'required|string|max:255|in:' . ConstMiscellany::CI . ',' . ConstMiscellany::PASSPORT . ',' . ConstMiscellany::FOREIGNER_ID,
    //         'representative.doc_number' => 'required|string|unique:representatives,doc_number|max:255',
    //         'representative.gender' => 'required|string|max:255|in:' . ConstMiscellany::MALE . ',' . ConstMiscellany::FEMALE,
    //         'representative.occupation' => 'required|string|max:255',
    //     ];
    // }

    private function generateUserStudent($name, $email)
    {
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make(time()),
        ]);
        $user->assignRole('student');
        return $user;
    }

    /**
     * Display the specified resource.
     */
    public function show(Tuition $tuition)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tuition $tuition)
    {
        $tuition->load(['student', 'student.representative', 'period', 'course']);
        $currentPeriod = currentState()->period_id;
        $period = Period::find($currentPeriod);
        $parallels = Parallel::where('course_id', $tuition->course_id)->get();
        $courses = Course::all();
        $genders = ConstMiscellany::getGendersSelect();
        $docTypes = ConstMiscellany::getDocTypesSelect();
        $courses = Course::all();
        return Inertia::render('Tuitions/CreateOrEditTuition', [
            'success' => true,
            'data' => $tuition,
            'genders' => $genders,
            'courses' => $courses,
            'docTypes' => $docTypes,
            'parallels' => $parallels,
            'period' => [$period],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatetuitionRequest $request, Tuition $tuition)
    {
        $parallel_id = $request->parallel_id;
        $course_id = $request->course_id;

        validateParallel($parallel_id, $course_id);

        DB::beginTransaction();
        // $request->validate($this->rulesStudent());
        // $representative_id = null;
        // $requestRepresentative = $request->all()['representative'];

        // if ($request->has('representative_id') && !empty($request->representative_id)) {
        //     $representative_id = $request->representative_id;
        // } else {
        //     $request->validate($this->rulesRepresentative());
        // }
        try {
            // if (!$representative_id) {
            //     $representative = Representative::create($requestRepresentative);
            //     $representative_id = $representative->id;
            // }

            // $user = $this->generateUserStudent($requestStudent['first_name'] . ' ' . $requestStudent['last_name'], $requestStudent['email']);

            // unset($requestStudent['email']);
            // $student = Student::create(array_merge($requestStudent, ['representative_id' => $representative_id, 'user_id' => $user->id]));
            // Tuition::create([
            //     'student_id' => $student->id,
            //     'period_id' => $currentPeriod,
            //     'course_id' => $student->course_id,
            //     'parallel_id' => $requestStudent['parallel_id'],
            //     'status' => '1',
            //     'approved' => '0'
            // ]);
            $dataStudent = [
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'phone' => $request->phone,
                'address' => $request->address,
                'doc_type' => $request->doc_type,
                'doc_number' => $request->doc_number,
                'birthday' => $request->birthday,
                'gender' => $request->gender,
                'previous_institution' => $request->previous_institution,
                'illness_or_disability' => $request->illness_or_disability,
                'representative_id' => $request->representative_id,
            ];

            $currentPeriod = currentState()->period_id;
            if ($request->has('photo') && !empty($request->photo)) {
                $dataStudent['photo'] = $this->generateFile($request->get('photo'));
            }
            $tuition->student()->update($dataStudent);
            $tuition->update([
                'parallel_id' => $request->parallel_id,
                'course_id' => $request->course_id,
            ]);
            
            /**
             * @var \App\Models\User $user
             */
            $user = auth()->user();
            $user->update([
                'name' => $request->first_name . ' ' . $request->last_name,
            ]);
            DB::commit();
            return to_route('tuitions.index');
        } catch (\Exception $e) {
            DB::rollBack();
            validationException(
                'student',
                'No se pudo crear la matricula intentelo nuevamente',
            );
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tuition $tuition)
    {
        //
    }
}
