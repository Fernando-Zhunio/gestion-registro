<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $courses = [
            [
                'id' => 1,
                'name' => 'Sexto Informática',
                'description' => 'Sexto Informática',
                'nivel' => '6-i',
                'specialty_id' => 1,
            ],
            [
                'id' => 2,
                'name' => 'Sexto Contabilidad',
                'description' => 'Sexto Contabilidad',
                'nivel' => '6-c',
                'specialty_id' => 2,
            ],
            [
                'id' => 3,
                'name' => 'Sexto Administración',
                'description' => 'Sexto Administración',
                'nivel' => '6-a',
                'specialty_id' => 3,
            ],
            [
                'id' => 4,
                'name' => 'Quinto Informática',
                'description' => 'Quinto Informática',
                'nivel' => '5-i',
                'specialty_id' => 1,
                'next_course_id' => 1,
            ],
            [
                'id' => 5,
                'name' => 'Quinto Contabilidad',
                'description' => 'Quinto Contabilidad',
                'nivel' => '5-c',
                'next_course_id' => 2, 
                'specialty_id' => 2,
            ],
            [
                'id' => 6,
                'name' => 'Quinto Administración',
                'description' => 'Quinto Administración',
                'nivel' => '5-a',
                'next_course_id' => 3, 
                'specialty_id' => 3,
            ],
            [
                'id' => 7,
                'name' => 'Cuarto Informática',
                'description' => 'Cuarto Informática',
                'nivel' => '4-i',
                'next_course_id' => 4, 
                'specialty_id' => 1,
            ],
            [
                'id' => 8,
                'name' => 'Cuarto Contabilidad',
                'description' => 'Cuarto Contabilidad',
                'nivel' => '4-c',
                'next_course_id' => 5,
                'specialty_id' => 2,
            ],
            [
                'id' => 9,
                'name' => 'Cuarto Administración',
                'description' => 'Cuarto Administración',
                'nivel' => '4-a',
                'next_course_id' => 6,
                'specialty_id' => 3,
            ],
            [
                'id' => 10,
                'name' => 'Tercero',
                'description' => 'Tercero',
                'nivel' => '3',
                'next_course_id' => 7,
            ],
            [
                'id' => 11,
                'name' => 'Segundo',
                'description' => 'Segundo',
                'nivel' => '2',
                'next_course_id' => 10,
            ],
            [
                'id' => 12,
                'name' => 'Primero',
                'description' => 'Primero',
                'nivel' => '1',
                'next_course_id' => 11,
            ]
        ];

        foreach ($courses as $course) {
            \App\Models\Course::create($course);
        }
    }
}
