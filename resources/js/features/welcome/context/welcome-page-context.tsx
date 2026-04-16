import { createContext, useContext, type PropsWithChildren } from 'react';

type WelcomePageContextValue = {
    modelUrl: string;
};

const WelcomePageContext = createContext<WelcomePageContextValue | null>(null);

export function WelcomePageProvider({
    children,
    modelUrl,
}: PropsWithChildren<WelcomePageContextValue>) {
    return (
        <WelcomePageContext.Provider value={{ modelUrl }}>
            {children}
        </WelcomePageContext.Provider>
    );
}

export function useWelcomePageContext() {
    const context = useContext(WelcomePageContext);

    if (!context) {
        throw new Error('useWelcomePageContext must be used within WelcomePageProvider');
    }

    return context;
}
