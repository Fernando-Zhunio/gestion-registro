<?php

namespace App\Http\Controllers;

use App\Models\ManagerNote;
use App\Http\Requests\StoreManagerNoteRequest;
use App\Http\Requests\UpdateManagerNoteRequest;

class ManagerNoteController extends Controller
{
    public function __construct() {
        $this->middleware(['role:super-admin|admin']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
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
    public function store(StoreManagerNoteRequest $request)
    {
        $notes =  json_decode($request->notes);
        $period_id = currentState()->period_id;
        $exist = ManagerNote::where('period_id', $period_id)->exists();
        if ($exist) {
            validationException('period_id', 'El periodo ya tiene notas');
        }
        ManagerNote::create([
            'notes' => $notes,
            'interval_month' => $request->interval_month,
            'period_id' => $period_id
        ]);

        return to_route('academic.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(ManagerNote $managerNote)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ManagerNote $managerNote)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateManagerNoteRequest $request, ManagerNote $managerNote)
    {
        $notes =  json_decode($request->notes);
        $period_id = currentState()->period_id;
        // $exist = ManagerNote::where('period_id', $period_id)->exists();
        // if ($exist) {
        //     validationException('period_id', 'El periodo ya tiene notas');
        // }
        $managerNote->update([
            'notes' => $notes,
            'interval_month' => $request->interval_month,
            'period_id' => $period_id
        ]);

        return to_route('academic.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ManagerNote $managerNote)
    {
        //
    }
}
