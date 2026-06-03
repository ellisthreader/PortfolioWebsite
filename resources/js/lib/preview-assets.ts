export function publicAsset(path: string): string {
    const normalized = path.startsWith('/') ? path : `/${path}`;

    if (typeof window === 'undefined') {
        return normalized;
    }

    const previewBase = window.location.pathname.match(
        /^(\/preview\/server\/[^/]+\/[^/]+)\/?/,
    )?.[1];

    return previewBase ? `${previewBase}${normalized}` : normalized;
}
