<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Note;
use App\Models\Parallel;
use App\Models\Period;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Tuition;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Normalizer;

class PrinterController extends Controller
{
    public function __construct()
    {
        $this->middleware(['role:super-admin|admin|teacher']);
    }

    public function promotionCertificate(Request $request, Period $period, Student $student)
    {
        $period_id = $period->id;
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

        $pdf = Pdf::loadHTML(Normalizer::normalize($view), 'UTF-8');
        $name = $student->doc_number . '-certificado_promocion' . '.pdf';
        return $pdf->download($name);
    }



    public function notesByTrimester(Request $request, Period $period, Student $student, int $trimester)
    {
        $period_id = $period->id;
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
        $view = view('printers.notes_student', compact('data'))->render();

        // $pdf = Pdf::loadView('printers.promotion_certificate', compact('data') );
        // return ['view' => $view];
        $pdf = Pdf::loadHTML(Normalizer::normalize($view), 'UTF-8');
        $name = $student->doc_number . '-certificado_promocion' . '.pdf';
        return $pdf->download($name);
    }

    public function certificateTuition(Request $request, Period $period, Student $student)
    {
        $period_id = $period->id;
        $tuition = Tuition::with('course', 'parallel')
            ->where('student_id', $student->id)
            ->where('period_id', $period_id)
            ->first();

        $data['period'] = $period;
        $data['student'] = $student;
        $data['tuition'] = $tuition;
        $view = view('printers.certificate_tuition', compact('data'))->render();
        $pdf = Pdf::loadHTML(Normalizer::normalize($view), 'UTF-8');
        $name = $student->doc_number . '-certificado_matricula' . '.pdf';
        return $pdf->download($name);
    }

    public function notesByTeacher(Request $request, Period $period,  int $trimester)
    {

        $request->validate([
            'parallel_id' => 'required',
            'subject_id' => 'required'
        ]);
        /**
         * @var User $user
         */
        $user = auth()->user();

        $builder = Student::whereHas('tuitions', function ($query) use ($request, $period) {
            $query->where('parallel_id', $request->get('parallel_id'));
            $query->where('period_id', $period->id);
        });
        $students = $builder->with('notes', function ($query) use ($period, $request) {
            $query->where('period_id', $period->id)->where('subject_id', $request->subject_id);
        })->get();
        $data['students'] = $students;
        $data['trimester'] = $trimester;
        $data['promotion'] = $period->promotion;
        $data['parallel'] = Parallel::find($request->get('parallel_id'))->name;
        $data['subject'] = Subject::find($request->get('subject_id'))->name;
        $view = view('printers.notes_teacher', compact('data'))->render();
        $pdf = Pdf::loadHTML(Normalizer::normalize($view), 'UTF-8');
        $name = $user->doc_number . '-notas_teacher' . '.pdf';
        return $pdf->download($name);
    }

    public function listStudents(Period $period,  Course $course, Parallel $parallel)
    {

        /**
         * @var User $user
         */
        $user = auth()->user();

        $students = Student::whereHas('tuitions', function ($query) use ($period, $course, $parallel) {
            $query->where('parallel_id', $parallel->id);
            $query->where('course_id', $course->id);
            $query->where('period_id', $period->id);
        })->get();

        $data['students'] = $students;
        $data['promotion'] = $period->promotion;
        $data['parallel'] = $parallel->name;
        $data['course'] = $course->name;
        // $data['subject'] = Subject::find($request->get('subject_id'))->name;
        $view = view('printers.list_students', compact('data'))->render();
        $pdf = Pdf::loadHTML(Normalizer::normalize($view), 'UTF-8');
        $name = $user->doc_number . '-list_note' . '.pdf';
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
