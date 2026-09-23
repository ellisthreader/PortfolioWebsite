<?php

use App\Support\Portfolio\GitHubActivity;
use Illuminate\Support\Facades\Http;
use Inertia\Testing\AssertableInertia as Assert;

test('it returns the latest public push', function () {
    Http::fake(['api.github.com/*' => Http::response([
        ['type' => 'WatchEvent', 'repo' => ['name' => 'ellisthreader/other'], 'created_at' => now()->toIso8601String()],
        ['type' => 'PushEvent', 'repo' => ['name' => 'ellisthreader/Vibyra'], 'created_at' => now()->subHours(3)->toIso8601String()],
    ])]);

    expect(app(GitHubActivity::class)->latestPush())
        ->repo->toBe('Vibyra')
        ->url->toBe('https://github.com/ellisthreader/Vibyra');
});

test('it hides pushes older than two weeks', function () {
    Http::fake(['api.github.com/*' => Http::response([
        ['type' => 'PushEvent', 'repo' => ['name' => 'ellisthreader/old'], 'created_at' => now()->subDays(20)->toIso8601String()],
    ])]);

    expect(app(GitHubActivity::class)->latestPush())->toBeNull();
});

test('it hides the line when GitHub is unavailable', function () {
    Http::fake(['api.github.com/*' => Http::response('', 503)]);

    expect(app(GitHubActivity::class)->latestPush())->toBeNull();
});

test('the home page loads it as a deferred prop', function () {
    Http::fake(['api.github.com/*' => Http::response([
        ['type' => 'PushEvent', 'repo' => ['name' => 'ellisthreader/Vibyra'], 'created_at' => now()->toIso8601String()],
    ])]);

    $this->get('/')->assertInertia(fn (Assert $page) => $page
        ->missing('latestPush')
        ->loadDeferredProps(fn (Assert $reload) => $reload->where('latestPush.repo', 'Vibyra')));
});
