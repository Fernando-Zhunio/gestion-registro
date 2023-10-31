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
        Schema::create('manager_notes', function (Blueprint $table) {
            $table->id();
            $table->integer('partial');
            $table->boolean('is_active')->default(false);
            $table->foreignId('period_id')->constrained('periods');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('manager_notes');
    }
};
