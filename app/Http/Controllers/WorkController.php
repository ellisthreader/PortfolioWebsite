<?php

namespace App\Http\Controllers;

use App\Support\Portfolio\ProjectRepository;
use App\Support\Portfolio\Seo;
use Inertia\Inertia;
use Inertia\Response;

class WorkController extends Controller
{
    public function index(ProjectRepository $projects): Response
    {
        return Inertia::render('work/index', [
            'projects' => $projects->summaries(),
            'types' => collect(ProjectRepository::TYPES)
                ->map(fn (string $label, string $value): array => [
                    'value' => $value,
                    'label' => $label,
                    'count' => $projects->typeCounts()[$value],
                ])
                ->values(),
        ])->withViewData('meta', Seo::page(
            title: 'Work',
            description: 'Client platforms, AI systems and apps designed and built by Ellis Threader.',
        ));
    }

    public function show(ProjectRepository $projects, string $slug): Response
    {
        $project = $projects->find($slug);

        abort_if($project === null, 404);

        $ogImage = "/og/{$slug}.png";

        return Inertia::render('work/show', [
            'project' => $project,
            'next' => $projects->next($slug),
        ])->withViewData('meta', Seo::page(
            title: $project['title'],
            description: $project['summary'],
            image: is_file(public_path($ogImage)) ? $ogImage : null,
            type: 'article',
            preload: Seo::coverPreload($project['cover']),
            jsonLd: [
                '@context' => 'https://schema.org',
                '@type' => 'CreativeWork',
                'name' => $project['title'],
                'description' => $project['summary'],
                'dateCreated' => str($project['year'])->before('–')->toString(),
                'creator' => ['@type' => 'Person', 'name' => config('portfolio.name')],
                'keywords' => implode(', ', $project['stack']),
            ],
        ));
    }
}
