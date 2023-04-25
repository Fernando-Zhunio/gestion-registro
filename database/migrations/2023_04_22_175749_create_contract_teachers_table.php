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
            // $table->foreignId('teacher_id')->constrained();
            $table->foreignId('period_id')->constrained();
            $table->string('contract_number');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('contract_file');
            $table->string('contract_state');
            $table->string('contract_type');
            $table->string('salary');
            $table->timestamps();
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
