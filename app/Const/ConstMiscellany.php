<?php
namespace App\Const;
class ConstMiscellany {
    public const MALE = '1';
    public const FEMALE = '2';
    public const CI = '1';
    public const PASSPORT = '2';
    public const FOREIGNER_ID = '3';

    public static function getGenders() {
        return [
            self::MALE,
            self::FEMALE
        ];
    } 

    // public static function findGenderDb($gender) {
    //     $genders = [
    //         self::MALE => 1,
    //         self::FEMALE => 2
    //     ];
    //     return $genders[$gender] ?? null;
        
    // }

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