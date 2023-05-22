<?php
namespace App\Traits;
trait Search {
    public function scopeSearch($query, $search, string $column = 'name' , $moreColumns = []) {
        if(!empty($search)) {
            $query->where($column, 'like', '%'.$search.'%');
        }

        if(!empty($moreColumns)) {
            foreach($moreColumns as  $column) {
                $query->orWhere($column, 'like', '%'.($search).'%');
            }
        }
        return $query;
    }
}