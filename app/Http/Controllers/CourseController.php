<?php

namespace App\Http\Controllers;

use App\Builders\BuilderForRoles;
use App\Models\Course;
use App\Http\Requests\StorecourseRequest;
use App\Http\Requests\UpdatecourseRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = BuilderForRoles::PaginateSearch(Course::query(), 'name');
        return Inertia::render('Courses/Index', [
            'success' => true,
            'data' => $courses,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // $journeys = Course::getJourneys();
        // return Inertia::render('Courses/Create', [
        //     'success' => true,
        //     'data' => '',
        //     'journeys' => $journeys
        // ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorecourseRequest $request)
    {
        $request->validated();
        Course::create($request->all());
        return to_route('courses.index');
    }

    /**
     * Display the specified resource.
     */
    // public function show(course $course)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(course $course)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatecourseRequest $request, Course $course)
    {
        $request->validated();
        $course->update($request->all());
        return to_route('courses.index', [
            'success' => true,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->delete();
        return to_route('courses.index', [
            'success' => true,
        ]);
    }
}
