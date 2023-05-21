<?php
namespace App\Const;
class ConstMiscellany {
    public const MALE = 'male';
    public const FEMALE = 'female';
    public const CI = 'CI';
    public const PASSPORT = 'passport';
    public const FOREIGNER_ID = 'foreigner_id';

    public static function getGenders() {
        return [
            self::MALE,
            self::FEMALE
        ];
    }

    public static function getDocTypes() {
        return [
            self::CI,
            self::PASSPORT,
            self::FOREIGNER_ID
        ];
    }

    public static function getGendersSelect() {
        return [
           ['value' => self::MALE, 'label' => 'Masculino'],
           ['value' => self::FEMALE, 'label' => 'Femenino']
        ];
    }

    public static function getDocTypesSelect() {
        return [
           ['value' => self::CI, 'label' => 'Cédula de identidad'],
           ['value' => self::PASSPORT, 'label' => 'Pasaporte'],
           ['value' => self::FOREIGNER_ID, 'label' => 'Carnet de extranjería']
        ];
    }
}