<?php

namespace Database\Factories;

use App\Models\Representative;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => $this->faker->name,
            'last_name' => $this->faker->name,
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
            'doc_type' => $this->faker->randomElement([1, 2,3]),
            'doc_number' => strval($this->faker->numberBetween(1000000000, 9999999999)),
            'birthday' => $this->faker->date(),
            'gender' => $this->faker->randomElement([1, 2]),
            'photo' => $this->faker->imageUrl(50, 50),
            'previous_institution' => $this->faker->text,
            'illness_or_disability' => $this->faker->text,
            'representative_id' => Representative::factory()->create()->id,
            'user_id' => User::factory()->create()->id,
        ];
    }
}
