<?php

namespace App\Http\Controllers;

use App\Builders\BuilderForRoles;
use App\Models\Note;
use App\Http\Requests\StorenoteRequest;
use App\Http\Requests\UpdatenoteRequest;
use App\Models\Parallel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct() {
        // $this->middleware(['role:teacher']);
    }
    public function index()
    {
        $builder = Note::query();
        $search = request()->get('search', '');
        if (!empty($search)){
            $builder->whereHas('student', function ($query) use ($search) {
                $query->where('first_name', 'like', "%{$search}%");
                $query->orWhere('last_name', 'like', "%{$search}%");
            });
        }
        $notes = BuilderForRoles::PaginateSearch($builder);
        // $
        // $notes = $builder->with('teacher')->paginate(10);
        return Inertia::render('Notes/Index', [
            'success' => true,
            'data' => $notes,
        ]);
    }

    public function getParallels(Request $request) {
        $search = $request->get('search', '');
        $parallels = Parallel::search($search)->paginate();
        return response()->json([
            'success' => true,
            'data' => $parallels,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Notes/CreateOrEditNote', [
            'success' => true,
            'data' => [],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorenoteRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(note $note)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(note $note)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatenoteRequest $request, note $note)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(note $note)
    {
        //
    }
}
