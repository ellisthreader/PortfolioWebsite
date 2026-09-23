export type ImageSet = {
    src: string;
    avif: string;
    webp: string;
    width: number;
    height: number;
};

export type Tone = 'porcelain' | 'mist' | 'stone' | 'graphite' | 'moss';

export type ProjectType = 'client' | 'product' | 'ai-system' | 'other';

export type CoverLayout =
    | 'browser'
    | 'browser-phone'
    | 'app'
    | 'cutout'
    | 'phones'
    | 'device'
    | 'image'
    | 'diagram';

export type DiagramStep = { label: string; detail?: string };

export type Diagram = {
    title?: string;
    steps: DiagramStep[];
    caption?: string;
};

export type ProjectCover = {
    layout: CoverLayout;
    desktop: ImageSet | null;
    mobile: ImageSet | null;
    image: ImageSet | null;
    focus: string | null;
    url: string | null;
    diagram: Diagram | null;
};

export type ProjectSummary = {
    slug: string;
    title: string;
    summary: string;
    type: ProjectType;
    category: string | null;
    year: string;
    role: string | null;
    client: string | null;
    stack: string[];
    links: ProjectLinks;
    tone: Tone;
    cover: ProjectCover;
};

export type CaseStudy = {
    brief?: string[];
    built?: { title: string; body: string }[];
    architecture?: string[];
    outcome?: string[];
};

export type GalleryItem = {
    frame: 'browser' | 'app' | 'phone' | 'device' | 'image';
    caption: string | null;
    image: ImageSet;
};

export type Project = ProjectSummary & {
    caseStudy: CaseStudy;
    gallery: GalleryItem[];
    /** How the system fits together, shown under “How it works”. */
    diagram: Diagram | null;
};

/** A project in the home page's compact index. */
export type ProjectIndexItem = Pick<
    ProjectSummary,
    'slug' | 'title' | 'type' | 'category' | 'year'
>;

export type SpotlightProject = ProjectSummary & {
    points: string[];
};

export type ProjectLinks = { live?: string; liveLabel?: string; repo?: string };

export type LatestPush = {
    repo: string;
    url: string;
    pushedAt: string;
};

export type Site = {
    name: string;
    role: string;
    location: string;
    email: string;
    availability: { open: boolean; label: string };
    links: { github: string | null; linkedin: string | null };
    cv: string | null;
};
