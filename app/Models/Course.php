<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'nivel'
    ];

    public function subjects()
    {
        return $this->hasMany('App\Models\subject');
    }

    public function parallels()
    {
        return $this->hasMany('App\Models\parallel');
    }

    public function students()
    {
        return $this->hasMany('App\Models\student');
    }

    public function specialty()
    {
        return $this->belongsTo('App\Models\specialty');
    }
}
