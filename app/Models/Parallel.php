<?php

namespace App\Models;

use App\Traits\Search;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parallel extends Model
{
    use HasFactory, Search;

    protected $fillable = [
        'name',
        'description',
        'quota',
        'registered',
        'course_id',
    ];

}
