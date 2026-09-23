<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Support\Portfolio\Seo;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Branded error pages, except in local debug where the stack trace is more useful.
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            $status = $response->getStatusCode();

            if (app()->hasDebugModeEnabled() && $status >= 500) {
                return $response;
            }

            if (! in_array($status, [403, 404, 500, 503], true) || $request->expectsJson()) {
                return $response;
            }

            return Inertia::render('error', ['status' => $status, 'site' => HandleInertiaRequests::site()])
                ->withViewData('meta', Seo::page(title: $status === 404 ? 'Page not found' : 'Something went wrong'))
                ->toResponse($request)
                ->setStatusCode($status);
        });
    })->create();
