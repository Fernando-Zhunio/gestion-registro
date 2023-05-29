<?php

namespace App\Http\Controllers;

use App\Builders\BuilderForRoles;
use App\Const\ConstMiscellany;
use App\Models\Course;
use App\Models\Period;
use App\Models\Tuition;
use App\Http\Requests\StoretuitionRequest;
use App\Http\Requests\UpdatetuitionRequest;
use App\Models\Representative;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Student;
use App\Traits\GenerateFile;
use Dotenv\Exception\ValidationException;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoretuitionRequest $request)
    {
        DB::beginTransaction();
        $request->validated();

        try {
            $representative_id = null;
            if ($request->has('representative_id') && !empty($request->representative_id)) {
                $representative_id = $request->representative_id;
            } else {
                $dataRepresentative = $request->all()['representative'];
                $request->validate([
                    'first_name' => 'required|string|max:255',
                    'last_name' => 'required|string|max:255',
                    'email' => 'required|email|unique:students,email',
                    'phone' => 'required|string|max:255',
                    'address' => 'required|string|max:1000',
                    'doc_type' => 'required|string|max:255|in:' . ConstMiscellany::CI . ',' . ConstMiscellany::PASSPORT . ',' . ConstMiscellany::FOREIGNER_ID,
                    'doc_number' => 'required|string|unique:representatives,doc_number|max:255',
                    'gender' => 'required|string|max:255|in:' . ConstMiscellany::MALE . ',' . ConstMiscellany::FEMALE,
                    'occupation' => 'required|string|max:255',
                ], $dataRepresentative);
                $representative = Representative::create($request->all()['representative']);
                $representative_id = $representative->id;
            }
            $requestStudent = $request->all()['student'];
            $user = $this->generateUserStudent($requestStudent['first_name'] . ' ' . $requestStudent['last_name'], $requestStudent['email']);
            $currentPeriod = currentState()->period_id;
            $requestStudent['photo'] = $this->generateFile($requestStudent['photo']);
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
            throw new ValidationException($e->getMessage());
        }
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
