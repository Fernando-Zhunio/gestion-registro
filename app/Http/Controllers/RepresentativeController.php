<?php

namespace App\Http\Controllers;

use App\Builders\BuilderForRoles;
use App\Http\Requests\StorerepresentativeRequest;
use App\Http\Requests\UpdaterepresentativeRequest;
use App\Models\Representative;
use Inertia\Inertia;

class RepresentativeController extends Controller
{
    public function __construct() {
        $this->middleware(['role:super-admin|admin|secretary']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search = request('search', null);
        $pageSize = request('pageSize', 10);
        $representatives = Representative::search($search, 'first_name', ['last_name', 'doc_type'])->orderBy('id', 'desc')->paginate($pageSize);
        return Inertia::render('Representatives/Index', [
            'success' => true,
            'data' => $representatives,
        ]);
    }

    public function indexApi()
    {
        $search = request('search', null);
        $pageSize = request('pageSize', 10);
        $representatives = Representative::search($search)->paginate($pageSize);
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
        $representative = Representative::create($request->all());
        return $request->expectsJson() ? response()->json(['success' => true, 'data' => $representative]) :  to_route('representatives.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Representative $representative)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Representative $representative)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdaterepresentativeRequest $request, Representative $representative)
    {
        $representative->update($request->all());
        return to_route('representatives.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Representative $representative)
    {
        //
    }
}
