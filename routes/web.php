<?php

use App\Const\SidebarItem;
use App\Http\Controllers\AcademicController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PeriodController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RepresentativeController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ParallelController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TuitionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Controllers\PrinterController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get(
    '/', //function () {
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]
    // );
    // }
    [DashboardController::class, 'index']
)->middleware('auth');


Route::middleware('auth')->group(function () {
    Route::get('auth-info', function () {
        return [
            // 'isSuperAdmin' => $user->hasRole('super-admin'),
            'user' => auth()->user(),
            'currentState' => currentState()->load('period'),
            'periods' => getPeriodByRole(),
            'sidebar' => [
                'links' => SidebarItem::getItemsByRole(),
            ],
        ];
    })->name('auth.info');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::prefix('teachers')->group(function () {
        Route::get('/', [TeacherController::class, 'index'])->name('teachers.index');
        Route::get('/create', [TeacherController::class, 'create'])->name('teachers.create');
        Route::get('/{teacher}', [TeacherController::class, 'edit'])->name('teachers.edit');
        Route::post('/', [TeacherController::class, 'store'])->name('teachers.store');
        Route::put('/{teacher}', [TeacherController::class, 'update'])->name('teachers.update');
    });



    Route::prefix('periods')->group(function () {
        Route::get('/', [PeriodController::class, 'index'])->name('periods.index');
        Route::post('/', [PeriodController::class, 'store'])->name('period.store');
        Route::put('/{period}', [PeriodController::class, 'update'])->name('period.update');
    });

    Route::prefix('periods/{period}')->group(function () {
        Route::prefix('notes')->group(function () {
            Route::get('/parallels/{parallel}/subjects', [NoteController::class, 'getSubjectByParallel'])->name('notes.getSubjectByParallel');
            Route::get('/students/{student}/subjects/{subject}', [NoteController::class, 'getNoteByStudent'])->name('notes.getNoteByStudent');
        });
    });

    Route::prefix('courses')->group(function () {
        Route::get('/', [CourseController::class, 'index'])->name('courses.index');
        Route::get('/create', [CourseController::class, 'create'])->name('courses.create');
        Route::post('/', [CourseController::class, 'store'])->name('courses.store');
        Route::put('/{course}', [CourseController::class, 'update'])->name('courses.update');
        Route::delete('/{course}', [CourseController::class, 'destroy'])->name('courses.destroy');
    });
    Route::prefix('notes')->group(function () {
        Route::get('/', [NoteController::class, 'index'])->name('notes.index');
        Route::get('/create', [NoteController::class, 'create'])->name('notes.create');
        Route::get('/periods/{period}/parallels', [NoteController::class, 'getParallels'])->name('notes.parallels');
        Route::get('/periods/{period}/subjects/{subject}', [NoteController::class, 'getSubjectByPeriod'])->name('notes.getSubjectByPeriod');
        // Route::get('/parallels/{parallel}/subjects', [NoteController::class, 'getSubjectByParallel'])->name('notes.getSubjectByParallel');
        // Route::get('/student/{student}', [NoteController::class, 'getNoteByStudent'])->name('notes.getNoteByStudent');
        Route::get('/parallels/{parallel}/search-students', [NoteController::class, 'searchStudentByParallels'])->name('notes.searchStudentByParallels');
        Route::post('/', [NoteController::class, 'store'])->name('notes.store');
        Route::put('/{note}', [NoteController::class, 'update'])->name('notes.update');
        Route::delete('/{note}', [NoteController::class, 'destroy'])->name('notes.destroy');
    });

    Route::prefix('printers')->group(function () {
        Route::get('/periods/{period}/students/{student}/promotion_certificate', [PrinterController::class, 'promotionCertificate'])->name('printers.promotionCertificate');
        Route::get('/periods/{period}/students/{student}/notes_student/trimester/{trimester}', [PrinterController::class, 'notesByTrimester'])->name('printers.notesByTrimester');
        Route::get('/periods/{period}/students/{student}/certificate_tuition', [PrinterController::class, 'certificateTuition'])->name('printers.certificateTuition');
        Route::get('/periods/{period}/notes_students/trimester/{trimester}', [PrinterController::class, 'notesByTeacher'])->name('printers.notesByTeacher');
        Route::get('/periods/{period}/courses/{course}/parallels/{parallel}/students', [PrinterController::class, 'listStudents'])->name('printers.listStudents');
    });

    Route::prefix('students')->group(function () {
        Route::get('/', [StudentController::class, 'index'])->name('students.index');
        Route::get('/create', [StudentController::class, 'create'])->name('students.create');
        Route::post('/', [StudentController::class, 'store'])->name('students.store');
        Route::get('/{student}/edit', [StudentController::class, 'edit'])->name('students.edit');
        Route::put('/{student}', [StudentController::class, 'update'])->name('students.update');
        Route::delete('/{student}', [StudentController::class, 'destroy'])->name('students.destroy');
    });

    Route::prefix('reports')->group(function () {
        Route::get('/', [StudentController::class, 'indexReports'])->name('students-reports.index');
    });

    Route::prefix('tuitions')->group(function () {
        Route::get('/', [TuitionController::class, 'index'])->name('tuitions.index');
        Route::get('/create', [TuitionController::class, 'create'])->name('tuitions.create');
        Route::get('/parallels', [TuitionController::class, 'parallelsIndex'])->name('tuitions.parallels');
        // Route::get('{tuition}/edit', [TuitionController::class, 'edit'])->name('tuitions.edit');
        Route::post('/', [TuitionController::class, 'store'])->name('tuitions.store');
        Route::put('/{tuition}', [TuitionController::class, 'update'])->name('tuitions.update');
        Route::post('/students/{student}', [TuitionController::class, 'renew'])->name('tuitions.renew');
        // Route::put('/{tuition}', [TuitionController::class, 'update'])->name('tuitions.update');
        Route::delete('/{tuition}', [TuitionController::class, 'destroy'])->name('tuitions.destroy');
        Route::get('/students', [TuitionController::class, 'students'])->name('tuitions.student');
        Route::get('/representatives', [TuitionController::class, 'representatives'])->name('tuitions.representatives');
    });

    Route::prefix('representatives')->group(function () {
        Route::get('/', [RepresentativeController::class, 'index'])->name('representatives.index');
        Route::get('/index-api', [RepresentativeController::class, 'indexApi'])->name('representatives.index-api');
        Route::get('/create', [RepresentativeController::class, 'create'])->name('representatives.create');
        Route::post('/', [RepresentativeController::class, 'store'])->name('representatives.store');
        Route::put('/{representative}', [RepresentativeController::class, 'update'])->name('representatives.update');
        Route::delete('/{representative}', [RepresentativeController::class, 'destroy'])->name('representatives.destroy');
    });

    Route::prefix('subjects')->group(function () {
        Route::get('/', [SubjectController::class, 'index'])->name('subjects.index');
        Route::get('/create', [SubjectController::class, 'create'])->name('subjects.create');
        Route::get('/courses/search', [SubjectController::class, 'coursesSearch'])->name('subjects.courses');
        Route::post('/', [SubjectController::class, 'store'])->name('subjects.store');
        Route::put('/{subject}', [SubjectController::class, 'update'])->name('subjects.update');
        Route::delete('/{subject}', [SubjectController::class, 'destroy'])->name('subjects.destroy');
    });

    Route::prefix('parallels')->group(function () {
        Route::get('/', [ParallelController::class, 'index'])->name('parallels.index');
        Route::get('/create', [ParallelController::class, 'create'])->name('parallels.create');
        Route::get('/courses', [ParallelController::class, 'courses'])->name('parallels.courses');
        Route::get('/by-role', [ParallelController::class, 'getParallelsByRoleAndPeriod'])->name('parallels.getParallelsByRoleAndPeriod');
        Route::post('/', [ParallelController::class, 'store'])->name('parallels.store');
        Route::put('/{parallel}', [ParallelController::class, 'update'])->name('parallels.update');
        Route::delete('/{parallel}', [ParallelController::class, 'destroy'])->name('parallels.destroy');
    });

    Route::prefix('/schedules')->group(function () {
        Route::get('/', [ScheduleController::class, 'index'])->name('schedules.index');
        Route::get('/create', [ScheduleController::class, 'create'])->name('schedules.create');
        Route::get('/parallels/search', [ScheduleController::class, 'parallelSearch'])->name('parallelSearch');
        Route::get('/teachers/search', [ScheduleController::class, 'teacherSearch'])->name('teacherSearch');
        Route::get('/periods/{period}/parallels', [NoteController::class, 'getParallels'])->name('schedules.parallels');
        Route::get('/subjects/search', [ScheduleController::class, 'subjectSearch'])->name('subjectSearch');
        Route::get('/parallels/{parallel}', [ScheduleController::class, 'schedulesByParallel'])->name('schedules.parallel');
        Route::post('/', [ScheduleController::class, 'store'])->name('schedules.store');
        Route::put('/{schedule}', [ScheduleController::class, 'update'])->name('schedules.update');
        Route::delete('/{schedule}', [ScheduleController::class, 'destroy'])->name('schedules.destroy');
    });

    Route::prefix('/academic')->group(function () {
        Route::get('/', [AcademicController::class, 'index'])->name('academic.index');
        Route::get('/periods', [AcademicController::class, 'getPeriods'])->name('academic.periods');
        Route::get('/periods-next', [AcademicController::class, 'getPeriodsNext'])->name('academic.getPeriodsNext');
        Route::post('periods/{period}/period-next', [AcademicController::class, 'changePeriod'])->name('academic.changePeriod');
        Route::post('users', [AcademicController::class, 'storeUser'])->name('academic.storeUser');
        Route::put('users/{user}', [AcademicController::class, 'updateUser'])->name('academic.updateUser');
        Route::delete('users/{user}', [AcademicController::class, 'destroyUser'])->name('academic.destroyUser');
        Route::post('rector', [AcademicController::class, 'changeRector'])->name('academic.changeRector');
    });
});

require __DIR__ . '/auth.php';
