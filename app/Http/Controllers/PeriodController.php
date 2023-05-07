<?php

namespace App\Http\Controllers;

use App\Models\Period;
use App\Http\Requests\StoreperiodRequest;
use App\Http\Requests\UpdateperiodRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PeriodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search', null);
        $pageSize = $request->get('pageSize', 10);
        $periods = Period::search($search, 'description')
            ->orderBy('id', 'desc')
            ->paginate($pageSize);

        return Inertia::render('Periods/Index', [
            'success' => true,
            'data' => $periods,
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
    public function store(StoreperiodRequest $request)
    {
        $request->validated();
        $data = $request->all();
        $data['start_date'] = date('Y-m-d', strtotime($data['start_date']));
        $data['end_date'] = date('Y-m-d', strtotime($data['end_date']));
        $period = Period::create($data);
        return to_route('periods.index', [
            'success' => true,
            'data' => $period,
        ]);
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
        $request->validated();
        $data = $request->all();
        $data['start_date'] = date('Y-m-d', strtotime($data['start_date']));
        $data['end_date'] = date('Y-m-d', strtotime($data['end_date']));
        $period->update($data);
        return to_route('periods.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(period $period)
    {
        //
    }
}
