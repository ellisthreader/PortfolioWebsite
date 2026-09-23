import { createInertiaApp } from '@inertiajs/react';
import SiteLayout from '@/layouts/site-layout';

const siteName = 'Ellis Threader';

createInertiaApp({
    title: (title) =>
        title
            ? `${title} — ${siteName}`
            : `${siteName} — Software engineer, London`,
    layout: () => SiteLayout,
    strictMode: true,
    progress: {
        color: '#0e5a45',
        delay: 200,
    },
});
