import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

export default function ContactPage({ status }: { status?: string }) {
    const { data, errors, post, processing, reset, setData } = useForm({
        attachments: [] as File[],
        email: '',
        message: '',
        title: '',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post('/contact', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Contact" />

            <div className="portfolio-flow-root h-screen overflow-hidden">
                <div className="portfolio-flow-background" aria-hidden />

                <div className="relative mx-auto flex h-screen max-w-4xl flex-col px-6 py-6 sm:px-10 sm:py-8 lg:px-16 lg:py-10">
                    <div className="flex items-center justify-between">
                        <Link
                            className="text-[0.74rem] font-medium tracking-[0.28em] text-white/56 uppercase transition hover:text-white"
                            href="/"
                        >
                            Back Home
                        </Link>
                        <div className="flex items-center gap-3 text-sm text-emerald-300">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.9)]" />
                            <span className="font-medium text-emerald-200">
                                Available for work
                            </span>
                        </div>
                    </div>

                    <div className="mx-auto mt-10 w-full max-w-3xl text-center lg:mt-12">
                        <h1 className="bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(250,232,255,0.96)_34%,_rgba(216,180,254,0.84)_72%,_rgba(217,70,239,0.68)_100%)] bg-clip-text text-4xl leading-[1.06] font-semibold tracking-[-0.08em] text-transparent sm:text-5xl lg:text-[4.2rem]">
                            Let&apos;s Start The Conversation
                        </h1>
                    </div>

                    <div className="mx-auto mt-8 w-full max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-6 lg:mt-10 lg:p-8">
                        <form className="space-y-5" onSubmit={submit}>
                            {status && (
                                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                                    {status}
                                </div>
                            )}

                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label
                                        className="text-white/72"
                                        htmlFor="title"
                                    >
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        onChange={(event) =>
                                            setData('title', event.target.value)
                                        }
                                        placeholder="What would you like to discuss?"
                                        className="h-11 rounded-2xl border-white/10 bg-black/20 px-4 text-white placeholder:text-white/30"
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.title}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label
                                        className="text-white/72"
                                        htmlFor="email"
                                    >
                                        Your email
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(event) =>
                                            setData('email', event.target.value)
                                        }
                                        placeholder="name@example.com"
                                        className="h-11 rounded-2xl border-white/10 bg-black/20 px-4 text-white placeholder:text-white/30"
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.email}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    className="text-white/72"
                                    htmlFor="message"
                                >
                                    Message
                                </Label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={data.message}
                                    onChange={(event) =>
                                        setData('message', event.target.value)
                                    }
                                    placeholder="Tell me a little about the project, role, or idea."
                                    className="min-h-32 w-full rounded-[1.5rem] border border-white/10 bg-black/20 px-4 py-3 text-base text-white shadow-xs transition outline-none placeholder:text-white/30 focus-visible:border-fuchsia-300/40 focus-visible:ring-4 focus-visible:ring-fuchsia-300/10 md:text-sm"
                                />
                                <InputError
                                    className="mt-1"
                                    message={errors.message}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    className="text-white/72"
                                    htmlFor="attachments"
                                >
                                    Attach photos
                                </Label>
                                <Input
                                    id="attachments"
                                    name="attachments[]"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(event) =>
                                        setData(
                                            'attachments',
                                            Array.from(
                                                event.target.files ?? [],
                                            ),
                                        )
                                    }
                                    className="h-auto rounded-2xl border-white/10 bg-black/20 px-4 py-2.5 text-white file:mr-4 file:rounded-full file:border-0 file:bg-fuchsia-300/12 file:px-4 file:py-2 file:text-sm file:text-white"
                                />
                                <p className="text-xs text-white/42">
                                    Up to 5 images, 5MB each.
                                </p>
                                <InputError
                                    className="mt-1"
                                    message={errors.attachments}
                                />
                                <InputError
                                    className="mt-1"
                                    message={errors['attachments.0']}
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    className="h-11 rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-6 text-white hover:bg-fuchsia-300/16"
                                >
                                    {processing && <Spinner />}
                                    Send Message
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
