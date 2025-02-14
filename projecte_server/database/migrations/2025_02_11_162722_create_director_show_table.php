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
        Schema::create('director_show', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('director_id');
            $table->unsignedBigInteger('show_id');

            $table->foreign('director_id')->references('id')->on('directors')->onDelete('cascade');
            $table->foreign('show_id')->references('id')->on('shows')->onDelete('cascade');
            $table->primary(['director_id', 'show_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('director_show');
    }
};
