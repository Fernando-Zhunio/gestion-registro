<?php

namespace App\Models;

use App\Traits\Search;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory, Search;


    protected $fillable = [
        'name',
        'observation',
        // 'nivel',
        // 'hours',
        'status',
        'course_id'
    ];

    public function course()
    {
        return $this->belongsTo('App\Models\Course');
    }

    public function schedules()
    {
        return $this->hasMany('App\Models\Schedule');
    }
}
