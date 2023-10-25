<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManagerNote extends Model
{
    protected $fillable = ['partial', 'period_id'];
    use HasFactory;

    public function period() {
        return $this->belongsTo(Period::class);
    }

    public function inputNotes() {
        return $this->hasMany(InputNote::class);
    }
}
