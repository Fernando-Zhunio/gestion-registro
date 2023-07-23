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
        'observation',
        'quota',
        'course_id',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }

    // public function scopeStudentByPeriodCount($query, $periodId)
    // {
    //     return $query->withCount('students')->whereHas('students.tuitions', function ($query) use ($periodId) {
    //         $query->where('period_id', $periodId);
    //     });
    // }

}
