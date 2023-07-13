<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'partial_trimester_1',
        'partial_trimester_2',
        'partial_trimester_3',
        'integrating_project_1',
        'integrating_project_2',
        'integrating_project_3',
        'evaluation_mechanism_1',
        'evaluation_mechanism_2',
        'evaluation_mechanism_3',
        'project_final',
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
