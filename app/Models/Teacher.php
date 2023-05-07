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
        'working_day',
        'period_id',
    ];

    public function schedules()
    {
        return $this->hasMany('App\Models\schedule');
    }

    public function contractsTeacher()
    {
        return $this->hasMany('App\Models\ContractTeacher');
    }

    public function Period()
    {
        return $this->belongsTo('App\Models\Period');
    }

    public function scopeSearch($query, $search) {
        if(!empty($search)) {
            $query->where([
                ['first_name', 'like', '%'.$search.'%'],
                ['last_last', 'like', '%'.$search.'%'],
            ]);
        }
        return $query;
    }
}

