<?php

namespace App\Models;

use App\Traits\Search;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Period extends Model
{
    use HasFactory, Search;

    protected $fillable = [
        'observation',
        'start_date',
        'end_date',
        'promotion',
    ];

    public function schedules()
    {
        return $this->hasMany('App\Models\schedule');
    }

    public function tuitions()
    {
        return $this->hasMany('App\Models\tuition');
    }
}
