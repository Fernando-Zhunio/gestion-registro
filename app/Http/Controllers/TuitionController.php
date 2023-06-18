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
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $builder = Tuition::query();
        $builder->with('student', 'period', 'course');
        $tuitions = BuilderForRoles::PaginateSearch($builder, 'student.first_name');
        return Inertia::render('Tuitions/Index', [
            'success' => true,
            'data' => $tuitions,
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
        $currentPeriod = currentState()->period_id;
        // return $currentPeriod;
        $students = Student::search($search, 'first_name', ['last_name'])->whereHas('tuitions', function ($query) use ($currentPeriod) {
            $query->where('period_id', $currentPeriod);
        })->with('course')->paginate($pageSize);

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

    // private function validateParallel($courses_id, $parallel_id)
    // {
    //     $parallel = Parallel::where('course_id', $courses_id)->where('id', $parallel_id)->first();
    //     // dd($parallel);
    //     if (!$parallel) {
    //         validationException(
    //             'parallel_id',
    //             'El paralelo no existe en el curso seleccionado',
    //         );
    //     }
    // }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $requestStudent = $request->all()['student'];
        // validateParallel($request->parallel_id, $request->course_id);
        validateParallel( $requestStudent['parallel_id'], $requestStudent['course_id']);
        DB::beginTransaction();
        // dd($requestStudent);
        $request->validate($this->rulesStudent());
        $representative_id = null;
        $requestRepresentative = $request->all()['representative'];

        if ($request->has('representative_id') && !empty($request->representative_id)) {
            $representative_id = $request->representative_id;
        } else {
            $request->validate($this->rulesRepresentative());
        }
        try {
            if (!$representative_id) {
                $representative = Representative::create($requestRepresentative);
                $representative_id = $representative->id;
            }

            $user = $this->generateUserStudent($requestStudent['first_name'] . ' ' . $requestStudent['last_name'], $requestStudent['email']);
            $currentPeriod = currentState()->period_id;
            $requestStudent['photo'] = $this->generateFile($requestStudent['photo']);
            unset($requestStudent['email']);
            $student = Student::create(array_merge($requestStudent, ['representative_id' => $representative_id, 'user_id' => $user->id]));
            Tuition::create([
                'student_id' => $student->id,
                'period_id' => $currentPeriod,
                'course_id' => $student->course_id,
                'status' => '1',
                'approved' => '1'
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

    public function rulesStudent(): array
    {
        return [
            'student.first_name' => 'required|string|max:255',
            'student.last_name' => 'required|string|max:255',
            'student.email' => 'required|email|unique:users,email',
            'student.phone' => 'nullable|digits:10|max:255',
            'student.address' => 'required|string|max:1000',
            'student.doc_type' => 'required|string|max:255|in:' . ConstMiscellany::CI . ',' . ConstMiscellany::PASSPORT . ',' . ConstMiscellany::FOREIGNER_ID,
            'student.doc_number' => 'required|string|unique:students,doc_number|max:255',
            'student.birthday' => 'required|date',
            'student.gender' => 'required|string|max:255|in:' . ConstMiscellany::MALE . ',' . ConstMiscellany::FEMALE,
            'student.photo' => 'required|file|max:1024|mimes:jpeg,jpg,png',
            'student.previous_institution' => 'required|string|max:255',
            'student.illness_or_disability' => 'nullable|string|max:255',
            'student.course_id' => 'required|integer|exists:courses,id',
            'student.representative_id' => 'nullable|integer|exists:representatives,id',
        ];
    }

    private function rulesRepresentative()
    {
        return [
            'representative.first_name' => 'required|string|max:255',
            'representative.last_name' => 'required|string|max:255',
            'representative.email' => 'required|email|unique:representatives,email',
            'representative.phone' => 'required|string|max:255',
            'representative.address' => 'required|string|max:1000',
            'representative.doc_type' => 'required|string|max:255|in:' . ConstMiscellany::CI . ',' . ConstMiscellany::PASSPORT . ',' . ConstMiscellany::FOREIGNER_ID,
            'representative.doc_number' => 'required|string|unique:representatives,doc_number|max:255',
            'representative.gender' => 'required|string|max:255|in:' . ConstMiscellany::MALE . ',' . ConstMiscellany::FEMALE,
            'representative.occupation' => 'required|string|max:255',
        ];
    }

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
    // public function update(UpdatetuitionRequest $request, Tuition $tuition)
    // {
    //     DB::beginTransaction();
    //     $request->validated();

    //     try {
    //         $dataRepresentative = $request->all()['representative'];
    //         $representative = Representative::create($request->all()['representative']);
    //         $user = $this->generateUserStudent($dataRepresentative['first_name'].' '.$dataRepresentative['last_name'], $dataRepresentative['email']);
    //         $dataStudent = $request->all()['student'];
    //         $currentPeriod = currentState()->period_id;
    //         if (isset($dataStudent['photo'])) {
    //             $dataStudent['photo'] = $this->generateFile($dataStudent['photo']);
    //         }
    //         $student = Student::create(array_merge($dataStudent, ['representative_id' => $representative->id, 'user_id' => $user->id]));
    //         Tuition::create([
    //             'student_id' => $student->id,
    //             'period_id' => $currentPeriod,
    //             'course_id' => $student->course_id,
    //             // 'status' => '1',
    //             // 'approved' => '1'
    //         ]);
    //         DB::commit();
    //         return to_route('tuitions.index');
    //     } catch (\Exception $e) {
    //         DB::rollBack();
    //         throw new ValidationException($e->getMessage());
    //     }
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tuition $tuition)
    {
        //
    }
}
