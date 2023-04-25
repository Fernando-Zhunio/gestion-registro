<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\current_state>
 */
class CurrentStateFactory extends Factory
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
            'name_institution' => $this->faker->word,
            'mission' => $this->faker->word,
            'vision' => $this->faker->word,
            'period_id' => \App\Models\Period::factory(),
        ];
    }
}
