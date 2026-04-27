import { useEffect, useState } from 'react';
import {
    ClampToEdgeWrapping,
    LinearFilter,
    SRGBColorSpace,
    VideoTexture,
} from 'three';

import { LAPTOP_SCREEN_ASPECT } from './layout-constants';

type LaptopVideoState = {
    texture: VideoTexture | null;
    video: HTMLVideoElement | null;
};

function createLaptopVideoTexture({
    loop,
    src,
}: {
    loop: boolean;
    src: string;
}) {
    const video = document.createElement('video');

    video.src = src;
    video.crossOrigin = 'anonymous';
    video.loop = loop;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    const texture = new VideoTexture(video);

    texture.colorSpace = SRGBColorSpace;
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    texture.wrapS = ClampToEdgeWrapping;
    texture.wrapT = ClampToEdgeWrapping;
    texture.center.set(0.5, 0.5);

    const coverScreen = () => {
        const videoAspect = video.videoWidth / video.videoHeight;

        if (!Number.isFinite(videoAspect) || videoAspect <= 0) return;

        texture.repeat.set(1, 1);
        texture.offset.set(0, 0);

        if (videoAspect > LAPTOP_SCREEN_ASPECT) {
            texture.repeat.x = LAPTOP_SCREEN_ASPECT / videoAspect;
            texture.offset.x = (1 - texture.repeat.x) / 2;
        } else {
            texture.repeat.y = videoAspect / LAPTOP_SCREEN_ASPECT;
            texture.offset.y = (1 - texture.repeat.y) / 2;
        }

        texture.needsUpdate = true;
    };
    const refreshTexture = () => {
        texture.needsUpdate = true;
    };

    video.addEventListener('loadedmetadata', coverScreen);
    video.addEventListener('seeked', refreshTexture);
    video.addEventListener('timeupdate', refreshTexture);
    video.load();

    return {
        dispose: () => {
            video.pause();
            video.removeEventListener('loadedmetadata', coverScreen);
            video.removeEventListener('seeked', refreshTexture);
            video.removeEventListener('timeupdate', refreshTexture);
            texture.dispose();
        },
        texture,
        video,
    };
}

export function useLaptopVideoTexture() {
    const [videoState, setVideoState] = useState<LaptopVideoState>({
        texture: null,
        video: null,
    });

    useEffect(() => {
        const laptopVideo = createLaptopVideoTexture({
            loop: false,
            src: '/VideoLoad.mp4',
        });

        setVideoState({
            texture: laptopVideo.texture,
            video: laptopVideo.video,
        });

        return () => {
            laptopVideo.dispose();
            setVideoState({ texture: null, video: null });
        };
    }, []);

    return videoState;
}
