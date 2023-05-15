<?php

namespace App\Builders;

use App\Const\ConstRoles;

class BuilderForRoles
{
    public static function BuilderSearchClass($class, $column = null, $moreColumns = [])
    {
        $builder =  $class::query();
        return self::constructionBuilder($builder, $column, $moreColumns);
    }

    public static function PaginateSearch($builder, $column = null, $moreColumns = [])
    {
        return self::constructionBuilder($builder, $column, $moreColumns);
    }

    private static function constructionBuilder($builder, $column = null, $moreColumns = []) {
        $search = request()->search ?? '';
        $pageSize = request()->pageSize ?? 10;
        $roles = auth()->user()->getRoleNames();
        if ($roles->contains(function ($value) {
            return $value == ConstRoles::STUDENT || $value == ConstRoles::TEACHER;
        })) {
            return $builder->where('period_id', currentState()->period_id);
        }
        if ($column) {
             $builder->search($search, $column, $moreColumns);
        }
        return $builder->paginate($pageSize);
    }
}
