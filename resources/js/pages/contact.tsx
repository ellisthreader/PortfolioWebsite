import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEvent, ReactNode } from 'react';
import { useId, useRef } from 'react';
import { Availability } from '@/components/availability';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { CopyEmail } from '@/components/copy-email';
import { PaperclipIcon } from '@/components/icons';
import { SocialChannels } from '@/components/social-links';
import { cn } from '@/lib/utils';

type ContactProps = {
    topics: Record<string, string>;
    sentTo?: string | null;
};

const fieldClasses =
    'block w-full rounded-[10px] border border-rule-strong bg-paper px-3.5 text-[1rem] text-ink transition-colors placeholder:text-muted/70 hover:border-muted focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent aria-[invalid=true]:border-danger';

export default function Contact({ topics, sentTo }: ContactProps) {
    const { site } = usePage().props;

    return (
        <>
            <Head title="Contact" />

            <Container className="pt-14 pb-28 sm:pt-20 sm:pb-40">
                <h1 className="type-title">Contact</h1>
                <p className="type-lead mt-5 max-w-[38ch] text-muted">
                    Tell me what you’re building, or about the role.
                </p>

                <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-8">
                    <aside className="lg:col-span-4">
                        <div className="space-y-10">
                            <Availability className="font-[500]" />

                            <div>
                                <h2 className="type-meta">Email</h2>
                                <CopyEmail className="mt-2" />
                            </div>

                            <div>
                                <h2 className="type-meta">Replies</h2>
                                <p className="mt-2">
                                    Within one working day. I’m based in{' '}
                                    {site.location}.
                                </p>
                            </div>

                            {(site.links.github || site.links.linkedin) && (
                                <div>
                                    <h2 className="type-meta">Elsewhere</h2>
                                    <div className="channels-panel mt-3">
                                        <SocialChannels exclude={['Gmail']} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>

                    <div className="lg:col-span-7 lg:col-start-6">
                        {sentTo ? (
                            <Sent email={sentTo} />
                        ) : (
                            <ContactForm topics={topics} />
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
}

function Sent({ email }: { email: string }) {
    return (
        <div
            role="status"
            className="rounded-[18px] bg-paper px-6 py-12 shadow-[var(--shadow-plate)] sm:px-10 sm:py-14"
        >
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                <svg
                    viewBox="0 0 20 20"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                >
                    <path d="m4.5 10.5 3.5 3.5 7.5-8" />
                </svg>
            </span>
            <h2 className="type-heading mt-6">Message sent</h2>
            <p className="type-lead mt-3 max-w-[40ch] text-muted">
                I’ll reply to {email} within one working day.
            </p>
            <Link href="/work" className="link mt-8 inline-block font-[550]">
                Look at my work in the meantime
            </Link>
        </div>
    );
}

function ContactForm({ topics }: { topics: Record<string, string> }) {
    const fileInput = useRef<HTMLInputElement>(null);
    const { data, setData, post, processing, errors, progress } = useForm({
        name: '',
        email: '',
        topic: '',
        message: '',
        attachments: [] as File[],
        website: '',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/contact', { forceFormData: true, preserveScroll: true });
    };

    const attachmentError = Object.entries(errors).find(([key]) =>
        key.startsWith('attachments'),
    )?.[1];

    return (
        <form onSubmit={submit} noValidate className="grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Name" error={errors.name}>
                    {(props) => (
                        <input
                            {...props}
                            type="text"
                            autoComplete="name"
                            value={data.name}
                            onChange={(event) =>
                                setData('name', event.target.value)
                            }
                            className={cn(fieldClasses, 'h-12')}
                        />
                    )}
                </Field>
                <Field label="Email" error={errors.email}>
                    {(props) => (
                        <input
                            {...props}
                            type="email"
                            autoComplete="email"
                            inputMode="email"
                            value={data.email}
                            onChange={(event) =>
                                setData('email', event.target.value)
                            }
                            className={cn(fieldClasses, 'h-12')}
                        />
                    )}
                </Field>
            </div>

            <Field label="What’s it about?" error={errors.topic}>
                {(props) => (
                    <div className="relative">
                        <select
                            {...props}
                            value={data.topic}
                            onChange={(event) =>
                                setData('topic', event.target.value)
                            }
                            className={cn(
                                fieldClasses,
                                'h-12 appearance-none pr-10',
                                !data.topic && 'text-muted',
                            )}
                        >
                            <option value="" disabled>
                                Choose one
                            </option>
                            {Object.entries(topics).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <svg
                            viewBox="0 0 20 20"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            aria-hidden
                            className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-muted"
                        >
                            <path
                                d="m6 8 4 4 4-4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                )}
            </Field>

            <Field
                label="Message"
                hint="What you need, rough timings, and anything I should read first."
                error={errors.message}
            >
                {(props) => (
                    <textarea
                        {...props}
                        rows={7}
                        value={data.message}
                        onChange={(event) =>
                            setData('message', event.target.value)
                        }
                        className={cn(
                            fieldClasses,
                            'min-h-44 resize-y py-3 leading-relaxed',
                        )}
                    />
                )}
            </Field>

            <div>
                <input
                    ref={fileInput}
                    id="attachments"
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
                    className="sr-only"
                    aria-describedby={
                        attachmentError
                            ? 'attachments-error'
                            : 'attachments-hint'
                    }
                    onChange={(event) =>
                        setData(
                            'attachments',
                            Array.from(event.target.files ?? []),
                        )
                    }
                />
                <label
                    htmlFor="attachments"
                    className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-dashed border-rule-strong px-3.5 text-[0.9375rem] font-[500] text-ink transition-colors hover:border-ink [input:focus-visible+&]:outline-2 [input:focus-visible+&]:outline-offset-2 [input:focus-visible+&]:outline-accent"
                >
                    <PaperclipIcon />
                    {data.attachments.length > 0
                        ? `${data.attachments.length} file${data.attachments.length > 1 ? 's' : ''} attached`
                        : 'Attach files'}
                </label>
                {data.attachments.length > 0 && (
                    <button
                        type="button"
                        className="link type-meta ml-4"
                        onClick={() => {
                            setData('attachments', []);

                            if (fileInput.current) {
                                fileInput.current.value = '';
                            }
                        }}
                    >
                        Remove
                    </button>
                )}
                <p id="attachments-hint" className="type-meta mt-2">
                    Optional. Up to 5 images or PDFs, 5 MB each.
                </p>
                {attachmentError && (
                    <p
                        id="attachments-error"
                        className="mt-1.5 text-[0.875rem] text-danger"
                    >
                        {attachmentError}
                    </p>
                )}
            </div>

            {/* Honeypot: hidden from people and assistive tech. */}
            <div
                aria-hidden
                className="absolute -left-[9999px] h-px w-px overflow-hidden"
            >
                <label>
                    Website
                    <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={data.website}
                        onChange={(event) =>
                            setData('website', event.target.value)
                        }
                    />
                </label>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                    type="submit"
                    disabled={processing}
                    className="min-w-40"
                >
                    {processing ? 'Sending…' : 'Send message'}
                </Button>
                {progress && (
                    <span className="type-meta tabular-nums">
                        Uploading {progress.percentage}%
                    </span>
                )}
            </div>
        </form>
    );
}

type FieldProps = {
    label: string;
    hint?: string;
    error?: string;
    children: (props: {
        id: string;
        'aria-invalid': boolean;
        'aria-describedby'?: string;
    }) => ReactNode;
};

function Field({ label, hint, error, children }: FieldProps) {
    const id = useId();
    const describedBy = [hint && `${id}-hint`, error && `${id}-error`]
        .filter(Boolean)
        .join(' ');

    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block text-[0.9375rem] font-[550]"
            >
                {label}
            </label>
            {hint && (
                <p id={`${id}-hint`} className="type-meta -mt-1 mb-2">
                    {hint}
                </p>
            )}
            {children({
                id,
                'aria-invalid': Boolean(error),
                'aria-describedby': describedBy || undefined,
            })}
            {error && (
                <p
                    id={`${id}-error`}
                    className="mt-1.5 text-[0.875rem] text-danger"
                >
                    {error}
                </p>
            )}
        </div>
    );
}
