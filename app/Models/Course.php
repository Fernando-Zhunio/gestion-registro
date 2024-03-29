<?php

namespace App\Models;

use App\Traits\Search;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use Search, HasFactory;

    protected $fillable = [
        'id',
        'name',
        'description',
        'nivel',
        'status',
        'next_course_id',
        'specialty_id',
    ];

    // protected static function getJourneys()
    // {
    //     return [
    //        ['label'=> 'Matutino', 'value'=> 'Matutino'],
    //        ['label'=> 'Vespertino', 'value'=> 'Vespertino'],
    //        ['label'=> 'Nocturno', 'value'=> 'Nocturno'],
    //        ['label'=> 'Sabatino', 'value'=> 'Sabatino'],
    //     ];
    // }

    public function subjects()
    {
        return $this->hasMany('App\Models\Subject');
    }

    public function parallels()
    {
        return $this->hasMany('App\Models\Parallel');
    }

    public function students()
    {
        return $this->hasMany('App\Models\Student');
    }

    public function specialty()
    {
        return $this->belongsTo('App\Models\Specialty');
    }
}
