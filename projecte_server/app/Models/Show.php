<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Show extends Model
{
    public function directors()
    {
        return $this->belongsToMany(Director::class, 'director_show');
    }
}
