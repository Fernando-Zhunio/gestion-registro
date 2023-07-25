<?php

namespace Database\Factories;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\teacher>
 */
class TeacherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->email(),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'doc_type' => $this->faker->randomElement([1, 2,3]),
            'doc_number' => strval($this->faker->numberBetween(1000000000, 9999999999)),
            'birthday' => $this->faker->date(),
            'academic_title' => $this->faker->jobTitle(),
            'working_day' => $this->faker->date(),
            'observation' => $this->faker->text(),
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->date(),
            'contract_file' => null,
            'contract_state' => 1,
            'salary' => 200,
            'period_id' => 1,
            'user_id' => User::factory()->create()->id,
        ];
    }

    // public function configure()
    // {
    //     $user = User::factory()->create();
    //     return $this->afterCreating(function (Teacher $teacher) use ($user) {
    //         $teacher->user_id = $user->id;
    //         $teacher->save();
    //     });
    // }
}
