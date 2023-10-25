<?php

namespace App\Http\Controllers;

use App\Models\ManagerNote;
use App\Http\Requests\StoreManagerNoteRequest;
use App\Http\Requests\UpdateManagerNoteRequest;
use App\Models\InputNote;
use Illuminate\Support\Facades\DB;

class ManagerNoteController extends Controller
{
    public function __construct()
    {
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
        $period_id = currentState()->period_id;
        // $exist = ManagerNote::where('period_id', $period_id)->exists();
        // if ($exist) {
        //     validationException('period_id', 'El periodo ya tiene notas');
        // }
        // DB::beginTransaction();
        // try {
            ManagerNote::where('period_id', $period_id)?->delete();
            for ($key = 0; $key < $request->partials; $key++) {
                $managerNote = ManagerNote::create([
                    'partial' => $key + 1,
                    'period_id' => $period_id
                ]);
                foreach ($request->notes as $key => $value) {
                    $managerNote->inputNotes()->create([
                        'name' => $value['name'],
                        'value' => $value['value']
                    ]);
                }
            }
            // DB::commit();
        // } catch (\Throwable $th) {
        //     DB::rollback();
        //     validationException('period_id', $th->getMessage());
        // }

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
        // $notes =  json_decode($request->notes);
        $period_id = currentState()->period_id;
        $this->validatePercentNote($request->notes);
        // $exist = ManagerNote::where('period_id', $period_id)->exists();
        // if ($exist) {
        //     validationException('period_id', 'El periodo ya tiene notas');
        // }
        // $managerNote->update([
        //     'notes' => $request->notes,
        //     'interval_month' => $request->interval_month,
        //     'period_id' => $period_id
        // ]);
        ManagerNote::where('period_id', $period_id)->delete();
        for ($key = 0; $key < $request->partials; $key++) {
            $managerNote = ManagerNote::create([
                'partial' => $key + 1,
                'period_id' => $period_id
            ]);
            foreach ($request->notes as $key => $value) {
                $managerNote->notesInput()->create([
                    'name' => $value['name'],
                    'value' => $value['value']
                ]);
            }
        }

        return to_route('academic.index');
    }

    private function validatePercentNote($notes)
    {
        $acc = 0;
        foreach ($notes as $key => $value) {
            $acc += $value['value'];
        }
        if ($acc != 100) {
            validationException('notes', 'La suma de los valores debe ser 100% no ' . $acc);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ManagerNote $managerNote)
    {
        //
    }
}
