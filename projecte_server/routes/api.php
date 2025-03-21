<?php

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

//--Film

Route::get('/films', [ApiController::class, 'getFilms']);

Route::get('/films/{id}', [ApiController::class, 'getFilmId']);

Route::post('/film', [ApiController::class, 'createFilm']);

Route::post('/film/{id}', [ApiController::class, 'updateFilm']);

Route::delete('/film/{id}', [ApiController::class, 'deleteFilm']);

//--Director

Route::get('/directors', [ApiController::class, 'getDirector']);

Route::get('/directors/{id}', [ApiController::class, 'getDirectorId']);

Route::post('/director', [ApiController::class, 'createDirector']);

Route::post('/director/{id}', [ApiController::class, 'updateDirector']);

Route::delete('/director/{id}', [ApiController::class, 'deleteDirector']);

//--Image-directors

Route::get('/imagedir/{id_director}', [ApiController::class, 'getImageDir']);

//--Image-films

Route::get('/imagefilm/{id_film}', [ApiController::class, 'getImageFilm']);

//--Image-show

Route::get('/imageshow/{id_show}', [ApiController::class, 'getImageShow']);

//--Show

Route::get('/shows', [ApiController::class, 'getShows']);

Route::get('/shows/{id}', [ApiController::class, 'getShowId']);

Route::post('/show', [ApiController::class, 'createShow']);

Route::post('/show/{id}', [ApiController::class, 'updateShow']);

Route::delete('/show/{id}', [ApiController::class, 'deleteShow']);