<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InputNote extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'value', 'manager_note_id'];

    public function managerNote() {
        return $this->belongsTo(ManagerNote::class);
    }
}
