<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class parallel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'quota',
        'registered',
        'course_id',
    ];

    public function course()
    {
        return $this->belongsTo('App\Models\course');
    }
}
