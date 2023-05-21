<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PeriodController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RepresentativeController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\TuitionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]
);
})->middleware('auth');


Route::middleware('auth')->group(function () {
    Route::get('auth-info', function () {
        return [
            'user' => auth()->user(),
            'sidebar' => [
                'links' => [
                    [
                        'name' => 'Dashboard',
                        'route' => 'dashboard',
                        'icon' => 'home',
                    ],
                    [
                        'name' => 'Profile',
                        'route' => 'profile.edit',
                        'icon' => 'user',
                    ],
                ],
            ],
        ];
    })->name('auth.info');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::prefix('teachers')->group(function () {
        Route::get('/', [TeacherController::class, 'index'])->name('teacher');
        Route::get('/{teacher}', [TeacherController::class, 'edit'])->name('teacher.edit');
        Route::get('/create', [TeacherController::class, 'create'])->name('teacher.create');
        Route::post('/', [TeacherController::class, 'store'])->name('teacher.store');
    });

    Route::prefix('periods')->group(function () {
        Route::get('/', [PeriodController::class, 'index'])->name('periods.index');
        // Route::get('/create', [PeriodController::class, 'create'])->name('period.create');
        Route::post('/', [PeriodController::class, 'store'])->name('period.store');
        Route::put('/{period}', [PeriodController::class, 'update'])->name('period.update');
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
        Route::post('/', [NoteController::class, 'store'])->name('notes.store');
        Route::put('/{note}', [NoteController::class, 'update'])->name('notes.update');
        Route::delete('/{note}', [NoteController::class, 'destroy'])->name('notes.destroy');
    });

    Route::prefix('students')->group(function () {
        Route::get('/', [StudentController::class, 'index'])->name('students.index');
        Route::get('/create', [StudentController::class, 'create'])->name('students.create');
        Route::post('/', [StudentController::class, 'store'])->name('students.store');
        Route::put('/{student}', [StudentController::class, 'update'])->name('students.update');
        Route::delete('/{student}', [StudentController::class, 'destroy'])->name('students.destroy');
    });

    Route::prefix('tuitions')->group(function () {
        Route::get('/', [TuitionController::class, 'index'])->name('tuitions.index');
        Route::get('/create', [TuitionController::class, 'create'])->name('tuitions.create');
        Route::post('/', [TuitionController::class, 'store'])->name('tuitions.store');
        Route::put('/{tuition}', [TuitionController::class, 'update'])->name('tuitions.update');
        Route::delete('/{tuition}', [TuitionController::class, 'destroy'])->name('tuitions.destroy');
    });

    Route::prefix('representatives')->group(function () {
        Route::get('/', [RepresentativeController::class, 'index'])->name('representatives.index');
        Route::get('/index-api', [RepresentativeController::class, 'indexApi'])->name('representatives.index-api');
        Route::get('/create', [RepresentativeController::class, 'create'])->name('representatives.create');
        Route::post('/', [RepresentativeController::class, 'store'])->name('representatives.store');
        Route::put('/{representative}', [RepresentativeController::class, 'update'])->name('representatives.update');
        Route::delete('/{representative}', [RepresentativeController::class, 'destroy'])->name('representatives.destroy');
    });
});

require __DIR__.'/auth.php';
