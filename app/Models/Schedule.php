<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'status',
        'day',
        'start_time',
        'end_time',
        'subject_id',
        'parallel_id',
        'period_id',
        'teacher_id'
    ];

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
