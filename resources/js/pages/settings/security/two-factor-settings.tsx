import { Form } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';

import Heading from '@/components/heading';
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import { Button } from '@/components/ui/button';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import { disable, enable } from '@/routes/two-factor';

type TwoFactorSettingsProps = {
    hasSetupData: boolean;
    requiresConfirmation: boolean;
    showSetupModal: boolean;
    setShowSetupModal: (show: boolean) => void;
    twoFactorEnabled: boolean;
} & Pick<
    ReturnType<typeof useTwoFactorAuth>,
    | 'clearSetupData'
    | 'errors'
    | 'fetchRecoveryCodes'
    | 'fetchSetupData'
    | 'manualSetupKey'
    | 'qrCodeSvg'
    | 'recoveryCodesList'
>;

export function TwoFactorSettings({
    clearSetupData,
    errors,
    fetchRecoveryCodes,
    fetchSetupData,
    hasSetupData,
    manualSetupKey,
    qrCodeSvg,
    recoveryCodesList,
    requiresConfirmation,
    setShowSetupModal,
    showSetupModal,
    twoFactorEnabled,
}: TwoFactorSettingsProps) {
    return (
        <div className="space-y-6">
            <Heading
                variant="small"
                title="Two-factor authentication"
                description="Manage your two-factor authentication settings"
            />
            {twoFactorEnabled ? (
                <div className="flex flex-col items-start justify-start space-y-4">
                    <p className="text-sm text-muted-foreground">
                        You will be prompted for a secure, random pin during
                        login, which you can retrieve from the TOTP-supported
                        application on your phone.
                    </p>

                    <Form {...disable.form()}>
                        {({ processing }) => (
                            <Button
                                variant="destructive"
                                type="submit"
                                disabled={processing}
                            >
                                Disable 2FA
                            </Button>
                        )}
                    </Form>

                    <TwoFactorRecoveryCodes
                        recoveryCodesList={recoveryCodesList}
                        fetchRecoveryCodes={fetchRecoveryCodes}
                        errors={errors}
                    />
                </div>
            ) : (
                <div className="flex flex-col items-start justify-start space-y-4">
                    <p className="text-sm text-muted-foreground">
                        When you enable two-factor authentication, you will be
                        prompted for a secure pin during login. This pin can be
                        retrieved from a TOTP-supported application on your
                        phone.
                    </p>

                    {hasSetupData ? (
                        <Button onClick={() => setShowSetupModal(true)}>
                            <ShieldCheck />
                            Continue setup
                        </Button>
                    ) : (
                        <Form
                            {...enable.form()}
                            onSuccess={() => setShowSetupModal(true)}
                        >
                            {({ processing }) => (
                                <Button type="submit" disabled={processing}>
                                    Enable 2FA
                                </Button>
                            )}
                        </Form>
                    )}
                </div>
            )}

            <TwoFactorSetupModal
                isOpen={showSetupModal}
                onClose={() => setShowSetupModal(false)}
                requiresConfirmation={requiresConfirmation}
                twoFactorEnabled={twoFactorEnabled}
                qrCodeSvg={qrCodeSvg}
                manualSetupKey={manualSetupKey}
                clearSetupData={clearSetupData}
                fetchSetupData={fetchSetupData}
                errors={errors}
            />
        </div>
    );
}
