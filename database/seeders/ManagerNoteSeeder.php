<?php

namespace Database\Seeders;

use App\Models\ManagerNote;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ManagerNoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ManagerNote::factory()->count(10)->create();
    }
}
