<?php

namespace App\Mail;

use Illuminate\Http\UploadedFile;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class ContactMessageMail extends Mailable
{
    /**
     * @param  array<int, UploadedFile>  $files
     */
    public function __construct(
        public string $senderName,
        public string $senderEmail,
        public string $topic,
        public string $body,
        public array $files = [],
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Portfolio enquiry from {$this->senderName}: {$this->topic}",
            replyTo: [new Address($this->senderEmail, $this->senderName)],
        );
    }

    public function content(): Content
    {
        return new Content(view: 'emails.contact-message');
    }

    /**
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return collect($this->files)
            ->map(fn (UploadedFile $file): Attachment => Attachment::fromPath($file->getRealPath())
                ->as($file->getClientOriginalName())
                ->withMime((string) $file->getMimeType()))
            ->all();
    }
}
