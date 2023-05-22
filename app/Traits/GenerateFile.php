<?php
namespace App\Traits;

trait GenerateFile {
    public function generateFile($file, $path='img/students', $name = null, $extension = null) {
        $name = $name ?? time();
        $extension = $extension ?? $file->getClientOriginalExtension();
        $file->move($path, $name.'.'.$extension);
        return $path.'/'.$name.'.'.$extension;
    }
}