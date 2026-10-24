<?php

namespace App\Http\Controllers;

use App\Support\Portfolio\GitHubActivity;
use App\Support\Portfolio\ProjectRepository;
use App\Support\Portfolio\Seo;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function home(ProjectRepository $projects, GitHubActivity $activity): Response
    {
        return Inertia::render('home', [
            'featured' => $projects->featured(),
            'spotlight' => $projects->spotlight(),
            'projectCount' => $projects->all()->count(),
            'latestPush' => Inertia::defer(fn (): ?array => $activity->latestPush()),
        ])->withViewData('meta', Seo::page(jsonLd: Seo::person()));
    }

    public function about(): Response
    {
        return Inertia::render('about')->withViewData('meta', Seo::page(
            title: 'About',
            description: 'Background, experience and tools of Ellis Threader, a software engineer in London.',
        ));
    }
}
