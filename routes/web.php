<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserManagementController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\ComplaintController;


// Redirect root to landing page
Route::get('/', function () {
    return redirect()->route('landing');
})->name('home');

// add data to database
//post methoad
Route::post('/sign-up', [RegisterController::class, 'store'])->name('sign-up.store');

//feedback submit
Route::post('/feedback', [FeedbackController::class, 'store'])->name('feedback.store');

//complaint
Route::post('/submit-complaint', [ComplaintController::class, 'store'])->name('submit-complaint.store');
Route::get('/complaints-data', [ComplaintController::class, 'getComplaints']);



//show dATA from data base
//complaint data
Route::get('/complaints-data', [ComplaintController::class, 'index']);

// feedback data
Route::get('/feedback', [FeedbackController::class, 'index'])->name('feedback');

//complaint detailes
Route::get('/complaints/{complaint_id}', [ComplaintController::class, 'show']);

// escalate complaint from
Route::get('/complaints/{id}/escalate', [ComplaintController::class, 'escalate'])->name('complaint.escalate');

//dasborde routes
Route::get('/dashboard', [ComplaintController::class, 'getInProgressCount']);




//get method
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Landing page moved to /landing
Route::get('/landing', function () {
    return Inertia::render('Landing');
})->name('landing');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/blog', function () {
    return Inertia::render('Blog');
})->name('blog');

Route::get('/worke', function () {
    return Inertia::render('Worke');
})->name('worke');

Route::get('/complaints', function () {
    return Inertia::render('Complaints');
})->name('complaints');



Route::get('/sign-up', function () {
    return Inertia::render('Register');
})->name('sign-up');



Route::get('/complaints-tracking', function () {
    return Inertia::render('ComplaintsTracking');
})->name('complaints-tracking');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/faqs', function () {
    return Inertia::render('FAQ');
})->name('faqs');

// Route::get('/feedback', function () {
//     return Inertia::render('Feedback');
// })->name('feedback');

Route::get('/user-profile', function () {
    return Inertia::render('ProfilePage');
})->name('user-profile');

Route::get('/submit-complaint', function () {
    return Inertia::render('SubmitComplaint');
})->name('submit-complaint');

Route::get('/escalated-complaint', function () {
    return Inertia::render('EscalatedComplaints');
})->name('escalated-complaint');

Route::get('/manager-approval', function () {
    return Inertia::render('ManagerApproval');
})->name('manager-approval');

// Complaint details view
Route::get('/complaints/{id}', function ($id) {
    return Inertia::render('ComplaintDetails', ['id' => $id]);
})->name('complaint.details');

// Escalation form for complaints
Route::get('/complaints/{id}/escalate', function ($id) {
    return Inertia::render('EscalationForm', [
        'id' => $id,
    ]);
})->name('complaint.escalate');

Route::get('/escalated-complaint/{id}/request-manager-approval', function ($id) {
    return Inertia::render('ManagerRequestForm', ['id' => $id]);
})->name('escalated-complaint.requestManagerApproval');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// User Management Routes (Admin Only)
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/user-management', [UserManagementController::class, 'index'])->name('user-management.index');
    Route::get('/user-management/create', [UserManagementController::class, 'create'])->name('user-management.create');
    Route::post('/user-management', [UserManagementController::class, 'store'])->name('user-management.store');
    Route::get('/user-management/{user}/edit', [UserManagementController::class, 'edit'])->name('user-management.edit');
    Route::put('/user-management/{user}', [UserManagementController::class, 'update'])->name('user-management.update');
    Route::delete('/user-management/{user}', [UserManagementController::class, 'destroy'])->name('user-management.destroy');
    Route::patch('/user-management/{user}/toggle-status', [UserManagementController::class, 'toggleStatus'])->name('user-management.toggle-status');
});

// Role Management Routes (Admin Only)
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/role-management', [RoleController::class, 'index'])->name('role-management.index');
    Route::get('/role-management/create', [RoleController::class, 'create'])->name('role-management.create');
    Route::post('/role-management', [RoleController::class, 'store'])->name('role-management.store');
    Route::get('/role-management/{role}/edit', [RoleController::class, 'edit'])->name('role-management.edit');
    Route::put('/role-management/{role}', [RoleController::class, 'update'])->name('role-management.update');
    Route::delete('/role-management/{role}', [RoleController::class, 'destroy'])->name('role-management.destroy');
});

// Permission Management Routes (Admin Only)
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/permission-management', [PermissionController::class, 'index'])->name('permission-management.index');
    Route::get('/permission-management/create', [PermissionController::class, 'create'])->name('permission-management.create');
    Route::post('/permission-management', [PermissionController::class, 'store'])->name('permission-management.store');
    Route::get('/permission-management/{permission}/edit', [PermissionController::class, 'edit'])->name('permission-management.edit');
    Route::put('/permission-management/{permission}', [PermissionController::class, 'update'])->name('permission-management.update');
    Route::delete('/permission-management/{permission}', [PermissionController::class, 'destroy'])->name('permission-management.destroy');
});

require __DIR__.'/auth.php';
