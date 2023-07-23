<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ParallelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $parallels = [
            [
                'name' => 'Sexto Informática',
                'observation' => 'Sexto Informática',
                'quota' => 20,
                'course_id' => 1
            ],
            [
                'name' => 'Sexto Contabilidad',
                'observation' => 'Sexto Contabilidad',
                'quota' => 20,
                'course_id' => 2
            ],
            [
                'name' => 'Sexto Administración',
                'observation' => 'Sexto Administración',
                'quota' => 20,
                'course_id' => 3
            ],
            [
                'name' => 'Quinto Informática',
                'observation' => 'Quinto Informática',
                'quota' => 20,
                'course_id' => 1
            ],
            [
                'name' => 'Quinto Contabilidad',
                'observation' => 'Quinto Contabilidad',
                'quota' => 20,
                'course_id' => 2
            ],
            [
                'name' => 'Quinto Administración',
                'observation' => 'Quinto Administración',
                'quota' => 20,
                'course_id' => 3
            ],
            [
                'name' => 'Primero',
                'observation' => 'Primero',
                'quota' => 20,
                'course_id' => 12
            ],
            [
                'name' => 'Primero (nocturno)',
                'observation' => 'Primero (nocturno)',
                'quota' => 20,
                'course_id' => 12
            ],
            [
                'name' => 'Primero (matutino)',
                'observation' => 'Primero (matutino)',
                'quota' => 20,
                'course_id' => 12
            ],
            [
                'name' => 'Primero (vespertino)',
                'observation' => 'Primero (vespertino)',
                'quota' => 20,
                'course_id' => 12
            ],
            [
                'name' => 'Segundo (nocturno)',
                'observation' => 'Segundo (nocturno)',
                'quota' => 20,
                'course_id' => 11
            ],
            [
                'name' => 'Segundo (matutino)',
                'observation' => 'Segundo (matutino)',
                'quota' => 20,
                'course_id' => 11
            ],
            [
                'name' => 'Segundo (vespertino)',
                'observation' => 'Segundo (vespertino)',
                'quota' => 20,
                'course_id' => 11
            ],
        ];

        foreach ($parallels as $course) {
            \App\Models\Parallel::create($course);
        }
    }
}
