<?php

use App\Support\Portfolio\ProjectRepository;
use Inertia\Testing\AssertableInertia as Assert;

test('the home page shows the featured work', function () {
    $projects = app(ProjectRepository::class);
    $featured = $projects->featured()->count();
    $others = $projects->others()->count();

    expect($featured)->toBeGreaterThanOrEqual(4);

    $this->get('/')
        ->assertOk()
        ->assertSee('<meta property="og:title" content="Ellis Threader — Software engineer, London">', false)
        ->assertSee('"@type":"Person"', false)
        ->assertInertia(fn (Assert $page) => $page
            ->component('home')
            ->has('featured', $featured)
            ->where('spotlight.slug', 'relayclarity')
            ->has('spotlight.points', 3)
            ->has('featured.0.links')
            ->has('others', $others)
            ->where('projectCount', $featured + $others + 1)
            ->where('site.name', 'Ellis Threader')
            ->missing('latestPush'));
});

test('the about page renders', function () {
    $this->get('/about')
        ->assertOk()
        ->assertSee('<title>About — Ellis Threader</title>', false)
        ->assertInertia(fn (Assert $page) => $page->component('about'));
});

test('links that are not configured are not shared with the frontend', function () {
    config(['portfolio.links.linkedin' => null, 'portfolio.cv' => null]);

    $this->get('/about')->assertInertia(fn (Assert $page) => $page
        ->where('site.links.linkedin', null)
        ->where('site.cv', null));
});

test('the sitemap lists every page and project', function () {
    $response = $this->get('/sitemap.xml')->assertOk()->assertHeader('Content-Type', 'application/xml');

    foreach (['/work', '/about', '/contact', '/work/bear-lane'] as $path) {
        $response->assertSee(url($path), false);
    }
});

test('unknown pages use the branded 404 page', function () {
    $this->get('/definitely-not-a-page')
        ->assertNotFound()
        ->assertInertia(fn (Assert $page) => $page
            ->component('error')
            ->where('status', 404));
});

test('the old account pages are gone', function (string $path) {
    $this->get($path)->assertNotFound();
})->with(['/login', '/register', '/dashboard', '/settings/profile']);
