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
            $table->string('description');
            $table->string('nivel');
            $table->char('journey', 1)->default('M');
            $table->timestamps();
            $table->foreignId('specialty_id')->constrained('specialties');
            $table->unique(['nivel', 'specialty_id', 'journey']);
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
