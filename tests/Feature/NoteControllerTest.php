<?php

namespace Tests\Feature;

use App\Models\Student;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class NoteControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $user = User::find(1);
        // $user->assignRole('super-admin');
        $this->actingAs($user);
        // $response = $this->get('/notes');
        $period_id = currentState()->period_id;
        $parallel_id = 1;

        $students = Student::whereHas('tuitions', function ($query) use ($parallel_id, $period_id) {
            $query->where('parallel_id', $parallel_id);
            $query->where('period_id', $period_id);
        })->with('currentNotes')->paginate(10);
        $subjectsOfParallel = $this->_getSubjectByParallel($parallel_id, $period_id);
        $students->getCollection()->map(function ($student) use($subjectsOfParallel) {
            $student->notesBySubject = $subjectsOfParallel->map(function ($subject) use($student) {
                $subject->note = $student->currentNotes->get($subject->id);
                return $subject;
            });
            return $student;
        });
        dd($students, $subjectsOfParallel);

        // $response->assertStatus(200);
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
}
