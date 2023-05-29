<?php

namespace Database\Seeders;

use App\Models\Specialty;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SpecialtySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // \App\Models\Specialty::factory(10)->create();
        $specialty = [
            [
                'id' => 1,
                'name' => 'Informática',
                'description' => 'Enseña a los estudiantes a programar'
            ],
            [
                'id' => 2, // 'id' => '2
                'name' => 'Contabilidad',
                'description' => 'Enseña a los estudiantes a llevar la contabilidad de una empresa'
            ],
            [
                'id' => 3,
                'name' => 'Administración',
                'description' => 'Enseña a los estudiantes a administrar una empresa'
            ]
        ];

        Specialty::insert($specialty);
    }
}
