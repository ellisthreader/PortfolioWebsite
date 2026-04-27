<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Http\UploadedFile;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMessageMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @param  array<int, UploadedFile>  $attachments
     */
    public function __construct(
        public string $title,
        public string $email,
        public string $body,
        public array $attachments = [],
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Portfolio contact: '.$this->title,
            replyTo: [new Address($this->email)],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact-message',
        );
    }

    public function build(): static
    {
        $mail = $this->view('emails.contact-message');

        foreach ($this->attachments as $attachment) {
            $mail->attach(
                $attachment->getRealPath(),
                [
                    'as' => $attachment->getClientOriginalName(),
                    'mime' => $attachment->getMimeType(),
                ],
            );
        }

        return $mail;
    }
}
