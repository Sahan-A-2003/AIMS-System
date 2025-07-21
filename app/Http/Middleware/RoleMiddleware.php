<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role = null, string $guard = null): Response
    {
        if (!auth()->check()) {
            abort(403, 'Access denied. Authentication required.');
        }

        $user = auth()->user();

        // If no specific role is required, just check if user is authenticated
        if (!$role) {
            return $next($request);
        }

        // Check if user has the required role
        if (!$user->hasRole($role)) {
            abort(403, 'Access denied. Insufficient role privileges.');
        }

        return $next($request);
    }
} 