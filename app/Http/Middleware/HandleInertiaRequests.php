<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'site' => self::site(),
        ];
    }

    /**
     * Site details every page needs. Also used by the error pages, which can
     * render before this middleware runs (for example, on an unknown URL).
     *
     * @return array<string, mixed>
     */
    public static function site(): array
    {
        return [
            'name' => config('portfolio.name'),
            'role' => config('portfolio.role'),
            'location' => config('portfolio.location'),
            'email' => config('portfolio.email'),
            'availability' => config('portfolio.availability'),
            'links' => config('portfolio.links'),
            'cv' => config('portfolio.cv'),
        ];
    }
}
