<?php

namespace App\Http\Controllers;

use App\Models\period;
use App\Http\Requests\StoreperiodRequest;
use App\Http\Requests\UpdateperiodRequest;

class PeriodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreperiodRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(period $period)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(period $period)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateperiodRequest $request, period $period)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(period $period)
    {
        //
    }
}
