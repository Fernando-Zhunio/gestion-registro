<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'description' => $this->faker->text,
            'nivel' => $this->faker->randomNumber(2),
            'journey' => $this->faker->randomElement(['M', 'T', 'N']),
            'specialty_id' => $this->faker->randomNumber(2),
        ];
    }
}
