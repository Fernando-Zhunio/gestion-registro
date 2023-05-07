<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContractTeacher extends Model
{
    use HasFactory;
    protected $fillable = [
        'observation',
        'start_date',
        'end_date',
        'contract_file',
        'contract_state',
        'contract_type',
        'salary',
        'period_id',
        'teacher_id',
    ];

    public function teacher()
    {
        return $this->belongsTo('App\Models\Teacher');
    }

    public function Period()
    {
        return $this->belongsTo('App\Models\Period');
    }
}
