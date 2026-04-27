import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, Vector3, type PerspectiveCamera } from 'three';

import type { MutableNumberRef } from '../../types';

const SCROLL_CAMERA_POSITION = new Vector3(0.36, 2.74, 4.78);
const SCROLL_CAMERA_LOOK_AT = new Vector3(-0.105, 0.18, 0.56);

export function HeroCameraRig({
    scrollProgressRef: _scrollProgressRef,
}: {
    scrollProgressRef: MutableNumberRef;
}) {
    const { camera } = useThree();
    const cameraRef = useRef<PerspectiveCamera | null>(null);

    useEffect(() => {
        cameraRef.current = camera as PerspectiveCamera;
    }, [camera]);

    useFrame((_, delta) => {
        const perspectiveCamera = cameraRef.current;

        if (!perspectiveCamera) return;

        perspectiveCamera.position.x = MathUtils.damp(
            perspectiveCamera.position.x,
            SCROLL_CAMERA_POSITION.x,
            5.6,
            delta,
        );
        perspectiveCamera.position.y = MathUtils.damp(
            perspectiveCamera.position.y,
            SCROLL_CAMERA_POSITION.y,
            5.6,
            delta,
        );
        perspectiveCamera.position.z = MathUtils.damp(
            perspectiveCamera.position.z,
            SCROLL_CAMERA_POSITION.z,
            5.6,
            delta,
        );
        perspectiveCamera.fov = MathUtils.damp(
            perspectiveCamera.fov,
            20.5,
            6.8,
            delta,
        );
        perspectiveCamera.lookAt(SCROLL_CAMERA_LOOK_AT);
        perspectiveCamera.updateProjectionMatrix();
    });

    return null;
}

export function StaticHeroCameraRig() {
    const { camera } = useThree();

    useEffect(() => {
        const perspectiveCamera = camera as PerspectiveCamera;

        perspectiveCamera.position.set(0.92, 1.86, 6.4);
        perspectiveCamera.fov = 23.2;
        perspectiveCamera.lookAt(1.36, 1.48, 1.12);
        perspectiveCamera.updateProjectionMatrix();
    }, [camera]);

    return null;
}
