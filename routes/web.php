<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('/home-model', function () {
    return response()->file(storage_path('assets/ModelRigFix.glb'), [
        'Content-Type' => 'model/gltf-binary',
        'Cache-Control' => 'public, max-age=3600',
    ]);
})->name('home.model');

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
    'modelUrl' => url('/home-model'),
])->name('home');

Route::get('/contact', [ContactController::class, 'create'])->name('contact.create');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::inertia('/projects', 'projects')->name('projects');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
