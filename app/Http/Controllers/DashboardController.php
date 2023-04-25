<?php

namespace App\Http\Controllers;

use App\Models\course;
use App\Http\Requests\StorecourseRequest;
use App\Http\Requests\UpdatecourseRequest;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\tuition;
use Inertia\Inertia;

class DashboardController extends Controller
{ 
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $countTeacher = Teacher::count();
        
        $countStudent = Tuition::;
        return Inertia::render('Dashboard', [
            'countTeacher' => $countTeacher,
            'countStudent' => $countStudent
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorecourseRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(course $course)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatecourseRequest $request, course $course)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(course $course)
    {
        //
    }
}
