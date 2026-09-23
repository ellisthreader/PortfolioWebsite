<?php

use App\Support\Portfolio\ProjectRepository;
use Inertia\Testing\AssertableInertia as Assert;

test('the work index lists every project with filter counts', function () {
    $total = app(ProjectRepository::class)->all()->count();

    $this->get('/work')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('work/index')
            ->has('projects', $total)
            ->has('types', count(ProjectRepository::TYPES))
            ->has('projects.0', fn (Assert $project) => $project
                ->hasAll(['slug', 'title', 'summary', 'type', 'year', 'stack', 'tone', 'cover'])
                ->etc()));
});

test('every project has a case study page', function () {
    $slugs = app(ProjectRepository::class)->all()->pluck('slug');

    expect($slugs)->not->toBeEmpty();

    foreach ($slugs as $slug) {
        $this->get("/work/{$slug}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('work/show')
                ->where('project.slug', $slug)
                ->has('next.slug'));
    }
});

test('a case study has its own title and description for link previews', function () {
    $project = app(ProjectRepository::class)->find('bear-lane');

    $this->get('/work/bear-lane')
        ->assertSee('<title>'.e($project['title']).' — Ellis Threader</title>', false)
        ->assertSee('<meta name="description" content="'.e($project['summary']).'">', false);
});

test('an unknown project is a 404', function () {
    $this->get('/work/not-a-project')->assertNotFound();
});

test('the old projects address redirects to work', function () {
    $this->get('/projects')->assertRedirect('/work')->assertStatus(301);
});

test('every project has a valid type and a cover', function () {
    foreach (app(ProjectRepository::class)->summaries() as $project) {
        expect(array_keys(ProjectRepository::TYPES))->toContain($project['type']);

        $cover = $project['cover'];
        $hasCover = $cover['desktop'] || $cover['mobile'] || $cover['image'] || $cover['diagram'];

        expect($hasCover)->toBeTrue("{$project['slug']} has no cover");
    }
});

test('the spotlight project is not repeated in the featured grid', function () {
    $projects = app(ProjectRepository::class);

    expect($projects->featured()->pluck('slug'))->not->toContain($projects->spotlight()['slug']);
});

test('removed projects stay off the site', function (string $slug) {
    $this->get("/work/{$slug}")->assertNotFound();
})->with(['focus', 'phone-preview', 'service-priority-ai', 'property-digital-twin']);
