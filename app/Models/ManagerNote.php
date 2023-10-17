<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManagerNote extends Model
{
    protected $fillable = ['notes', 'interval_month', 'period_id'];
    use HasFactory;
}
