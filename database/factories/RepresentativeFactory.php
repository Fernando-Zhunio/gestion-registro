<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\representative>
 */
class RepresentativeFactory extends Factory
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
            'email' => $this->faker->email,
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
            'doc_type' => $this->faker->randomElement([1, 2,3]),
            'doc_number' => strval($this->faker->numberBetween(1000000000, 9999999999),),
            'occupation' => $this->faker->text,
            'gender' => $this->faker->randomElement([1, 2]),
        ];
    }
}
