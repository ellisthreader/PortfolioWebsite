import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { GridScanIcon } from './two-factor-setup-modal/grid-scan-icon';
import { TwoFactorSetupStep } from './two-factor-setup-modal/two-factor-setup-step';
import { TwoFactorVerificationStep } from './two-factor-setup-modal/two-factor-verification-step';
import type {
    ModalConfig,
    TwoFactorSetupModalProps,
} from './two-factor-setup-modal/types';

export default function TwoFactorSetupModal({
    clearSetupData,
    errors,
    fetchSetupData,
    isOpen,
    manualSetupKey,
    onClose,
    qrCodeSvg,
    requiresConfirmation,
    twoFactorEnabled,
}: TwoFactorSetupModalProps) {
    const [showVerificationStep, setShowVerificationStep] = useState(false);
    const fetchSetupDataRef = useRef(fetchSetupData);
    const modalConfig = useMemo<ModalConfig>(() => {
        if (twoFactorEnabled) {
            return {
                buttonText: 'Close',
                description:
                    'Two-factor authentication is now enabled. Scan the QR code or enter the setup key in your authenticator app.',
                title: 'Two-factor authentication enabled',
            };
        }

        if (showVerificationStep) {
            return {
                buttonText: 'Continue',
                description:
                    'Enter the 6-digit code from your authenticator app',
                title: 'Verify authentication code',
            };
        }

        return {
            buttonText: 'Continue',
            description:
                'To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app',
            title: 'Enable two-factor authentication',
        };
    }, [showVerificationStep, twoFactorEnabled]);

    const resetModalState = useCallback(() => {
        setShowVerificationStep(false);
        clearSetupData();
    }, [clearSetupData]);
    const handleClose = useCallback(() => {
        resetModalState();
        onClose();
    }, [onClose, resetModalState]);
    const handleModalNextStep = useCallback(() => {
        if (requiresConfirmation) {
            setShowVerificationStep(true);
            return;
        }

        handleClose();
    }, [handleClose, requiresConfirmation]);

    useEffect(() => {
        fetchSetupDataRef.current = fetchSetupData;
    }, [fetchSetupData]);

    useEffect(() => {
        if (isOpen && !qrCodeSvg) {
            void fetchSetupDataRef.current();
        }
    }, [isOpen, qrCodeSvg]);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="flex items-center justify-center">
                    <GridScanIcon />
                    <DialogTitle>{modalConfig.title}</DialogTitle>
                    <DialogDescription className="text-center">
                        {modalConfig.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center space-y-5">
                    {showVerificationStep ? (
                        <TwoFactorVerificationStep
                            onBack={() => setShowVerificationStep(false)}
                            onClose={handleClose}
                        />
                    ) : (
                        <TwoFactorSetupStep
                            buttonText={modalConfig.buttonText}
                            errors={errors}
                            manualSetupKey={manualSetupKey}
                            onNextStep={handleModalNextStep}
                            qrCodeSvg={qrCodeSvg}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
