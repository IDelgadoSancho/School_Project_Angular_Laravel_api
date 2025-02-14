<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Show extends Model
{
    protected $guarded = [];

    public function directors()
    {
        return $this->belongsToMany(Director::class, 'director_show');
    }
}
