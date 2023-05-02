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
        Schema::create('contract_teachers', function (Blueprint $table) {
            $table->id();
            $table->string('observation')->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->string('contract_file')->nullable();
            $table->string('contract_state')->nullable();
            $table->string('contract_type');
            $table->string('salary')->nullable();
            $table->foreignId('teacher_id')->constrained();
            $table->foreignId('period_id')->constrained();
            $table->timestamps();
            $table->unique(['period_id', 'teacher_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contract_teachers');
    }
};
