<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactMessageMail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('contact', [
            'status' => session('status'),
        ]);
    }

    public function store(ContactRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Mail::to('ellis.threader3001@gmail.com')->send(new ContactMessageMail(
            title: $validated['title'],
            email: $validated['email'],
            body: $validated['message'],
            attachments: $request->file('attachments', []),
        ));

        return redirect()
            ->route('contact.create')
            ->with('status', 'Your message has been sent successfully.');
    }
}
