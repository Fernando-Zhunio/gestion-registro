<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PeriodController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TeacherController;
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
        Route::get('/create', [TeacherController::class, 'create'])->name('teacher.create');
        Route::post('/', [TeacherController::class, 'store'])->name('teacher.store');
    });

    Route::prefix('periods')->group(function () {
        Route::get('/', [PeriodController::class, 'index'])->name('periods.index');
        // Route::get('/create', [PeriodController::class, 'create'])->name('period.create');
        Route::post('/', [PeriodController::class, 'store'])->name('period.store');
        Route::put('/{period}', [PeriodController::class, 'update'])->name('period.update');
    });
});

require __DIR__.'/auth.php';
