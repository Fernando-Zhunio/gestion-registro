<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subjects = [
            [
                'id' => 1,
                'name' => 'Matemáticas',
                'observation' => 'Matemáticas',
                'course_id' => 1,
            ],
            [
                'id' => 2,
                'name' => 'Lengua',
                'observation' => 'Lengua',
                'course_id' => 1,
            ],
            [
                'id' => 3,
                'name' => 'Ingles',
                'observation' => 'Ingles',
                'course_id' => 1,
            ],
            [
                'id' => 4,
                'name' => 'Física',
                'observation' => 'Fisica',
                'course_id' => 1,
            ],
            [
                'id' => 5,
                'name' => 'Química',
                'observation' => 'Química',
                'course_id' => 1,
            ],
            [
                'id' => 6,
                'name' => 'Historia',
                'observation' => 'Historia',
                'course_id' => 1,
            ],
            [
                'id' => 7,
                'name' => 'Geografía',
                'observation' => 'Geografía',
                'course_id' => 2,
            ],
            [
                'id' => 8,
                'name' => 'Español',
                'observation' => 'Español',
                'course_id' => 2,
            ],
            [
                'id' => 9,
                'name' => 'Ingles 2',
                'observation' => 'Ingles 2',
                'course_id' => 3,
            ],
        ];

        foreach ($subjects as $subject) {
            \App\Models\Subject::create($subject);
        }
    }
}
