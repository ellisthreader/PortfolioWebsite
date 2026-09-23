<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactMessageMail;
use App\Support\Portfolio\Seo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('contact', [
            'topics' => ContactRequest::TOPICS,
            'sentTo' => session('sentTo'),
        ])->withViewData('meta', Seo::page(
            title: 'Contact',
            description: 'Get in touch with Ellis Threader about a freelance project or a full-time role.',
        ));
    }

    public function store(ContactRequest $request): RedirectResponse
    {
        // Bots fill every field; people never see this one.
        if ($request->filled('website')) {
            return to_route('contact.create')->with('sentTo', $request->string('email')->toString());
        }

        $validated = $request->validated();

        Mail::to(config('portfolio.email'))->send(new ContactMessageMail(
            senderName: $validated['name'],
            senderEmail: $validated['email'],
            topic: ContactRequest::TOPICS[$validated['topic']],
            body: $validated['message'],
            files: $request->file('attachments', []),
        ));

        return to_route('contact.create')->with('sentTo', $validated['email']);
    }
}
