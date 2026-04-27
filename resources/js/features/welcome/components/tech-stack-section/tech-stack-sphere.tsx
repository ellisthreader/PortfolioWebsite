import { Canvas } from '@react-three/fiber';
import type { Object3D } from 'three';
import { OrbitControls } from '@react-three/drei';

import { CAMERA_FOV, calculateCameraDistance } from './constants';
import { HolographicSphere } from './holographic-sphere';
import { ResponsiveSphereCamera } from './responsive-sphere-camera';
import { TechStackIconProjection } from './tech-stack-icon-projection';

type TechStackSphereProps = {
    activeLabel: string | null;
    iconAnchorRefs: React.MutableRefObject<Array<Object3D | null>>;
    iconElementRefs: React.MutableRefObject<Array<HTMLDivElement | null>>;
};

export function TechStackSphere({
    activeLabel,
    iconAnchorRefs,
    iconElementRefs,
}: TechStackSphereProps) {
    return (
        <Canvas
            camera={{
                fov: CAMERA_FOV,
                position: [0, 0, calculateCameraDistance(1)],
            }}
            dpr={[1, 1.25]}
            gl={{
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance',
            }}
        >
            <ResponsiveSphereCamera />
            <TechStackIconProjection
                activeLabel={activeLabel}
                iconAnchorRefs={iconAnchorRefs}
                iconElementRefs={iconElementRefs}
            />
            <HolographicSphere iconAnchorRefs={iconAnchorRefs} />
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                makeDefault
                rotateSpeed={0.65}
            />
        </Canvas>
    );
}
