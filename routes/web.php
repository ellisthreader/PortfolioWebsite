<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('/home-model', function () {
    return response()->file(storage_path('assets/FIXEDNOW.glb'), [
        'Content-Type' => 'model/gltf-binary',
        'Cache-Control' => 'public, max-age=3600',
    ]);
})->name('home.model');

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
    'modelUrl' => url('/home-model'),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
