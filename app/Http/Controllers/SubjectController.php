<?php

namespace App\Http\Controllers;

use App\Builders\BuilderForRoles;
use App\Http\Requests\StoresubjectRequest;
use App\Http\Requests\UpdatesubjectRequest;
use App\Models\Course;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function __construct() {
        $this->middleware(['role:super-admin|admin']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // $subjects = BuilderForRoles::BuilderSearchClass(Subject::class, 'name');
        $pageSize = $request->get('pageSize', 10);
        $search = $request->get('search', null);
        $subjects = Subject::search($search)->with('course')->paginate($pageSize);
        return Inertia::render('Subjects/Index', [
            'success' => true,
            'data' => $subjects,
        ]);
    }

    public function coursesSearch(Request $request)
    {
        $pageSize = $request->get('pageSize', 10);
        $search = $request->get('search', '');
        $courses = Course::search($search)->paginate($pageSize);
        return response()->json([
            'success' => true,
            'data' => $courses,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Subjects/CreateOrEditSubject', [
            'isEdit' => false,
            'data' => [
                'courses' => Course::where('status', 'A')->get(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoresubjectRequest $request)
    {
        $dataCreate = $request->all();
        $dataCreate['status'] = '1';
        Subject::create($dataCreate);
        return to_route('subjects.index');
        
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
        $request->validated();
        $subject->update($request->all());
        return to_route('subjects.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
        //
    }
}
