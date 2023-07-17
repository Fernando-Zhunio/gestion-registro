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
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('address');
            $table->char('doc_type', 1);
            $table->string('doc_number')->unique();
            $table->date('birthday');
            $table->string('academic_title');
            $table->string('working_day');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->string('contract_file')->nullable();
            $table->boolean('contract_state')->nullable();
            $table->float('salary')->nullable();
            $table->string('observation', 1000)->nullable();
            $table->foreignId('period_id')->constrained('periods');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
