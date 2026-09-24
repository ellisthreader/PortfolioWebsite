@php
    $meta ??= \App\Support\Portfolio\Seo::page();
@endphp
<!DOCTYPE html>
<html lang="en-GB">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="color-scheme" content="light dark">
        <meta name="theme-color" content="#f4f5f3" media="(prefers-color-scheme: light)">
        <meta name="theme-color" content="#121416" media="(prefers-color-scheme: dark)">

        <style>
            html { background-color: #f4f5f3; }
            @media (prefers-color-scheme: dark) { html { background-color: #121416; } }
        </style>

        <link rel="preload" href="{{ Vite::asset('resources/fonts/mona-sans-latin-wdth.woff2') }}" as="font" type="font/woff2" crossorigin>
        @if ($meta['preload'] ?? null)
            <link rel="preload" as="image" type="image/avif" imagesrcset="{{ $meta['preload']['srcset'] }}" imagesizes="{{ $meta['preload']['sizes'] }}" fetchpriority="high">
        @endif

        <link rel="icon" href="/ellis-threader-icon.png" type="image/png" sizes="192x192">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <meta name="description" content="{{ $meta['description'] }}">
        <link rel="canonical" href="{{ $meta['url'] }}">
        <meta property="og:site_name" content="{{ config('portfolio.name') }}">
        <meta property="og:type" content="{{ $meta['type'] }}">
        <meta property="og:title" content="{{ $meta['title'] }}">
        <meta property="og:description" content="{{ $meta['description'] }}">
        <meta property="og:url" content="{{ $meta['url'] }}">
        <meta property="og:image" content="{{ $meta['image'] }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:locale" content="en_GB">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $meta['title'] }}">
        <meta name="twitter:description" content="{{ $meta['description'] }}">
        <meta name="twitter:image" content="{{ $meta['image'] }}">
        @if ($meta['jsonLd'])
            <script type="application/ld+json">{!! json_encode($meta['jsonLd'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) !!}</script>
        @endif

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ $meta['title'] }}</title>
        </x-inertia::head>
    </head>
    <body>
        <x-inertia::app />
    </body>
</html>
