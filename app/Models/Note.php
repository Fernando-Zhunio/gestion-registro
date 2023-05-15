<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'partial',
        'quimester',
        'lesson',
        'task',
        'evaluation',
        'exam',
        'status',
        'observation',
        'subject_id',
        'teacher_id',
        'student_id',
        'period_id'
    ];

    public function subject()
    {
        return $this->belongsTo('App\Models\subject');
    }

    public function teacher()
    {
        return $this->belongsTo('App\Models\teacher');
    }

    public function student()
    {
        return $this->belongsTo('App\Models\student');
    }

    public function period()
    {
        return $this->belongsTo('App\Models\period');
    }
}
