<?php

namespace Database\Factories;

use App\Models\Period;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ManagerNote>
 */
class ManagerNoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'notes' => [['name' => 'Examen', 'value' => 50], ['name' => 'aporte', 'value' => 25 ], ['name' => 'Lecciones', 'value' => 25]], 
            'partial' => 1, 
            'period_id' => Period::all()->random()->id
        ];
    }
}
