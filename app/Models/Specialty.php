<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Specialty extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'description'
    ];

    public function courses()
    {
        return $this->hasMany('App\Models\course');
    }
}
