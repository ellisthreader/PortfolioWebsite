import { useLayoutEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { PerspectiveCamera as ThreePerspectiveCamera } from 'three';

import { CAMERA_FOV, calculateCameraDistance } from './constants';

export function ResponsiveSphereCamera() {
    const { camera, size } = useThree();

    useLayoutEffect(() => {
        if (!(camera instanceof ThreePerspectiveCamera)) return;

        const distance = calculateCameraDistance(size.width / size.height);

        camera.fov = CAMERA_FOV;
        camera.near = 0.1;
        camera.far = 200;
        camera.position.set(0, 0, distance);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
    }, [camera, size.height, size.width]);

    return null;
}
