<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Director extends Model
{
    protected $guarded = [];

    public function get_name($id)
    {
        $director = Director::find($id);
        return $director->name . " " . $director->surname;
    }
}
