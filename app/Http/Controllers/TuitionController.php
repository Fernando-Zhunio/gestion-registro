<?php

namespace App\Http\Controllers;

use App\Builders\BuilderForRoles;
use App\Models\tuition;
use App\Http\Requests\StoretuitionRequest;
use App\Http\Requests\UpdatetuitionRequest;
use Inertia\Inertia;

class TuitionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tuitions = BuilderForRoles::BuilderSearchClass(Tuition::class, 'tuition', ['name']);
        return Inertia::render('Tuition/Index', [
            'success' => true,
            'data' => $tuitions,
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
    public function store(StoretuitionRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(tuition $tuition)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(tuition $tuition)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatetuitionRequest $request, tuition $tuition)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(tuition $tuition)
    {
        //
    }
}
