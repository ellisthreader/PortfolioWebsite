import { Picture } from '@/components/picture';
import { AppWindow, DeviceScreen } from '@/components/plate';
import { cn } from '@/lib/utils';
import type { GalleryItem, Tone } from '@/types/portfolio';

/** A single screen from a case study, framed the same way as the covers. */
export function GalleryFigure({
    item,
    tone,
    alt,
    className,
}: {
    item: GalleryItem;
    tone: Tone;
    alt: string;
    className?: string;
}) {
    return (
        <figure className={className}>
            <div
                className={cn(
                    'plate flex justify-center',
                    (item.frame === 'browser' || item.frame === 'app') &&
                        'px-[6%] pt-[6%]',
                    item.frame === 'phone' &&
                        'aspect-[4/5] items-start pt-[8%]',
                    item.frame === 'device' && 'items-center p-[9%]',
                )}
                data-tone={tone}
            >
                {item.frame === 'browser' && (
                    <div className="window !relative w-full">
                        <div className="window-bar" aria-hidden />
                        <Picture
                            image={item.image}
                            alt={alt}
                            sizes="(min-width: 1320px) 1100px, 88vw"
                            className="block w-full"
                        />
                    </div>
                )}
                {item.frame === 'phone' && (
                    <div className="phone !relative w-[50cqw]">
                        <Picture
                            image={item.image}
                            alt={alt}
                            sizes="(min-width: 768px) 300px, 46vw"
                            className="block w-full"
                        />
                    </div>
                )}
                {item.frame === 'app' && (
                    <AppWindow
                        image={item.image}
                        alt={alt}
                        sizes="(min-width: 1320px) 1100px, 88vw"
                        className="!relative w-full"
                    />
                )}
                {item.frame === 'device' && (
                    <DeviceScreen
                        image={item.image}
                        alt={alt}
                        sizes="(min-width: 1320px) 340px, (min-width: 640px) 28vw, 82vw"
                        className="w-full"
                    />
                )}
                {item.frame === 'image' && (
                    <Picture
                        image={item.image}
                        alt={alt}
                        sizes="(min-width: 1320px) 1224px, 94vw"
                        className="block w-full"
                    />
                )}
            </div>
            {item.caption && (
                <figcaption className="type-meta mt-3">
                    {item.caption}
                </figcaption>
            )}
        </figure>
    );
}
