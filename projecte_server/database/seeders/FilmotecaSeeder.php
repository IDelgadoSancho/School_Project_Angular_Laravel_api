<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class FilmotecaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $director_id = DB::table('directors')->insertGetId([
            'name' => Str::random(10),
            'surname' => Str::random(10),
        ]);

        DB::table('films')->insert([
            'title' => Str::random(20),
            'dataP' => Carbon::today(),
            'duration' => mt_rand(15, 300),
            'director_id' => $director_id
        ]);
        
        DB::table('films')->insert([
            'title' => Str::random(10),
            'dataP' => Carbon::today(),
            'duration' => mt_rand(15, 300),
            'director_id' => $director_id
        ]);
    }
}
