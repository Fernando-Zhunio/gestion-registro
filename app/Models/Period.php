<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Period extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'start_date',
        'end_date',
        'promotion',
    ];

    public function schedules()
    {
        return $this->hasMany('App\Models\schedule');
    }
}
