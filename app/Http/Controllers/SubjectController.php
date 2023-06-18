<?php

namespace App\Http\Controllers;

use App\Builders\BuilderForRoles;
use App\Http\Requests\StoresubjectRequest;
use App\Http\Requests\UpdatesubjectRequest;
use App\Models\Subject;
use Inertia\Inertia;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subjects = BuilderForRoles::BuilderSearchClass(Subject::class, 'name');
        return Inertia::render('Subjects/Index', [
            'success' => true,
            'data' => $subjects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Inertia::render('Subjects/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoresubjectRequest $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $subject)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subject $subject)
    {
        $subject->load('course');
        return Inertia::render('Subjects/Edit', [
            'success' => true,
            'data' => $subject,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatesubjectRequest $request, Subject $subject)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
        //
    }
}
