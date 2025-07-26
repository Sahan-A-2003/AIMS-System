<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserManagementController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ReportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\ComplaintController;
use Illuminate\Support\Facades\DB;


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
Route::middleware(['auth'])->group(function () {
    Route::post('/submit-complaint', [ComplaintController::class, 'store'])->name('submit-complaint.store');
    Route::get('/complaints/{complaint_id}', [ComplaintController::class, 'show']);
    Route::get('/complaints/{id}/escalate', [ComplaintController::class, 'escalate'])->name('complaint.escalate');
    Route::post('/complaints/{id}/escalate', [ComplaintController::class, 'escalate'])->name('complaint.escalate.post');
    Route::post('/complaints/{id}/complete', [ComplaintController::class, 'complete'])->name('complaint.complete');
    Route::post('/complaints/{id}/request-manager-approval', [ComplaintController::class, 'requestManagerApproval'])->name('complaint.request-manager-approval');
    Route::post('/complaints/{id}/approve-by-manager', [ComplaintController::class, 'approveByManager'])->name('complaint.approve-by-manager');
    Route::post('/complaints/{id}/reject', [ComplaintController::class, 'reject'])->name('complaint.reject');
});

// Allow complaints-data without auth for testing
Route::get('/complaints-data', [ComplaintController::class, 'getComplaints']);

//show dATA from data base
// feedback data
Route::get('/feedback', [FeedbackController::class, 'index'])->name('feedback');



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



Route::get('/escalated-complaint/{id}/request-manager-approval', function ($id) {
    return Inertia::render('ManagerRequestForm', ['id' => $id]);
})->name('escalated-complaint.requestManagerApproval');

// Escalation form route
Route::get('/escalation-form/{id}', function ($id) {
    return Inertia::render('EscalationForm', ['id' => $id]);
})->name('escalation-form');

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

// Test route to check database
Route::get('/test-db', function () {
    try {
        $count = DB::table('complaints')->count();
        return response()->json(['status' => 'success', 'complaints_count' => $count]);
    } catch (Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
    }
});

// Test complaint creation
Route::get('/test-complaint', function () {
    try {
        $complaint = new App\Models\Complaint();
        $complaint->complaint_id = 'CMP-TEST-' . time();
        $complaint->title = 'Test Complaint';
        $complaint->description = 'Test Description';
        $complaint->user_id = 1;
        $complaint->fullName = 'Test User';
        $complaint->email = 'test@test.com';
        $complaint->save();
        
        return response()->json([
            'status' => 'success', 
            'message' => 'Test complaint created',
            'complaint_id' => $complaint->id
        ]);
    } catch (Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
    }
});

// Test email notifications
Route::get('/test-email-notifications', function () {
    try {
        $complaint = App\Models\Complaint::first();
        if (!$complaint) {
            return response()->json(['status' => 'error', 'message' => 'No complaints found']);
        }
        
        $notificationService = new App\Services\ComplaintNotificationService();
        
        // Test submitted notification
        $result = $notificationService->sendComplaintSubmittedNotification($complaint);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Email notification test completed',
            'email_sent' => $result,
            'complaint_id' => $complaint->complaint_id
        ]);
    } catch (Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
    }
});

// Paginated complaints endpoint
Route::get('/complaints-paginated', [ComplaintController::class, 'paginatedComplaints']);

// User complaints endpoint
Route::get('/user-complaints', [ComplaintController::class, 'getUserComplaints']);

// Complaints pending manager approval endpoint
Route::get('/complaints-pending-manager-approval', [ComplaintController::class, 'getComplaintsPendingManagerApproval']);

// Get complaint by ID as JSON (for tracking)
Route::get('/complaint-data/{id}', [ComplaintController::class, 'getComplaintById']);

// Get complaint by database ID as JSON (for escalation form)
Route::get('/complaint-db/{id}', [ComplaintController::class, 'getComplaintByDbId']);

// Assign complaint to current user
Route::post('/complaints/{id}/assign-to-me', [ComplaintController::class, 'assignToMe'])->middleware('auth');

// Report Routes (Admin Only)
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/statistics', [ReportController::class, 'getComplaintStatistics'])->name('reports.statistics');
    Route::get('/reports/detailed', [ReportController::class, 'getDetailedReport'])->name('reports.detailed');
    Route::get('/reports/export', [ReportController::class, 'exportReport'])->name('reports.export');
});

require __DIR__.'/auth.php';
