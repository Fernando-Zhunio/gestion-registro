<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CurrentState extends Model
{
    use HasFactory;

    protected $fillable = [
        'observation',
        'name_institution',
        'mission',
        'vision',
        'number_students',
        'number_teachers',
        'period_id',
    ];
}
