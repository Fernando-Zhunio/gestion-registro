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
        Schema::create('notes', function (Blueprint $table) {
            $table->id();
            // $table->float('partial');
            // $table->float('quimester');
            // $table->float('lesson');
            // $table->float('task');
            // $table->float('evaluation');
            // $table->float('exam');
            // $table->char('status');
            // $table->integer('trimester')->default(1)->min(1)->max(3);
            $table->float('value')->default(0)->min(0)->max(9);
            // $table->float('partial_trimester_2')->default(0)->min(0)->max(9);
            // $table->float('partial_trimester_3')->default(0)->min(0)->max(9);
            // $table->float('integrating_project_1')->default(0)->min(0)->max(0.5);
            // $table->float('integrating_project_2')->default(0)->min(0)->max(0.5);
            // $table->float('integrating_project_3')->default(0)->min(0)->max(0.5);
            // $table->float('evaluation_mechanism_1')->default(0)->min(0)->max(0.5);
            // $table->float('evaluation_mechanism_2')->default(0)->min(0)->max(0.5);
            // $table->float('evaluation_mechanism_3')->default(0)->min(0)->max(0.5);
            // $table->float('project_final')->default(0)->min(0)->max(1);
            $table->string('observation')->nullable();
            $table->foreignId('input_note_id')->constrained('input_notes')->onDelete('cascade');
            $table->foreignId('subject_id')->constrained('subjects');
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('student_id')->constrained('students');
            $table->foreignId('period_id')->constrained('periods');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
