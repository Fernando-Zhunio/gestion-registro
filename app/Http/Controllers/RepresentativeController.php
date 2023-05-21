<?php

namespace App\Http\Controllers;

use App\Builders\BuilderForRoles;
use App\Models\representative;
use App\Http\Requests\StorerepresentativeRequest;
use App\Http\Requests\UpdaterepresentativeRequest;
use App\Models\Representative as ModelsRepresentative;
use Inertia\Inertia;

class RepresentativeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search = request('search', null);
        $pageSize = request('pageSize', 10);
        $representatives = ModelsRepresentative::search($search, 'first_name', ['last_name' => $search])->paginate($pageSize);
        return Inertia::render('Representatives/Index', [
            'success' => true,
            'data' => $representatives,
        ]);
    }

    public function indexApi()
    {
        $search = request('search', null);
        $pageSize = request('pageSize', 10);
        $representatives = ModelsRepresentative::search($search)->paginate($pageSize);
        return response()->json([
            'success' => true,
            'data' => $representatives,
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
    public function store(StorerepresentativeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(representative $representative)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(representative $representative)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdaterepresentativeRequest $request, representative $representative)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(representative $representative)
    {
        //
    }
}
