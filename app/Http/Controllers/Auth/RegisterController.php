<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User; 
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{


    public function store(Request $request)
    {
      try {  
        
        $request->validate([
            'firstName' => 'required|string|max:100',
            'lastName' => 'required|string|max:100',
            'username' => 'required|string|max:100|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'contact' => 'nullable|string|max:15',
            'employeeId' => 'nullable|string|max:50',
            'role' => 'required|in:user,agent_level1,agent_level2,manager',
            'branch' => 'nullable|integer|exists:branches,id',
            'password' => 'required|string|confirmed|min:6',
        ]);


        $user = User::create([
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'username' => $request->username,
            'email' => $request->email,
            'contact_number' => $request->contact,
            'employee_id' => $request->employeeId,
            'role' => $request->role,
            'branch_id' => $request->branch,
            'password' => Hash::make($request->password),
            'name' => $request->firstName . ' ' . $request->lastName,
        ]);

        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);

            } catch (\Exception $e) {
        return response()->json([
            'error' => 'Something went wrong',
            'message' => $e->getMessage()
        ], 500);
    }
    }
}
