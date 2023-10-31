<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManagerNote extends Model
{
    use HasFactory;
    protected $fillable = ['partial', 'period_id', 'is_active'];

    public function period() {
        return $this->belongsTo(Period::class);
    }

    public function inputNotes() {
        return $this->hasMany(InputNote::class);
    }
}
