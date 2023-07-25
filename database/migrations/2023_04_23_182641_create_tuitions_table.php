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
        Schema::create('tuitions', function (Blueprint $table) {
            $table->id();
            // $table->char('doc_type', 1);
            // $table->string('doc_number');
            $table->char('status', 1);
            $table->char('approved', 0);
            $table->timestamps();
            $table->foreignId('student_id')->constrained('students');
            $table->foreignId('parallel_id')->constrained('parallels');
            $table->foreignId('period_id')->constrained('periods');
            $table->foreignId('course_id')->constrained('courses');
            $table->unique(['student_id', 'period_id', 'course_id', 'parallel_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tuitions');
    }
};
