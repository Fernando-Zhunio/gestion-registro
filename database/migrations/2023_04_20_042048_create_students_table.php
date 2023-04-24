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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('address');
            $table->char('doc_type', 1);
            $table->string('doc_number')->unique();
            $table->date('birthday');
            $table->char('gender', 1);
            $table->string('previous_institution');
            $table->string('illness_or_disability');
            $table->foreignId('course_id')->constrained('courses');
            $table->foreignId('representative_id')->constrained();
            $table->foreignId('user_id')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
