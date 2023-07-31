<?php

namespace App\Models;

use App\Traits\Search;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use Search, HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'address',
        'doc_type',
        'doc_number',
        'birthday',
        'gender',
        'photo',
        'previous_institution',
        'illness_or_disability',
        // 'course_id',
        'representative_id',
        'user_id',
        // 'parallel_id',
    ];

    // public function course()
    // {
    //     return $this->belongsTo('App\Models\Course');
    // }

    public function representative()
    {
        return $this->belongsTo('App\Models\Representative');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function tuitions()
    {
        return $this->hasMany('App\Models\Tuition');
    }

    // public function parallel()
    // {
    //     return $this->belongsTo('App\Models\parallel');
    // }

    public function notes() {
        return $this->hasMany('App\Models\Note');
    }

    public function currentNotes() {
        return $this->notes()->where('period_id', currentState()->period_id);
    } 
}
