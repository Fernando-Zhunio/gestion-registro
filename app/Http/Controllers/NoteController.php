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
use App\Models\Tuition;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $this->middleware(['role:teacher|super-admin|admin'])->except('index');
    }
    public function index()
    {
        $builder = Note::query();
        $search = request()->get('search', '');
        $period_id = request()->get('period_id', null) ?? currentState()->period_id;
        $parallel_id = request()->get('parallel_id', 1) ?? null;

        $students = Student::whereHas('tuitions', function ($query) use ($parallel_id, $period_id) {
            $query->where('parallel_id', $parallel_id);
            $query->where('period_id', $period_id);
        })->with('currentNotes')->paginate(10);
        $subjectsOfParallel = $this->_getSubjectByParallel($parallel_id, $period_id);
        // $students->getCollection()->map(function ($student) use($subjectsOfParallel) {
        //     $student->notesBySubject = $subjectsOfParallel->map(function ($subject) use($student) {
        //         $subject->note = $student->currentNotes;
        //         return $subject;
        //     });
        //     return $student;
        // });
        return Inertia::render('Notes/Index', [
            'success' => true,
            'data' => $students,
            'metadata' => ['subjects' => $subjectsOfParallel],
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
        $schedules = $this->_getSubjectByParallel($parallel->id, currentState()->period_id);
        return response()->json([
            'success' => true,
            'data' => $schedules,
        ]);
    }

    private function _getSubjectByParallel(int $parallel_id, int $period_id)
    {
        /**
         * @var \App\Models\User $user
         */
        $user = request()->user();
        $teacher = $user?->teacher;
        return Subject::whereHas('schedules', function ($query) use ($teacher, $parallel_id, $period_id) {
            $query->where('period_id', $period_id);
            $query->where('parallel_id', $parallel_id);
            $teacher && $query->where('teacher_id', $teacher->id);
            return $query;
        })->get();
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
            'data' => ['parallels' => $parallels],
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
            ->whereHas('tuitions', function ($query) use ($period_id, $parallel_id) {
                $query->where('parallel_id', $parallel_id);
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

        $this->verifiedApprovedCourse($request->parallel_id, $request->student_id);

        // szkmcdkw
        // Note::updateOrCreate($mergeData);

        return response()->json([
            'success' => true,
            'data' => $request->all(),
        ]);
    }

    private function verifiedApprovedCourse($parallel_id, $student_id)
    {
        $period_id = currentState()->period_id;
        $notes = Note::where('student_id', $student_id)->where('period_id', $period_id)->get();
        $subjects = $this->_getSubjectByParallel($parallel_id, $period_id);
        $tuition = Tuition::where('student_id', $student_id)->where('parallel_id', $parallel_id)->where('period_id', $period_id)->first();

        foreach ($subjects as $subject) {
            if(!$notes->contains('subject_id', $subject->id)) {
                $tuition->approved = 0;
                $tuition->save();
                return;
            }
            $note = $notes->where('subject_id', $subject->id)->first();
            $firstTrimesterNote = ((+$note?->partial_trimester_1 ?? 0) + (+$note?->integrating_project_1 ?? 0) + (+$note?->evaluation_mechanism_1 ?? 0)) / 10;
            $secondTrimesterNote = ((+$note?->partial_trimester_2 ?? 0) + (+$note?->integrating_project_2 ?? 0) + (+$note?->evaluation_mechanism_2 ?? 0)) / 10;
            $thirdTrimesterNote = ((+$note?->partial_trimester_3 ?? 0) + (+$note?->integrating_project_3 ?? 0) + (+$note?->evaluation_mechanism_3 ?? 0)) / 10;
            $finalNote = ((($firstTrimesterNote + $secondTrimesterNote + $thirdTrimesterNote) / 3.33333333333333)+ ((+$note?->project_final/10) ?? 0));
            if($finalNote < 7) {
                $tuition->approved = 0;
                $tuition->save();
                return;
            }
        }

        $tuition->approved = 1;
        $tuition->save();
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
        $this->verifiedApprovedCourse($request->parallel_id, $request->student_id);

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
