<?php

namespace App\Support\Portfolio;

use Illuminate\Support\Collection;

/**
 * Reads project content (resources/content/projects.json) and presentation
 * (resources/content/project-media.json) and merges them for the pages.
 * Projects marked "hidden" stay in the file but are left off the site.
 */
class ProjectRepository
{
    public const TYPES = [
        'client' => 'Client work',
        'product' => 'Products',
        'ai-system' => 'AI systems',
        'other' => 'Other work',
    ];

    /** @var Collection<int, array<string, mixed>>|null */
    private ?Collection $projects = null;

    public function __construct(private Images $images) {}

    /**
     * @return Collection<int, array<string, mixed>>
     */
    public function all(): Collection
    {
        if ($this->projects === null) {
            $content = $this->readJson('projects.json');
            $media = $this->readJson('project-media.json');

            $this->projects = collect($content)
                ->reject(fn (array $project): bool => $project['hidden'] ?? false)
                ->map(fn (array $project): array => [
                    ...$project,
                    'media' => $media[$project['slug']] ?? [],
                ])
                ->values();
        }

        return $this->projects;
    }

    /**
     * @return Collection<int, array<string, mixed>>
     */
    public function featured(): Collection
    {
        return $this->all()
            ->filter(fn (array $project): bool => isset($project['featured']) && ! isset($project['media']['spotlight']))
            ->sortBy('featured')
            ->values()
            ->map(fn (array $project): array => $this->summary($project));
    }

    /**
     * Everything the home page doesn't show as a card, for its compact index.
     *
     * @return Collection<int, array<string, mixed>>
     */
    public function others(): Collection
    {
        return $this->all()
            ->reject(fn (array $project): bool => isset($project['featured']) || isset($project['media']['spotlight']))
            ->values()
            ->map(fn (array $project): array => [
                'slug' => $project['slug'],
                'title' => $project['title'],
                'type' => $project['type'],
                'category' => $project['category'] ?? null,
                'year' => $project['year'],
            ]);
    }

    /**
     * The one project the home page gives its own section to.
     *
     * @return array<string, mixed>|null
     */
    public function spotlight(): ?array
    {
        $project = $this->all()->first(fn (array $project): bool => isset($project['media']['spotlight']));

        if ($project === null) {
            return null;
        }

        return [
            ...$this->summary($project),
            'points' => $project['media']['spotlight']['points'] ?? [],
        ];
    }

    /**
     * @return Collection<int, array<string, mixed>>
     */
    public function summaries(): Collection
    {
        return $this->all()->map(fn (array $project): array => $this->summary($project));
    }

    /**
     * @return array<string, mixed>|null
     */
    public function find(string $slug): ?array
    {
        $project = $this->all()->firstWhere('slug', $slug);

        if ($project === null) {
            return null;
        }

        $media = $project['media'];

        return [
            ...$this->summary($project),
            'caseStudy' => $project['caseStudy'] ?? (object) [],
            'gallery' => collect($media['gallery'] ?? [])
                ->map(fn (array $item): array => [
                    'frame' => $item['frame'] ?? 'browser',
                    'caption' => $item['caption'] ?? null,
                    'image' => $this->images->resolve($item['image']),
                ])
                ->filter(fn (array $item): bool => $item['image'] !== null)
                ->values()
                ->all(),
            'diagram' => $media['diagram'] ?? null,
        ];
    }

    /**
     * @return array<string, mixed>|null
     */
    public function next(string $slug): ?array
    {
        $all = $this->all();
        $index = $all->search(fn (array $project): bool => $project['slug'] === $slug);

        if ($index === false) {
            return null;
        }

        return $this->summary($all[($index + 1) % $all->count()]);
    }

    /**
     * @return array<string, int>
     */
    public function typeCounts(): array
    {
        return collect(self::TYPES)
            ->map(fn (string $label, string $type): int => $this->all()->where('type', $type)->count())
            ->all();
    }

    /**
     * @param  array<string, mixed>  $project
     * @return array<string, mixed>
     */
    private function summary(array $project): array
    {
        $media = $project['media'];
        $cover = $media['cover'] ?? [];

        return [
            'slug' => $project['slug'],
            'title' => $project['title'],
            'summary' => $project['summary'],
            'type' => $project['type'],
            'category' => $project['category'] ?? null,
            'year' => $project['year'],
            'role' => $project['role'] ?? null,
            'client' => $project['client'] ?? null,
            'stack' => $project['stack'] ?? [],
            'links' => $project['links'] ?? (object) [],
            'tone' => $media['tone'] ?? 'porcelain',
            'cover' => [
                'layout' => $cover['layout'] ?? 'browser',
                'desktop' => $this->images->resolve($cover['desktop'] ?? null),
                'mobile' => $this->images->resolve($cover['mobile'] ?? null),
                'image' => $this->images->resolve($cover['image'] ?? null),
                'focus' => $cover['focus'] ?? null,
                'url' => $cover['url'] ?? null,
                'diagram' => $cover['diagram'] ?? null,
            ],
        ];
    }

    /**
     * @return array<mixed>
     */
    private function readJson(string $file): array
    {
        $path = resource_path('content/'.$file);

        if (! is_file($path)) {
            return [];
        }

        return json_decode((string) file_get_contents($path), true, flags: JSON_THROW_ON_ERROR);
    }
}
