<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\tuition>
 */
class TuitionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'status' => $this->faker->randomElement([1, 2, 3]),
            'approved' => strval($this->faker->randomElement([0, 1])),
            'student_id' => Student::factory()->create()->id,
            'course_id' => $this->faker->randomFloat(0, 1, 10),
            'period_id' => 1,
            'parallel_id' => $this->faker->randomFloat(0, 1, 10),
        ];
    }
}
