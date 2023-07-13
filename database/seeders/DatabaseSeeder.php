<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\CurrentState;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        $user = \App\Models\User::factory()->create([
            'name' => 'Fernando zhunio',
            'email' => 'fzhunio@example.com',
            'password' => Hash::make('fernando1991')
        ]);

        // create roles of laravel permission the roles are admin, student, teacher
        $roles = ['super-admin','admin', 'student', 'teacher', 'secretary'];
        foreach ($roles as $role) {
            \Spatie\Permission\Models\Role::create(['name' => $role]);
        }

        $user->assignRole('super-admin');

        CurrentState::factory()->create();

        $this->call(
            [
                SpecialtySeeder::class,
                CourseSeeder::class,
            ]
        );
    }
}
