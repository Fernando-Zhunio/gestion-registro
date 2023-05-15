<?php
namespace App\Const;

class ConstRoles {
    public const ADMIN = 'admin';
    public const STUDENT = 'student';
    public const TEACHER = 'teacher';

    public static function getRoles() {
        return [
            self::ADMIN,
            self::STUDENT,
            self::TEACHER
        ];
    }
}