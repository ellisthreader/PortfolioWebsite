import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo } from 'react';

import {
    PORTFOLIO_HERO_DESK_MODEL_URL,
    PORTFOLIO_HERO_DESK_POSITION,
    PORTFOLIO_HERO_DESK_SCALE,
} from './layout-constants';

export function PortfolioHeroDeskSet() {
    const { scene } = useGLTF(PORTFOLIO_HERO_DESK_MODEL_URL);
    const deskScene = useMemo(() => scene.clone(true), [scene]);

    useEffect(() => {
        deskScene.traverse((object) => {
            object.castShadow = true;
            object.receiveShadow = true;
            object.frustumCulled = false;
        });
    }, [deskScene]);

    return (
        <primitive
            object={deskScene}
            position={PORTFOLIO_HERO_DESK_POSITION}
            scale={PORTFOLIO_HERO_DESK_SCALE}
        />
    );
}
