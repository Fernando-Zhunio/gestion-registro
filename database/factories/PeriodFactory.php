<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\period>
 */
class PeriodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'observation' => $this->faker->word,
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->date(),
            'promotion' => $this->faker->word,
        ];
    }
}
