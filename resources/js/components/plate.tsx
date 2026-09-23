import { Picture } from '@/components/picture';
import { cn, scaleSizes } from '@/lib/utils';
import type { Diagram, ImageSet, ProjectSummary } from '@/types/portfolio';

/**
 * Share of the plate's width each frame fills, used to pick image sizes.
 * Mirrored in App\Support\Portfolio\Seo::FRAME_SHARE for the preload hint.
 */
export const FRAME_SHARE = {
    browser: 0.86,
    browserBesidePhone: 0.76,
    phoneBesideBrowser: 0.21,
    phone: 0.3,
    device: 0.66,
    cutout: 0.32,
} as const;

type PlateProps = {
    project: ProjectSummary;
    /** Tailwind aspect class for the plate, e.g. 'aspect-[16/10]'. */
    aspect?: string;
    /** Rendered width of the plate, for srcset selection. */
    sizes: string;
    priority?: boolean;
    className?: string;
};

/**
 * A project’s cover: its real screens staged on a tone field.
 * Every project uses the same frames, so the work reads as one body of work.
 */
export function Plate({
    project,
    aspect = 'aspect-[16/10]',
    sizes,
    priority = false,
    className,
}: PlateProps) {
    const { cover, title } = project;

    return (
        <div
            className={cn('plate', aspect, className)}
            data-tone={project.tone}
        >
            {cover.layout === 'image' && cover.image && (
                <Picture
                    image={cover.image}
                    alt={`${title}`}
                    sizes={sizes}
                    priority={priority}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: cover.focus ?? 'center' }}
                />
            )}

            {cover.layout === 'browser' && cover.desktop && (
                <BrowserWindow
                    image={cover.desktop}
                    url={cover.url}
                    alt={`${title} on desktop`}
                    sizes={scaleSizes(sizes, FRAME_SHARE.browser)}
                    priority={priority}
                    className="top-[7cqw] left-[7cqw] w-[86cqw]"
                />
            )}

            {cover.layout === 'app' && cover.desktop && (
                <AppWindow
                    image={cover.desktop}
                    alt={`${title} on desktop`}
                    sizes={scaleSizes(sizes, FRAME_SHARE.browser)}
                    priority={priority}
                    className="top-[7cqw] left-[7cqw] w-[86cqw]"
                />
            )}

            {cover.layout === 'cutout' && cover.image && (
                <div className="cutout">
                    <Picture
                        image={cover.image}
                        alt={`${title} running`}
                        sizes={scaleSizes(sizes, FRAME_SHARE.cutout)}
                        priority={priority}
                    />
                    {cover.mobile && (
                        <Picture
                            image={cover.mobile}
                            alt={`${title}, second view`}
                            sizes={scaleSizes(sizes, FRAME_SHARE.cutout)}
                            priority={priority}
                        />
                    )}
                </div>
            )}

            {cover.layout === 'browser-phone' && (
                <>
                    {cover.desktop && (
                        <BrowserWindow
                            image={cover.desktop}
                            url={cover.url}
                            alt={`${title} on desktop`}
                            sizes={scaleSizes(
                                sizes,
                                FRAME_SHARE.browserBesidePhone,
                            )}
                            priority={priority}
                            className="top-[7cqw] left-[6cqw] w-[76cqw]"
                        />
                    )}
                    {cover.mobile && (
                        <Phone
                            image={cover.mobile}
                            alt={`${title} on a phone`}
                            sizes={scaleSizes(
                                sizes,
                                FRAME_SHARE.phoneBesideBrowser,
                            )}
                            className="top-[17cqw] right-[6cqw] w-[21cqw]"
                        />
                    )}
                </>
            )}

            {cover.layout === 'device' && cover.image && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <DeviceScreen
                        image={cover.image}
                        alt={`${title} running on its touchscreen`}
                        sizes={scaleSizes(sizes, FRAME_SHARE.device)}
                        priority={priority}
                        className="w-[66cqw]"
                    />
                </div>
            )}

            {cover.layout === 'diagram' && cover.diagram && (
                <DiagramView diagram={cover.diagram} title={title} />
            )}

            {cover.layout === 'phones' && cover.mobile && (
                <Phone
                    image={cover.mobile}
                    alt={`${title} on a phone`}
                    sizes={scaleSizes(sizes, FRAME_SHARE.phone)}
                    priority={priority}
                    className="top-[6cqw] left-1/2 w-[30cqw] -translate-x-1/2"
                />
            )}
        </div>
    );
}

/** How a system fits together, drawn as a flow of steps on the plate. */
export function DiagramView({
    diagram,
    title,
}: {
    diagram: Diagram;
    title: string;
}) {
    const label = `How ${title} works: ${diagram.steps.map((step) => step.label).join(', then ')}.`;

    return (
        <div className="diagram" role="img" aria-label={label}>
            {diagram.title && (
                <p className="diagram-title" aria-hidden>
                    {diagram.title}
                </p>
            )}
            <ol className="diagram-flow" aria-hidden>
                {diagram.steps.map((step) => (
                    <li key={step.label} className="diagram-node">
                        <span className="diagram-label">{step.label}</span>
                        {step.detail && (
                            <span className="diagram-detail">
                                {step.detail}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
            {diagram.caption && (
                <p className="diagram-caption" aria-hidden>
                    {diagram.caption}
                </p>
            )}
        </div>
    );
}

export function DeviceScreen({
    image,
    alt,
    sizes,
    priority,
    className,
}: {
    image: ImageSet;
    alt: string;
    sizes: string;
    priority?: boolean;
    className?: string;
}) {
    return (
        <div className={cn('device', className)}>
            <Picture
                image={image}
                alt={alt}
                sizes={sizes}
                priority={priority}
            />
        </div>
    );
}

export function BrowserWindow({
    image,
    url,
    alt,
    sizes,
    priority,
    className,
}: {
    image: ImageSet;
    url: string | null;
    alt: string;
    sizes: string;
    priority?: boolean;
    className?: string;
}) {
    return (
        <div className={cn('window', className)}>
            <div className="window-bar" aria-hidden>
                {url && <span className="window-url">{url}</span>}
            </div>
            <Picture
                image={image}
                alt={alt}
                sizes={sizes}
                priority={priority}
                className="block w-full"
            />
        </div>
    );
}

/** A desktop app's own window: its screenshot already includes the title bar. */
export function AppWindow({
    image,
    alt,
    sizes,
    priority,
    className,
}: {
    image: ImageSet;
    alt: string;
    sizes: string;
    priority?: boolean;
    className?: string;
}) {
    return (
        <div className={cn('window', className)}>
            <Picture
                image={image}
                alt={alt}
                sizes={sizes}
                priority={priority}
                className="block w-full"
            />
        </div>
    );
}

export function Phone({
    image,
    alt,
    sizes,
    priority,
    className,
}: {
    image: ImageSet;
    alt: string;
    sizes: string;
    priority?: boolean;
    className?: string;
}) {
    return (
        <div className={cn('phone', className)}>
            <Picture
                image={image}
                alt={alt}
                sizes={sizes}
                priority={priority}
                className="block w-full"
            />
        </div>
    );
}
