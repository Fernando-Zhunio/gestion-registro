<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('nivel');
            $table->boolean('status')->default(true);
            $table->timestamps();
            $table->foreignId('next_course_id')->nullable()->constrained('courses');
            $table->foreignId('specialty_id')->nullable()->constrained('specialties');
            $table->unique(['nivel', 'specialty_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
