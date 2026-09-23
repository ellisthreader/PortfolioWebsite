<?php

namespace App\Support\Portfolio;

/**
 * Resolves image keys like "bear-lane/desktop-1" into responsive sources.
 *
 * The manifest is written by scripts/build-work-images.mjs, which renders
 * each source image into AVIF and WebP at several widths under public/images/work.
 */
class Images
{
    /** @var array<string, array{width: int, height: int, widths: array<int, int>}>|null */
    private ?array $manifest = null;

    /**
     * @return array{src: string, avif: string, webp: string, width: int, height: int}|null
     */
    public function resolve(?string $key): ?array
    {
        if ($key === null) {
            return null;
        }

        $entry = $this->manifest()[$key] ?? null;

        if ($entry === null) {
            return null;
        }

        $base = '/images/work/'.$key;
        $widths = $entry['widths'];
        $srcset = fn (string $format): string => collect($widths)
            ->map(fn (int $width): string => "{$base}-{$width}.{$format} {$width}w")
            ->implode(', ');

        $fallbackWidth = collect($widths)->first(fn (int $width): bool => $width >= 1280) ?? end($widths);

        return [
            'src' => "{$base}-{$fallbackWidth}.webp",
            'avif' => $srcset('avif'),
            'webp' => $srcset('webp'),
            'width' => $entry['width'],
            'height' => $entry['height'],
        ];
    }

    /**
     * @return array<string, array{width: int, height: int, widths: array<int, int>}>
     */
    private function manifest(): array
    {
        if ($this->manifest === null) {
            $path = resource_path('content/images.json');
            $this->manifest = is_file($path)
                ? json_decode((string) file_get_contents($path), true, flags: JSON_THROW_ON_ERROR)
                : [];
        }

        return $this->manifest;
    }
}
