<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
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
        'academic_title',
        'working_day'
    ];

    public function schedules()
    {
        return $this->hasMany('App\Models\schedule');
    }
}
