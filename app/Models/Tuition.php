<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tuition extends Model
{
    use HasFactory;

    protected $fillable = [
        // 'doc_type',
        // 'doc_number',
        'status',
        'approved',
        'student_id',
        'course_id',
        'period_id',
    ];

    public function student()
    {
        return $this->belongsTo('App\Models\student');
    }

    public function course()
    {
        return $this->belongsTo('App\Models\course');
    }

    public function period()
    {
        return $this->belongsTo('App\Models\period');
    }

}
