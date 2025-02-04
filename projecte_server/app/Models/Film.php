<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Film extends Model
{
    protected $guarded = [];
    //
    public function director(): BelongsTo
    {
        return $this->belongsTo(Director::class);
    }

    protected $casts = [
        'dataP' => 'datetime:d-m-Y'
    ];
}
