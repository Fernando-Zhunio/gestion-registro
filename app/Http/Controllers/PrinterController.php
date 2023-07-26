<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\Period;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Tuition;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Normalizer;

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
        $data['notes'] = addAverageInNotes(Note::where('student_id', $student->id)->where('period_id', $period_id)->get());
        $view = view('printers.promotion_certificate', compact('data'))->render();
        
        // $pdf = Pdf::loadView('printers.promotion_certificate', compact('data') );
        // return ['view' => $view];
        $pdf = Pdf::loadHTML(Normalizer::normalize($view), 'UTF-8');
        $name = $student->doc_number.'-certificado_promocion'.'.pdf';
        return $pdf->download($name);
    }



public function notesByTrimester(Request $request, Student $student, int $trimester)
    {
        $period_id = currentState()->period_id;
        $tuition = Tuition::with('course')
            ->where('student_id', $student->id)
            ->where('period_id', $period_id)
            ->first();

        $data['period'] = Period::find($period_id);
        $data['student'] = $student;
        $data['course'] = $tuition->course;
        $data['trimester'] = $trimester;

        $data['subjects'] = $this->_getSubjectByParallel($tuition->parallel_id, $period_id);
        $data['notes'] = addAverageInNotes(Note::where('student_id', $student->id)->where('period_id', $period_id)->get());
        return view('printers.notes_student', compact('data'));
        $view = view('printers.notes_student', compact('data'))->render();
        
        // $pdf = Pdf::loadView('printers.promotion_certificate', compact('data') );
        // return ['view' => $view];
        $pdf = Pdf::loadHTML(Normalizer::normalize($view), 'UTF-8');
        $name = $student->doc_number.'-certificado_promocion'.'.pdf';
        return $pdf->download($name);
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
