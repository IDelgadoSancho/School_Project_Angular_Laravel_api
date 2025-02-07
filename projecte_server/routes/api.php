<?php

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

//--Film

Route::get('/films', [ApiController::class, 'getFilm']);

Route::get('/films/{id}', [ApiController::class, 'getFilmId']);

Route::post('/film', [ApiController::class, 'createFilm']);

Route::put('/film/{id}', [ApiController::class, 'updateFilm']);

Route::delete('/film/{id}', [ApiController::class, 'deleteFilm']);

//--Director

Route::get('/directors', [ApiController::class, 'getDirector']);

Route::get('/directors/{id}', [ApiController::class, 'getDirectorId']);

Route::post('/director', [ApiController::class, 'createDirector']);

Route::post('/director/{id}', [ApiController::class, 'updateDirector']);

Route::delete('/director/{id}', [ApiController::class, 'deleteDirector']);

//--Imatge

Route::get('/image/{id_director}', [ApiController::class, 'getImatge']);
