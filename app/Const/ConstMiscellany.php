<?php
namespace App\Const;
class ConstMiscellany {
    public const MALE = 'male';
    public const FEMALE = 'female';

    public static function getGenders() {
        return [
            self::MALE,
            self::FEMALE
        ];
    }

    public static function getGendersSelect() {
        return [
           ['value' => self::MALE, 'label' => 'Masculino'],
           ['value' => self::FEMALE, 'label' => 'Femenino']
        ];
    }
}