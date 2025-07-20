<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\FeedbackController;


// Redirect root to landing page
Route::get('/', function () {
    return redirect()->route('landing');
})->name('home');

//post methoad
Route::post('/sign-up', [RegisterController::class, 'store'])->name('sign-up.store');


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

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');

Route::get('/sign-up', function () {
    return Inertia::render('Register');
})->name('sign-up');

Route::get('/register', function () {
    return Inertia::render('Register');
})->name('register');

Route::get('/complaints-tracking', function () {
    return Inertia::render('ComplaintsTracking');
})->name('complaints-tracking');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/faqs', function () {
    return Inertia::render('FAQ');
})->name('faqs');

Route::get('/feedback', function () {
    return Inertia::render('Feedback');
})->name('feedback');

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

require __DIR__.'/auth.php';
