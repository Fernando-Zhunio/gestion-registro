<?php

namespace App\Http\Controllers;

use App\Models\parallel;
use App\Http\Requests\StoreparallelRequest;
use App\Http\Requests\UpdateparallelRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ParallelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $pageSize = $request->get('pageSize', 10);
        $parallels = parallel::search($search)->paginate($pageSize);
        return Inertia::render('Parallels/Index', [
            'success' => true,
            'data' => $parallels,
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
    public function store(StoreparallelRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(parallel $parallel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(parallel $parallel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateparallelRequest $request, parallel $parallel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(parallel $parallel)
    {
        //
    }
}
