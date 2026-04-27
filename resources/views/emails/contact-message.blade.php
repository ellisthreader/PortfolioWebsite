<!DOCTYPE html>
<html lang="en">
    <body style="margin:0;padding:32px;background:#05010a;color:#f8fafc;font-family:Arial,sans-serif;">
        <div style="max-width:640px;margin:0 auto;background:#0b0712;border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:32px;">
            <p style="margin:0 0 12px;color:#f0abfc;font-size:12px;letter-spacing:0.28em;text-transform:uppercase;">
                New Portfolio Enquiry
            </p>

            <h1 style="margin:0 0 24px;font-size:28px;line-height:1.2;color:#ffffff;">
                {{ $title }}
            </h1>

            <p style="margin:0 0 8px;color:#cbd5e1;font-size:13px;text-transform:uppercase;letter-spacing:0.18em;">
                From
            </p>
            <p style="margin:0 0 24px;color:#ffffff;font-size:16px;">
                {{ $email }}
            </p>

            <p style="margin:0 0 8px;color:#cbd5e1;font-size:13px;text-transform:uppercase;letter-spacing:0.18em;">
                Message
            </p>
            <div style="color:#e2e8f0;font-size:16px;line-height:1.8;white-space:pre-wrap;">{{ $body }}</div>
        </div>
    </body>
</html>
