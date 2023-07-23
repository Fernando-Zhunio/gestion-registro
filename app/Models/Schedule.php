<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'observation',
        'status',
        'day',
        'start_time',
        'end_time',
        'subject_id',
        'parallel_id',
        'period_id',
        'teacher_id'
    ];

    protected $cast = [
        'start_time' => 'time:H:i',
        'end_time' => 'time:H:i'
    ];

    public function getStartTimeAttribute($value)
    {
        return date('H:i', strtotime($value));
    }

    public function getEndTimeAttribute($value)
    {
        return date('H:i', strtotime($value));
    }

    public function subject()
    {
        return $this->belongsTo('App\Models\subject');
    }

    public function parallel()
    {
        return $this->belongsTo('App\Models\parallel');
    }

    public function period()
    {
        return $this->belongsTo('App\Models\period');
    }

    public function teacher()
    {
        return $this->belongsTo('App\Models\teacher');
    }

    
}
