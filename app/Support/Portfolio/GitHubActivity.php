<?php

namespace App\Support\Portfolio;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Throwable;

/**
 * The most recent public push to GitHub, used for the "last pushed" line.
 *
 * Cached in the file store so a slow or unavailable GitHub never slows a page,
 * and hidden entirely once the latest push is older than two weeks.
 */
class GitHubActivity
{
    private const FRESH_DAYS = 14;

    /**
     * @return array{repo: string, url: string, pushedAt: string}|null
     */
    public function latestPush(): ?array
    {
        $username = config('portfolio.github_username');

        $push = Cache::store(config('portfolio.cache_store'))->remember(
            "github-latest-push:{$username}",
            now()->addMinutes(15),
            fn (): array => $this->fetch($username) ?? ['none' => true],
        );

        if (isset($push['none'])) {
            return null;
        }

        if (Carbon::parse($push['pushedAt'])->lt(now()->subDays(self::FRESH_DAYS))) {
            return null;
        }

        return $push;
    }

    /**
     * @return array{repo: string, url: string, pushedAt: string}|null
     */
    private function fetch(string $username): ?array
    {
        try {
            $events = Http::timeout(3)
                ->acceptJson()
                ->withHeaders(['User-Agent' => 'ellisthreader.com'])
                ->get("https://api.github.com/users/{$username}/events/public", ['per_page' => 30])
                ->throw()
                ->json();
        } catch (Throwable) {
            return null;
        }

        $push = collect($events)->firstWhere('type', 'PushEvent');

        if ($push === null) {
            return null;
        }

        $fullName = $push['repo']['name'];

        return [
            'repo' => str($fullName)->afterLast('/')->toString(),
            'url' => "https://github.com/{$fullName}",
            'pushedAt' => $push['created_at'],
        ];
    }
}
