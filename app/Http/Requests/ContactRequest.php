<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ContactRequest extends FormRequest
{
    public const TOPICS = [
        'project' => 'A freelance project',
        'role' => 'A full-time role',
        'other' => 'Something else',
    ];

    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:255'],
            'topic' => ['required', Rule::in(array_keys(self::TOPICS))],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
            'attachments' => ['nullable', 'array', 'max:5'],
            'attachments.*' => ['file', 'mimes:jpg,jpeg,png,webp,gif,pdf', 'max:5120'],
            'website' => ['nullable'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Enter your name so I know who I’m replying to.',
            'email.required' => 'Enter your email address so I can reply.',
            'email.email' => 'Enter an email address like name@example.com.',
            'topic.required' => 'Choose what your message is about.',
            'topic.in' => 'Choose what your message is about.',
            'message.required' => 'Write a message before sending.',
            'message.min' => 'Add a little more detail — at least 10 characters.',
            'message.max' => 'Keep the message under 5,000 characters, or attach a document instead.',
            'attachments.max' => 'Attach up to 5 files.',
            'attachments.*.mimes' => 'Attach images (JPG, PNG, WebP, GIF) or PDFs only.',
            'attachments.*.max' => 'Each file must be 5 MB or smaller.',
        ];
    }
}
