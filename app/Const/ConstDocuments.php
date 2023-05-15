<?php
namespace App\Const;
class ConstDocuments {
    public const CI = 'CI';
    public const PASSPORT = 'passport';
    public const FOREIGNER_ID = 'foreigner_id';

    public static function getDocuments() {
        return [
            self::CI,
            self::PASSPORT,
            self::FOREIGNER_ID
        ];
    }
}