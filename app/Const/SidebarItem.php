<?php

namespace App\Const;

use Illuminate\Support\Collection;

class SidebarItem
{
    private $Items = [
        [
            'path' => '/periods',
            'icon' => 'fas fa-calendar-alt',
            'name' => 'Periodos',
            'forRoles' => ['admin', 'secretary']
        ],
        [
            'path' => '/courses',
            'icon' => 'fas fa-book',
            'name' => 'Cursos',
            'forRoles' => ['admin', 'secretary']
        ],
        [
            'path' => '/subjects',
            'icon' => 'fas fa-book-open',
            'name' => 'Materias',
            'forRoles' => ['admin', 'secretary']
        ],
        [
            'path' => '/parallels',
            'icon' => 'fas fa-users',
            'name' => 'Paralelos',
            'forRoles' => ['admin', 'teacher', 'secretary']
        ],
        [
            'path' => '/representatives',
            'icon' => 'fas fa-user-tie',
            'name' => 'Representantes',
            'forRoles' => ['admin', 'secretary']
        ],
        [
            'path' => '/tuitions',
            'icon' => 'fas fa-money-bill-alt',
            'name' => 'Matriculas',
            'forRoles' => ['admin', 'secretary', 'student']
        ],
        [
            'path' => '/students',
            'icon' => 'fas fa-user-graduate',
            'name' => 'Estudiantes',
            'forRoles' => ['admin', 'teacher']
        ],
        [
            'path' => '/teachers',
            'icon' => 'fas fa-chalkboard-teacher',
            'name' => 'Docentes',
            'forRoles' => ['admin', 'secretary']
        ],
        [
            'path' => '/schedules',
            'icon' => 'fas fa-calendar-alt',
            'name' => 'Horarios',
            'forRoles' => ['admin', 'teacher', 'secretary', 'student']
        ],
        [
            'path' => '/notes',
            'icon' => 'fas fa-clipboard-list',
            'name' => 'Notas',
            'forRoles' => ['admin', 'teacher', 'student']
        ],
        [
            'path' => '/academic',
            'icon' => 'fas fa-user-graduate',
            'name' => 'Académico',
            'forRoles' => ['admin', 'secretary']
        ],
       
    ];

    // public static function getAllItems()
    // {
    //     return (new self)->Items;
    // }

    public static function getItemsByRole()
    {
        $items = (new self)->Items;
        $itemsForRole = [];
        /**
         * @var \App\Models\User $user
         */
        $user = auth()->user();
        // $sidebar = [];
        if($user->hasRole('super-admin')) {
            return (new self)->Items;
        } 
        foreach ($items as $item) {
            if ($user->hasAnyRole($item['forRoles'])) {
                $itemsForRole[] = $item;
            }
        }

        return $itemsForRole;
    }
}
