<?php

namespace App\Http\Controllers;

use App\Models\Period;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Tuition;
use Illuminate\Http\Request;

class PrinterController extends Controller
{

    public function promotionCertificate(Request $request, Student $student)
    {
        $period_id = currentState()->period_id;
        $tuition = Tuition::with('course')
            ->where('student_id', $student->id)
            ->where('period_id', $period_id)
            ->first();

        $data['period'] = Period::find($period_id);
        $data['student'] = $student;
        $data['course'] = $tuition->course;

        $data['subjects'] = $this->_getSubjectByParallel($tuition->parallel_id, $period_id);
        // dd($data['subjects'], $tuition);
        return view('printers.promotion_certificate', compact('data'));
    }

    private function _getSubjectByParallel(int $parallel_id, int $period_id)
    {
        return Subject::whereHas('schedules', function ($query) use ($parallel_id, $period_id) {
            $query->where('period_id', $period_id);
            $query->where('parallel_id', $parallel_id);
            return $query;
        })->get();
    }
}
