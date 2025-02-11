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
        return Film::with('director')->get();
    }

    function getFilmId($id)
    {
        return Film::find($id);
    }

    function updateFilm(Request $request, $id)
    {
        $film = Film::find($id);
        $film->update($request->all());
        return $film;
    }

    function createFilm(Request $request)
    {
        return Film::create($request->all());
    }

    function deleteFilm($id)
    {
        $film = Film::find($id);
        $film->delete();
        return $film;
    }

    // -------------------------------------director-----------------------------------------

    function getDirector()
    {
        $directors = director::all();
        foreach ($directors as $director) {
            $director->image = url("/api/image/{$director->id}");
        }
        return $directors;
    }

    function getImage($id_director)
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
        return Show::with('directors')->get();
    }

    function getShowId($id)
    {
        return Film::find($id);
    }

    function updateShow(Request $request, $id)
    {
        $show = Show::find($id);
        $show->update($request->all());
        return $show;
    }

    function createShow(Request $request)
    {
        return Show::create($request->all());
    }

    function deleteShow($id)
    {
        $show = Show::find($id);
        $show->delete();
        return $show;
    }

}