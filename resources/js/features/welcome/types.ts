export type MutableNumberRef = { current: number };

export type ExperienceItem = {
    year: string;
    title: string;
    subtitle: string;
    description: string;
};

export type ProjectItem = {
    index: string;
    title: string;
    category: string;
    description: string;
    accent: string;
    imageUrl?: string;
    transparentImage?: boolean;
    isCta?: boolean;
    href?: string;
    buttonLabel?: string;
};

export type WelcomePageProps = {
    modelUrl: string;
};
