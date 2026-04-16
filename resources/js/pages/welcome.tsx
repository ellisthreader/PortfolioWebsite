import { WelcomePage } from '@/features/welcome/components/welcome-page';
import type { WelcomePageProps } from '@/features/welcome/types';

export default function Welcome(props: WelcomePageProps) {
    return <WelcomePage {...props} />;
}
