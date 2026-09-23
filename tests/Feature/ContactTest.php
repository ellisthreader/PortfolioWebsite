<?php

use App\Mail\ContactMessageMail;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Mail;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(fn () => Mail::fake());

$valid = fn (array $overrides = []) => [
    'name' => 'Sam Carter',
    'email' => 'sam@example.com',
    'topic' => 'project',
    'message' => 'We need a booking system for three clinics.',
    ...$overrides,
];

test('the contact page offers the topics', function () {
    $this->get('/contact')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('contact')
            ->where('topics.project', 'A freelance project')
            ->where('sentTo', null));
});

test('a valid message is emailed to Ellis with the sender as reply-to', function () use ($valid) {
    $this->post('/contact', $valid())
        ->assertRedirect('/contact')
        ->assertSessionHas('sentTo', 'sam@example.com');

    Mail::assertSent(ContactMessageMail::class, function (ContactMessageMail $mail) {
        return $mail->hasTo('ellis.threader3001@gmail.com')
            && $mail->hasReplyTo('sam@example.com')
            && $mail->hasSubject('Portfolio enquiry from Sam Carter: A freelance project');
    });
});

test('attachments are sent with the message', function () use ($valid) {
    $this->post('/contact', $valid([
        'attachments' => [
            UploadedFile::fake()->image('floorplan.png'),
            UploadedFile::fake()->create('brief.pdf', 200, 'application/pdf'),
        ],
    ]))->assertSessionHasNoErrors();

    Mail::assertSent(
        ContactMessageMail::class,
        fn (ContactMessageMail $mail) => count($mail->attachments()) === 2,
    );
});

test('the success state is shown after sending', function () use ($valid) {
    $this->followingRedirects()
        ->post('/contact', $valid())
        ->assertInertia(fn (Assert $page) => $page->where('sentTo', 'sam@example.com'));
});

test('missing fields explain how to fix them', function () {
    $this->post('/contact', [])
        ->assertSessionHasErrors([
            'name' => 'Enter your name so I know who I’m replying to.',
            'email' => 'Enter your email address so I can reply.',
            'topic' => 'Choose what your message is about.',
            'message' => 'Write a message before sending.',
        ]);

    Mail::assertNothingSent();
});

test('only images and PDFs can be attached', function () use ($valid) {
    $this->post('/contact', $valid([
        'attachments' => [UploadedFile::fake()->create('virus.exe', 10)],
    ]))->assertSessionHasErrors('attachments.0');
});

test('bots that fill the hidden field are silently ignored', function () use ($valid) {
    $this->post('/contact', $valid(['website' => 'http://spam.example']))
        ->assertRedirect('/contact');

    Mail::assertNothingSent();
});

test('sending is rate limited', function () use ($valid) {
    foreach (range(1, 5) as $attempt) {
        $this->post('/contact', $valid())->assertRedirect();
    }

    $this->post('/contact', $valid())->assertTooManyRequests();
});
