<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class subject extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'description',
        'nivel',
        'hours',
        'status',
        'course_id'
    ];

    public function course()
    {
        return $this->belongsTo('App\Models\course');
    }

    public function schedules()
    {
        return $this->hasMany('App\Models\schedule');
    }
}
