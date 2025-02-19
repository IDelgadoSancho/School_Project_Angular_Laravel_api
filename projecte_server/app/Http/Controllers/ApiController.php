<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Film;
use App\Models\Director;
use App\Models\Show;


class ApiController extends Controller
{

    //------------------------film--------------------------------------

    function getFilms()
    {
        $films = Film::with('director')->get();
        foreach ($films as $film) {
            $film->image = url("/api/imagefilm/{$film->id}");
        }
        return $films;
    }

    function getFilmId($id)
    {
        return Film::find($id);
    }

    function updateFilm(Request $request, $id)
    {
        $film = film::find($id);

        if (isset($request->title))
            $film->title = $request->title;
        if (isset($request->dataP))
            $film->dataP = $request->dataP;
        if (isset($request->duration))
            $film->duration = $request->duration;
        if (isset($request->director_id))
            $film->director_id = $request->director_id;


        // imagen
        if ($request->file('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $id = uniqid();
            $filename = $film->title . "_" . $id . "." . $extension;
            $file->move(public_path(env('IMG_ROUTE')), $filename);
            $film->image = $filename;
        }

        $film->save();
        return $film;
    }

    function createFilm(Request $request)
    {
        $film = new film;
        $film->title = $request->title;
        $film->dataP = $request->dataP;
        $film->duration = $request->duration;
        $film->director_id = $request->director_id;

        // imagen
        if ($request->file('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $id = uniqid();
            $filename = $film->title . "_" . $id . "." . $extension;
            $file->move(public_path(env('IMG_ROUTE')), $filename);
            $film->image = $filename;
        }

        $film->save();
        return $film;
    }

    function deleteFilm($id)
    {
        $film = Film::find($id);
        $film->delete();
        return $film;
    }

    //image-film
    function getImageFilm($id_film)
    {
        $film = Film::find($id_film);
        $headers = ['Content-Type' => 'image/jpeg'];
        $path = public_path(path: env('IMG_ROUTE') . $film->image);
        return response()->file($path, $headers);
    }

    // -------------------------------------director-----------------------------------------

    function getDirector()
    {
        $directors = director::all();
        foreach ($directors as $director) {
            $director->image = url("/api/imagedir/{$director->id}");
        }
        return $directors;
    }

    //image-dir
    function getImageDir($id_director)
    {
        $director = director::find($id_director);
        $headers = ['Content-Type' => 'image/jpeg'];
        $path = public_path(path: env('IMG_ROUTE') . $director->image);
        return response()->file($path, $headers);
    }

    function getDirectorId($id)
    {
        return director::find($id);
    }

    function createDirector(Request $request)
    {
        $director = new director;
        $director->name = $request->name;
        $director->surname = $request->surname;

        // imagen
        if ($request->file('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $id = uniqid();
            $filename = $director->name . "_" . $director->surname . $id . "." . $extension;
            $file->move(public_path(env('IMG_ROUTE')), $filename);
            $director->image = $filename;
        }

        $director->save();
        return $director;
    }

    function updateDirector(Request $request, $id)
    {
        $director = director::find($id);

        if (isset($request->name))
            $director->name = $request->name;
        if (isset($request->surname))
            $director->surname = $request->surname;

        // imagen
        if ($request->file('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $id = uniqid();
            $filename = $director->name . "_" . $director->surname . $id . "." . $extension;
            $file->move(public_path(env('IMG_ROUTE')), $filename);
            $director->image = $filename;
        }

        $director->save();
        return $director;
    }

    function deleteDirector($id)
    {
        $director = director::find($id);
        $director->delete();

        return $director;
    }

    // -------------------------------------shows-----------------------------------------

    function getShows()
    {
        // Obtener todas las series con sus directores
        $shows = Show::with('directors')->get();

        foreach ($shows as $show) {
            $show->image = url("/api/imageshow/{$show->id}");
        }
        return $shows;
    }

    function getShowId($id)
    {
        return Show::find($id);
    }

    function updateShow(Request $request, $id)
    {
        $show = Show::find($id);
        if (isset($request->title))
            $show->title = $request->title;
        if (isset($request->dataP))
            $show->dataP = $request->dataP;
        if (isset($request->seasons))
            $show->seasons = $request->seasons;

        // imagen
        if ($request->file('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $id = uniqid();
            $filename = $show->title . "_" . $id . "." . $extension;
            $file->move(public_path(env('IMG_ROUTE')), $filename);
            $show->image = $filename;
        }

        $show->save();

        $directors = json_decode($request->input('directors'), true);

        // $directorIds = $request->input('directors'); // Array de IDs de directores
        $show->directors()->sync($directors);

        return $show;

    }

    function createShow(Request $request)
    {
        $show = new show;
        $show->title = $request->title;
        $show->dataP = $request->dataP;
        $show->seasons = $request->seasons;
        $show->image = $request->image;

        // imagen
        if ($request->file('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $id = uniqid();
            $filename = $show->title . "_" . $id . "." . $extension;
            $file->move(public_path(env('IMG_ROUTE')), $filename);
            $show->image = $filename;
        }

        $show->save();
        // $directorIds = $request->input('directors'); // Array de IDs de directores
        $directors = json_decode($request->input('directors'), true);

        $show->directors()->attach($directors);

        return $show;
    }

    function deleteShow($id)
    {
        $show = Show::find($id);
        $show->delete();
        return $show;
    }

    //image-show
    function getImageShow($id_show)
    {
        $show = Show::find($id_show);
        $headers = ['Content-Type' => 'image/jpeg'];
        $path = public_path(path: env('IMG_ROUTE') . $show->image);
        return response()->file($path, $headers);
    }

}