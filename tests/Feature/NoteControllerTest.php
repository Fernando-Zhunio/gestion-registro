<?php

namespace Tests\Feature;

use App\Http\Controllers\NoteController;
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

        $noteController = new NoteController();
        $result = $noteController->verifiedApprovedCourse(1,13);
        dd($result);
        // dd($students, $subjectsOfParallel);
        $this->assertEquals(1, 0);
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
