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
        Schema::table('films', function (Blueprint $table) {
            //
            $table->char('title', length: 50);
            $table->date('dataP');
            $table->integer('duration');
            $table->unsignedBigInteger('director_id');

            /** foreig key */
            $table->foreign('director_id')  
            ->references('id')
            ->on('directors')               
            ->restrictOnUpdate()
            ->restrictOnDelete()
            ->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('films', function (Blueprint $table) {
            //
        });
    }
};
