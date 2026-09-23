<?php

namespace App\Http\Controllers;

use App\Support\Portfolio\ProjectRepository;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(ProjectRepository $projects): Response
    {
        $urls = collect(['/', '/work', '/about', '/contact'])
            ->merge($projects->all()->map(fn (array $project): string => '/work/'.$project['slug']))
            ->map(fn (string $path): string => '<url><loc>'.e(url($path)).'</loc></url>')
            ->implode('');

        return response(
            '<?xml version="1.0" encoding="UTF-8"?>'
            .'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'.$urls.'</urlset>',
            200,
            ['Content-Type' => 'application/xml'],
        );
    }
}
