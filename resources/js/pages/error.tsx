import { Head } from '@inertiajs/react';
import { ButtonLink } from '@/components/button';
import { Container } from '@/components/container';

const COPY: Record<number, { title: string; body: string }> = {
    403: {
        title: 'You don’t have access to this page',
        body: 'If you followed a link to get here, the page may be private.',
    },
    404: {
        title: 'This page doesn’t exist',
        body: 'The link may be out of date, or the address may have a typo. Everything on the site is reachable from the work index.',
    },
    500: {
        title: 'Something went wrong on my side',
        body: 'The server hit an error loading this page. Try again in a minute; if it keeps happening, email me and I’ll fix it.',
    },
    503: {
        title: 'Down for a quick update',
        body: 'The site is being updated and will be back in a few minutes.',
    },
};

export default function ErrorPage({ status }: { status: number }) {
    const copy = COPY[status] ?? COPY[500];

    return (
        <>
            <Head
                title={
                    status === 404 ? 'Page not found' : 'Something went wrong'
                }
            />

            <Container className="pt-20 pb-32 sm:pt-28 sm:pb-48">
                <p className="type-meta tabular-nums">Error {status}</p>
                <h1 className="type-title mt-4 max-w-[16ch]">{copy.title}</h1>
                <p className="type-lead mt-6 max-w-[48ch] text-muted">
                    {copy.body}
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                    <ButtonLink href="/work">See the work</ButtonLink>
                    <ButtonLink href="/" variant="secondary">
                        Go to the home page
                    </ButtonLink>
                </div>
            </Container>
        </>
    );
}
