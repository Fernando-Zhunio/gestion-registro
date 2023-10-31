<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'observation',
        'value',
        'input_note_id',
        'subject_id',
        'user_id',
        'student_id',
        'period_id'
    ];

    public function subject()
    {
        return $this->belongsTo('App\Models\Subject');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function student()
    {
        return $this->belongsTo('App\Models\Student');
    }

    public function period()
    {
        return $this->belongsTo('App\Models\Period');
    }

    public function inputNote() {
        return $this->belongsTo(InputNote::class);
    }
}
