<?php

namespace App\Models;

use App\Traits\Search;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use Search, HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
        'doc_type',
        'doc_number',
        'birthday',
        'gender',
        'photo',
        'previous_institution',
        'illness_or_disability',
        'course_id',
        'representative_id',
        'user_id'
    ];

    public function course()
    {
        return $this->belongsTo('App\Models\course');
    }

    // public function nextCourse()
    // {
    //     return $this->hasManyThrough('App\Models\Course', 'App\Models\Course', 'id', 'next_course_id');
    // }

    public function representative()
    {
        return $this->belongsTo('App\Models\representative');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function tuitions()
    {
        return $this->hasMany('App\Models\Tuition');
    }
}
