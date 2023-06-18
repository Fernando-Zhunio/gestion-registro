<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        Inertia::share([
            'auth' => function () {
                return [
                    'user' => Auth::user(),
                ];
            },
        ]);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // $this->renderExceptionValidation();
    }

    // private function renderExceptionValidation()
    // {
    //      // Maneja las excepciones de validación
    //      $this->app->bind(ValidationException::class, function ($exception) {
    //         dd($exception);
    //         $pre_errors = $exception->errors();
    //         $errors = collect($pre_errors);

    //         return response()->json([
    //             'success' => false,
    //             'data' => $errors->implode("0", "\n"),
    //         ], 422);
    //     });
    // }
}
