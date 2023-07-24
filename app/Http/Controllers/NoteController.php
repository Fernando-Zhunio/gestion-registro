<?php

namespace App\Http\Controllers;

use App\Builders\BuilderForRoles;
use App\Models\Note;
use App\Http\Requests\StorenoteRequest;
use App\Http\Requests\UpdatenoteRequest;
use App\Models\Parallel;
use App\Models\Schedule;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $this->middleware(['role:teacher|super-admin|admin']);
    }
    public function index()
    {
        $builder = Note::query();
        $search = request()->get('search', '');
        $period = request()->get('period', null) ?? currentState()->period_id;
        if (!empty($search)) {
            $builder->whereHas('student', function ($query) use ($search) {
                $query->where('first_name', 'like', "%{$search}%");
                $query->orWhere('last_name', 'like', "%{$search}%");
            });
        }
        $notes = $builder->where('period_id', $period)->with('teacher')->paginate(10);
        return Inertia::render('Notes/Index', [
            'success' => true,
            'data' => $notes,
        ]);
    }

    public function getParallels(Request $request)
    {
        /**
         * @var \App\Models\User $user
         */
        $user = $request->user();
        $teacher = $user?->teacher;
        $isTeacher = $user->hasRole('teacher');
        $search = $request->get('search', '');
        $parallels = Parallel::search($search)->whereHas('schedules', function ($query) use ($teacher, $isTeacher) {
            $isTeacher && $query->where('teacher_id', $teacher?->id);
            $query->where('period_id', currentState()->period_id);
        })->paginate();
        return response()->json([
            'success' => true,
            'data' => $parallels,
        ]);
    }

    public function getSubjectByParallel(Parallel $parallel)
    {

        /**
         * @var \App\Models\User $user
         */
        $user = request()->user();
        // $pageSize = request()->get('pageSize', 10);
        $teacher = $user?->teacher;
        $search = request()->get('search', '');
        // $course = $parallel->course;
        $period = currentState()->period_id;
        $builder = Subject::search($search)->whereHas('schedules', function ($query) use ($teacher, $parallel, $period) {
            $query->where('period_id', $period);
            $query->where('parallel_id', $parallel->id);
            $teacher && $query->where('teacher_id', $teacher->id);
            return $query;
        });
        // if ($teacher) {
        //     $builder->where('teacher_id', $teacher->id);
        // }
        $schedules = $builder->get();
        return response()->json([
            'success' => true,
            'data' => $schedules,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        /**
         * @var \App\Models\User $user
         */
        $user = request()->user();
        $teacher = $user->teacher;
        $isTeacher = $user->hasRole('teacher');
        $parallels = Parallel::whereHas('schedules', function ($query) use ($teacher, $isTeacher) {
            $isTeacher && $query->where('teacher_id', $teacher?->id);
            $query->where('period_id', currentState()->period_id);
        })->get();

        return Inertia::render('Notes/CreateOrEditNote', [
            'success' => true,
            'data' => $parallels,
        ]);
    }

    public function getNotesByTeacher(Parallel $parallel)
    {
        $pageSize = request()->get('pageSize', 10);
        $search = request()->get('search', null);
        $period_id = currentState()->period_id;
        $parallel_id = $parallel->id;
        /**
         * @var \App\Models\User $user
         */
        $user = auth()->user();
        $isTeacher = $user->hasRole('teacher');
        $notes = Student::search($search, 'first_name', ['last_name', 'doc_number'])
            ->where('parallel_id', $parallel_id)
            ->whereHas('tuitions', function ($query) use ($period_id, $isTeacher) {
                $query->where('period_id', $period_id);
            })
            ->with('notes', function ($query) use ($user, $isTeacher, $period_id) {
                $query->orWhere('period_id', $period_id)->first();
            })
            ->paginate($pageSize);
        return response()->json([
            'success' => true,
            'data' => $notes,
        ]);
    }

    public function getNoteByStudent(Request $request, Student $student)
    {
        $subject_id = $request->get('subject_id');

        $note = Note::where('student_id', $student->id)
            ->where('period_id', currentState()->period_id)
            ->where('subject_id', $subject_id)
            ->first();

        return response()->json([
            'success' => true,
            'data' => ['note' => $note],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorenoteRequest $request)
    {
        $teacher = $request->user()->teacher;
        $data = $request->all();
        if ($teacher) {
            $permissionTeacher = Schedule::where('teacher_id', $teacher->id)
                ->where('period_id', currentState()->period_id)
                ->where('parallel_id', $request->parallel_id)
                ->where('subject_id', $request->subject_id)
                ->exists();
            if (!$permissionTeacher) {
                validationException('teacher_id', 'El docente no tiene permisos para crear notas.');
            }
            $data['teacher_id'] = $teacher->id;
        }

        $note = Note::where('student_id', $request->student_id)
            ->where('period_id', currentState()->period_id)
            ->where('subject_id', $request->subject_id)
            ->first();
        if ($note) {
            validationException('note_id', 'La nota ya existe.');
        }
        $mergeData = array_merge($data, [
            'user_id' => auth()->id(),
            'period_id' => currentState()->period_id,
        ]);

        $note = Note::create($mergeData);

        // szkmcdkw
        // Note::updateOrCreate($mergeData);

        return response()->json([
            'success' => true,
            'data' => $request->all(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(note $note)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(note $note)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatenoteRequest $request, note $note)
    {
        $teacher = $request->user()->teacher;
        $data = $request->all();
        if ($teacher) {
            $permissionTeacher = Schedule::where('teacher_id', $teacher->id)
                ->where('period_id', currentState()->period_id)
                ->where('parallel_id', $request->parallel_id)
                ->where('subject_id', $request->subject_id)
                ->exists();
            if (!$permissionTeacher) {
                validationException('teacher_id', 'El docente no tiene permisos para crear notas.');
            }
            $data['teacher_id'] = $teacher->id;
        }

        $mergeData = array_merge($data, [
            'user_id' => auth()->id(),
            'period_id' => currentState()->period_id,
        ]);
        $note->update($mergeData);
        // szkmcdkw
        // Note::updateOrCreate($mergeData);

        return response()->json([
            'success' => true,
            'data' => $request->all(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(note $note)
    {
        //
    }
}
