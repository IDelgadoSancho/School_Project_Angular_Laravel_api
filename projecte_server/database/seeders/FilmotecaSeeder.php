<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;

use App\Models\Director;
use App\Models\Show;
use App\Models\Film;

class FilmotecaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Director::create(['name' => 'Christopher', 'surname' => ' Nolan']);
        Director::create(['name' => 'Quentin ', 'surname' => 'Tarantino']);
        Director::create(['name' => 'Ava ', 'surname' => 'DuVernay']);

        $serie1 = Show::create(['title' => 'Stranger Things', 'dataP' => Carbon::today(), 'seasons' => 1]);
        $serie2 = Show::create(['title' => 'Breaking Bad', 'dataP' => Carbon::today(), 'seasons' => 1]);
        $serie3 = Show::create(['title' => 'The Crown', 'dataP' => Carbon::today(), 'seasons' => 1]);

        // Obtener algunos directores
        $director1 = Director::find(1); // Christopher Nolan
        $director2 = Director::find(2); // Quentin Tarantino

        // Establecer la relación muchos a muchos
        $serie1->directors()->attach([$director1->id, $director2->id]);
        $serie2->directors()->attach($director1->id);
        $serie3->directors()->attach($director2->id);

        Film::create([
            'title' => 'Inception',
            'dataP' => Carbon::today(),
            'duration' => 120,
            'director_id' => $director1->id, // Asignar a Christopher Nolan
        ]);

        Film::create([
            'title' => 'Pulp Fiction',
            'dataP' => Carbon::today(),
            'duration' => 120,
            'director_id' => $director2->id, // Asignar a Quentin Tarantino
        ]);

        Film::create([
            'title' => 'Interstellar',
            'dataP' => Carbon::today(),
            'duration' => 120,
            'director_id' => $director1->id, // Asignar a Christopher Nolan
        ]);
    }
}
