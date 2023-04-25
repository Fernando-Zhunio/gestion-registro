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
        Schema::create('current_states', function (Blueprint $table) {
            $table->id();
            $table->string('observation');
            $table->string('name_institution');
            $table->string('mission', 2000);
            $table->string('vision', 2000);
            $table->integer('number_students')->default(0);
            $table->integer('number_teachers')->default(0);
            $table->foreignId('period_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('current_states');
    }
};
