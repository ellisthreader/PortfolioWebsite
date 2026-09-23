<?php

namespace App\Support\Portfolio;

/**
 * Page metadata rendered server-side in app.blade.php, because link-preview
 * scrapers (LinkedIn, Slack, iMessage, X) don’t run JavaScript.
 */
class Seo
{
    /** Share of the plate each lead screen fills. Mirrors FRAME_SHARE in plate.tsx. */
    public const FRAME_SHARE = ['browser' => 0.86, 'app' => 0.86, 'browser-phone' => 0.76, 'device' => 0.66];

    /** The `sizes` of a full-width plate (home lead project and case study cover). */
    public const WIDE_PLATE_SIZES = '(min-width: 1320px) 1224px, 94vw';

    /**
     * @param  array<string, mixed>|null  $jsonLd
     * @param  array{srcset: string, sizes: string}|null  $preload
     * @return array<string, mixed>
     */
    public static function page(
        ?string $title = null,
        ?string $description = null,
        ?string $image = null,
        string $type = 'website',
        ?array $jsonLd = null,
        ?array $preload = null,
    ): array {
        $name = config('portfolio.name');

        return [
            'title' => $title ? "{$title} — {$name}" : "{$name} — Software engineer, London",
            'description' => $description ?? config('portfolio.description'),
            'url' => url()->current(),
            'image' => url($image ?? '/og/default.png'),
            'type' => $type,
            'jsonLd' => $jsonLd,
            'preload' => $preload,
        ];
    }

    /**
     * A preload hint for a full-width cover's lead screen, so the browser starts
     * fetching the largest image before the page's JavaScript has rendered it.
     *
     * @param  array<string, mixed>  $cover
     * @return array{srcset: string, sizes: string}|null
     */
    public static function coverPreload(array $cover): ?array
    {
        $share = self::FRAME_SHARE[$cover['layout']] ?? null;
        $lead = $cover['desktop'] ?? $cover['image'] ?? null;

        if ($share === null || $lead === null) {
            return null;
        }

        return [
            'srcset' => $lead['avif'],
            'sizes' => self::scaleSizes(self::WIDE_PLATE_SIZES, $share),
        ];
    }

    /** Same output as scaleSizes() in resources/js/lib/utils.ts. */
    public static function scaleSizes(string $sizes, float $factor): string
    {
        return collect(explode(',', $sizes))
            ->map(function (string $part) use ($factor): string {
                preg_match('/^(\(.*\)\s+)?(.+)$/', trim($part), $matches);

                return ($matches[1] ?? '')."calc({$matches[2]} * {$factor})";
            })
            ->implode(', ');
    }

    /**
     * @return array<string, mixed>
     */
    public static function person(): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Person',
            'name' => config('portfolio.name'),
            'jobTitle' => config('portfolio.role'),
            'email' => 'mailto:'.config('portfolio.email'),
            'url' => url('/'),
            'address' => [
                '@type' => 'PostalAddress',
                'addressLocality' => 'London',
                'addressCountry' => 'GB',
            ],
            'sameAs' => array_values(array_filter(config('portfolio.links'))),
        ];
    }
}
