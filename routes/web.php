<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\FeedbackController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

//post methoad
Route::post('/sign-up', [RegisterController::class, 'store'])->name('sign-up.store');


//get method
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', function () {
    return Inertia::render('Landing');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/blog', function () {
    return Inertia::render('Blog');
})->name('Blog');

Route::get('/worke', function () {
    return Inertia::render('Worke');
})->name('worke');

Route::get('/complaints', function () {
    return Inertia::render('Complaints');
})->name('complaints');

Route::get('/sing-in', function () {
    return Inertia::render('Login');
})->name('sing-in');

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

Route::get('/complaints/{id}', function ($id) {
    return Inertia::render('ComplaintDetails', ['id' => $id]);
})->name('complaint.details');

Route::get('/complaint-details/{id}', function ($id) {
    return Inertia::render('ComplaintDetails', [
        'id' => $id, 
    ]);
})->name('complaint.details');

Route::get('/complaint-details/{id}', function ($id) {
    return Inertia::render('EscalationForm', [
        'id' => $id,
    ]);
})->name('complaint.details');

Route::get('/escalated-complaint/{id}/request-manager-approval', function ($id) {
    return Inertia::render('ManagerRequestForm', ['id' => $id]);
})->name('escalated-complaint.requestManagerApproval');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
