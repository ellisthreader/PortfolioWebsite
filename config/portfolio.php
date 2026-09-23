<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Site owner
    |--------------------------------------------------------------------------
    |
    | Everything personal that appears across the site lives here, so links
    | and availability can change without touching the frontend.
    |
    */

    'name' => 'Ellis Threader',
    'role' => 'Software engineer',
    'location' => 'London, UK',
    'email' => 'ellis.threader3001@gmail.com',

    'availability' => [
        'open' => (bool) env('PORTFOLIO_AVAILABLE', true),
        'label' => env('PORTFOLIO_AVAILABILITY', 'Open to freelance projects and full-time roles'),
    ],

    // Null links are hidden.
    'links' => [
        'github' => 'https://github.com/ellisthreader',
        'linkedin' => env('PORTFOLIO_LINKEDIN_URL', 'https://www.linkedin.com/in/ellis-threader-25036b320'),
    ],

    // Path under public/, e.g. '/Ellis-Threader-CV.pdf'. Null hides every CV link.
    'cv' => env('PORTFOLIO_CV_PATH'),

    'github_username' => 'ellisthreader',

    // File cache by default so the GitHub line never depends on the database.
    'cache_store' => env('PORTFOLIO_CACHE_STORE', 'file'),

    'description' => 'Ellis Threader is a software engineer in London who designs and builds web platforms, AI voice systems and mobile apps, end to end.',

];
