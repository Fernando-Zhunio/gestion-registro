<?php

namespace App\Models;

use App\Traits\Search;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory, Search;

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
        'observation',
        'start_date',
        'end_date',
        'contract_file',
        'contract_state',
        'salary',
        'period_id',
        'user_id',
    ];

    public static $DOC_TYPES = [
        'CI' => '1',
        'PASSPORT' => '2',
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

    public function User()
    {
        return $this->belongsTo('App\Models\User');
    }

}

