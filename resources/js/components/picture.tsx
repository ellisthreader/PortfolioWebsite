import type { CSSProperties } from 'react';
import type { ImageSet } from '@/types/portfolio';

type PictureProps = {
    image: ImageSet;
    alt: string;
    sizes: string;
    priority?: boolean;
    className?: string;
    style?: CSSProperties;
};

/** Responsive AVIF/WebP image with intrinsic size, so nothing shifts while loading. */
export function Picture({
    image,
    alt,
    sizes,
    priority = false,
    className,
    style,
}: PictureProps) {
    return (
        <picture>
            <source type="image/avif" srcSet={image.avif} sizes={sizes} />
            <source type="image/webp" srcSet={image.webp} sizes={sizes} />
            <img
                src={image.src}
                alt={alt}
                width={image.width}
                height={image.height}
                loading={priority ? 'eager' : 'lazy'}
                decoding={priority ? 'sync' : 'async'}
                fetchPriority={priority ? 'high' : 'auto'}
                className={className}
                style={style}
            />
        </picture>
    );
}
