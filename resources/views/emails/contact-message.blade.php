<!DOCTYPE html>
<html lang="en">
    <body style="margin:0;padding:32px 16px;background:#f4f5f3;color:#15171a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #dfe1dd;border-radius:14px;padding:32px;">
            <p style="margin:0 0 4px;color:#5c6168;font-size:14px;">New message from your portfolio</p>
            <h1 style="margin:0 0 24px;font-size:24px;line-height:1.25;font-weight:600;">{{ $topic }}</h1>

            <table role="presentation" style="width:100%;border-collapse:collapse;margin:0 0 24px;font-size:15px;">
                <tr>
                    <td style="padding:8px 0;color:#5c6168;width:80px;vertical-align:top;">From</td>
                    <td style="padding:8px 0;">{{ $senderName }}</td>
                </tr>
                <tr>
                    <td style="padding:8px 0;color:#5c6168;vertical-align:top;">Email</td>
                    <td style="padding:8px 0;"><a href="mailto:{{ $senderEmail }}" style="color:#0e5a45;">{{ $senderEmail }}</a></td>
                </tr>
                @if (count($files) > 0)
                    <tr>
                        <td style="padding:8px 0;color:#5c6168;vertical-align:top;">Files</td>
                        <td style="padding:8px 0;">{{ count($files) }} attached</td>
                    </tr>
                @endif
            </table>

            <div style="border-top:1px solid #dfe1dd;padding-top:24px;font-size:16px;line-height:1.6;white-space:pre-wrap;">{{ $body }}</div>

            <p style="margin:32px 0 0;color:#5c6168;font-size:13px;">Reply to this email to answer {{ $senderName }} directly.</p>
        </div>
    </body>
</html>
