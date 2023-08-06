<?php

namespace App\Http\Controllers;

use App\Models\Period;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AcademicController extends Controller
{
    public function __construct()
    {
        $this->middleware(['role:super-admin|admin']);
    }
    public function index()
    {
        $period_id = currentState()->period_id;
        $periods = Period::where('id', '>', $period_id)->get();
        $users = User::with('roles')->role(['super-admin', 'admin', 'secretary'])->paginate(request()->get('pageSize', 10));
        return Inertia::render('Academic/Index', [
            'success' => true,
            'data' => $users,
            'metadata' => ['periods' => $periods],
        ]);
    }

    public function getPeriods(Request $request)
    {
        /**
         * @var User $user
         */
        $user = auth()->user();

        if ($user->hasRole('student')) {
            $student = $user->student();
            $periods = Period::whereHas('tuitions', function ($query) use ($student) {
                $query->where('student_id', $student->id);
            })->get();
        }
        $periods = Period::all();
        return response()->json(['success' => true, 'data' => $periods]);
    }

    public function getPeriodsNext(Request $request)
    {
        // $pageSize = $request->get('pageSize', null);

        $period_id = currentState()->period_id;
        $periods = Period::where('id', '>', $period_id)->get();
        return response()->json(['success' => true, 'data' => $periods]);
    }

    public function changePeriod(Request $request, Period $period)
    {
        $period_current_id = currentState()->period_id;
        if ($period_current_id >= $period->id) {
            validationException('period_id', 'El periodo que se va a cambiar debe ser mayor que el actual.');
        }

        $currentState = currentState();
        $currentState->period_id = $period->id;
        $currentState->save();
        Cache::put('current_state', $currentState);
    }

    public function storeUser(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'role' => 'required|in:admin,secretary',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make(time()),
        ]);
        $user->assignRole($request->role);
        return to_route('academic.index');
    }

    public function updateUser(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'role' => 'required|in:admin,secretary',
        ]);
        /**
         * @var User $user
         */
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);
        
        $user->syncRoles($request->role);
        return to_route('academic.index');
    }

    public function destroyUser(User $user)
    {
        if($user->hasRole('super-admin')) {
            validationException('user', 'No se puede eliminar a un super-admin.');
        }
        $user->delete();
        return to_route('academic.index');
    }
}
