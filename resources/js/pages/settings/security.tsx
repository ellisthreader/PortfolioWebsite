import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

import Heading from '@/components/heading';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import { edit } from '@/routes/security';

import { TwoFactorSettings } from './security/two-factor-settings';
import { UpdatePasswordForm } from './security/update-password-form';

type Props = {
    canManageTwoFactor?: boolean;
    requiresConfirmation?: boolean;
    twoFactorEnabled?: boolean;
};

export default function Security({
    canManageTwoFactor = false,
    requiresConfirmation = false,
    twoFactorEnabled = false,
}: Props) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const [showSetupModal, setShowSetupModal] = useState(false);
    const prevTwoFactorEnabled = useRef(twoFactorEnabled);
    const twoFactorAuth = useTwoFactorAuth();

    useEffect(() => {
        if (prevTwoFactorEnabled.current && !twoFactorEnabled) {
            twoFactorAuth.clearTwoFactorAuthData();
        }

        prevTwoFactorEnabled.current = twoFactorEnabled;
    }, [twoFactorAuth, twoFactorEnabled]);

    return (
        <>
            <Head title="Security settings" />
            <h1 className="sr-only">Security settings</h1>

            <UpdatePasswordForm
                currentPasswordInput={currentPasswordInput}
                passwordInput={passwordInput}
            />

            {canManageTwoFactor && (
                <TwoFactorSettings
                    {...twoFactorAuth}
                    requiresConfirmation={requiresConfirmation}
                    showSetupModal={showSetupModal}
                    setShowSetupModal={setShowSetupModal}
                    twoFactorEnabled={twoFactorEnabled}
                />
            )}
        </>
    );
}

Security.layout = {
    breadcrumbs: [{ title: 'Security settings', href: edit() }],
};
