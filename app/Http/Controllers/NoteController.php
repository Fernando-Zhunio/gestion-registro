<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Http\Requests\StorenoteRequest;
use App\Http\Requests\UpdatenoteRequest;
use App\Models\ManagerNote;
use App\Models\Parallel;
use App\Models\Period;
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
        $this->middleware(['role:teacher|super-admin|admin|secretary'])->except(['index', 'getParallels', 'getSubjectByParallel', 'getNoteByStudent']);
    }
    public function index()
    {
        /**
         * @var \App\Models\User $user
         */
        $user = auth()->user();
        if ($user->hasRole('student')) {
            return $this->indexForStudent();
        }
        
        $period_id = request()->get('period_id', null) ?? currentState()->period_id;
        $managerNotes = ManagerNote::with('inputNotes')->where('period_id', $period_id)->get();
        $periods = getPeriodByRole();
        $parallels = getParallelsByRoleAndPeriod($period_id);

        return Inertia::render('Notes/CreateOrEditNote', [
            'success' => true,
            'data' => [
                'currentPeriod' => $period_id, 
                'periods' => $periods, 
                'parallels' => $parallels,
                'manager_notes' => $managerNotes
            ],
        ]);
    }

    private function indexForStudent() {
        $period_id = request()->get('period_id', null) ?? currentState()->period_id;
        /**
         * @var \App\Models\User $user
         */
        $user = auth()->user();
        $student = $user->student;
        $tuitions = Tuition::with('course', 'period', 'parallel')->where('student_id', $student->id)->get();

        return Inertia::render('Notes/CreateOrEditNoteForStudent', [
            'success' => true,
            'data' => ['currentPeriod' => $period_id, 'tuitions' => $tuitions, 'student' => $student],
        ]);
    }

    public function getParallels(Request $request, Period $period)
    {
        /**
         * @var \App\Models\User $user
         */
        $parallels = getParallelsByRoleAndPeriod($period->id);
        return response()->json([
            'success' => true,
            'data' => $parallels,
        ]);
    }

    public function getSubjectByParallel(Period $period, Parallel $parallel)
    {
        $period_id = $period->id;
        $schedules = $this->_getSubjectByParallel($parallel->id, $period_id);
        return response()->json([
            'success' => true,
            'data' => $schedules,
        ]);
    }

    public function getSubjectByPeriod(Period $period) {

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
        $period_id = request()->get('period_id', null) ?? currentState()->period_id;
        $periods = getPeriodByRole();
        $parallels = getParallelsByRoleAndPeriod($period_id);

        return Inertia::render('Notes/CreateOrEditNote', [
            'success' => true,
            'data' => ['currentPeriod' => $period_id, 'periods' => $periods, 'parallels' => $parallels],
        ]);
    }

    public function searchStudentByParallels(Parallel $parallel)
    {
        $pageSize = request()->get('pageSize', 10);
        $search = request()->get('search', null);
        $period_id = request()->get('period_id', null) ?? currentState()->period_id;
        $parallel_id = $parallel->id;
        $notes = Student::search($search, 'first_name', ['last_name', 'doc_number'])
            ->whereHas('tuitions', function ($query) use ($period_id, $parallel_id) {
                $query->where('parallel_id', $parallel_id);
                $query->where('period_id', $period_id);
            })
            ->paginate($pageSize);
        return response()->json([
            'success' => true,
            'data' => $notes,
        ]);
    }

    public function getNoteByStudent(Request $request, Period $period, Student $student, Subject $subject)
    {
        $subject_id = $subject->id;

        $note = Note::where('student_id', $student->id)
            ->where('period_id', $period->id)
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
        // $teacher = $request->user()->teacher;
        /**
         * @var \App\Models\User $user
         */
        $user = auth()->user();
        $data = $request->all();
        if ($user->hasRole('teacher')) {
            $teacher = $user->teacher;
            $permissionTeacher = Schedule::where('teacher_id', $teacher->id)
                ->where('period_id', currentState()->period_id)
                ->where('parallel_id', $request->parallel_id)
                ->where('subject_id', $request->subject_id)
                ->exists();
            if (!$permissionTeacher) {
                validationException('teacher_id', 'El docente no tiene permisos para crear notas.');
            }
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
        return response()->json([
            'success' => true,
            'data' => $note,
        ]);
    }

    public function verifiedApprovedCourse($parallel_id, $student_id)
    {
        $period_id = currentState()->period_id;
        $notes = Note::where('student_id', $student_id)->where('period_id', $period_id)->get();
        $subjects = $this->_getSubjectByParallel($parallel_id, $period_id);
        $tuition = Tuition::where('student_id', $student_id)->where('parallel_id', $parallel_id)->where('period_id', $period_id)->first();
        $approved = 1;
        foreach ($subjects as $subject) {
            if(!$notes->contains('subject_id', $subject->id)) {
                $approved = 0;
                break;
            }
            // $note = $notes->where('subject_id', $subject->id)->first();
            // $note = addAverageInNotes($notes);
            // if($note['noteFinal'] < 7) {
            //     $approved = 0;
            //     break;
            // } else {
            //     $approved = 1;
            // }
        }
        if ($approved == 0) {
            $tuition->approved = 0;
            $tuition->save();
        }
        $approved = addAverageInNotes($notes)->every(function($note) {
            return $note['noteFinal'] >= 7;
        });
        if ($approved) {
            $tuition->approved = 1;
            $tuition->save();
        } else {
            $tuition->approved = 0;
            $tuition->save();
        }
        // $tuition->approved = $approved;
        // $tuition->save();
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
