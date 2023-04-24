<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

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
        'previous_institution',
        'illness_or_disability',
        'course_id',
        'representative_id'
    ];

    public function course()
    {
        return $this->belongsTo('App\Models\course');
    }

    public function representative()
    {
        return $this->belongsTo('App\Models\representative');
    }
}
