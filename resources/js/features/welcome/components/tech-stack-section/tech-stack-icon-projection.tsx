import { useFrame, type RootState } from '@react-three/fiber';
import { useRef } from 'react';
import { MathUtils, Vector3, type Object3D } from 'three';

import { TECH_STACK_ITEMS } from '../../data/tech-stack-items';
import { FRONT_VISIBILITY_END, FRONT_VISIBILITY_START } from './constants';

type TechStackIconProjectionProps = {
    activeLabel: string | null;
    iconAnchorRefs: React.MutableRefObject<Array<Object3D | null>>;
    iconElementRefs: React.MutableRefObject<Array<HTMLDivElement | null>>;
};

export function TechStackIconProjection({
    activeLabel,
    iconAnchorRefs,
    iconElementRefs,
}: TechStackIconProjectionProps) {
    const worldPositionRef = useRef(new Vector3());
    const projectedPositionRef = useRef(new Vector3());
    const outwardNormalRef = useRef(new Vector3());
    const toCameraRef = useRef(new Vector3());

    useFrame((state: RootState) => {
        iconAnchorRefs.current.forEach((anchor, index) => {
            const element = iconElementRefs.current[index];

            if (!anchor || !element) return;

            anchor.getWorldPosition(worldPositionRef.current);
            projectedPositionRef.current
                .copy(worldPositionRef.current)
                .project(state.camera);

            if (
                projectedPositionRef.current.z <= -1 ||
                projectedPositionRef.current.z >= 1
            ) {
                element.style.opacity = '0';
                element.style.pointerEvents = 'none';
                return;
            }

            outwardNormalRef.current.copy(worldPositionRef.current).normalize();
            toCameraRef.current
                .copy(state.camera.position)
                .sub(worldPositionRef.current)
                .normalize();

            const frontVisibility = MathUtils.smoothstep(
                MathUtils.clamp(
                    outwardNormalRef.current.dot(toCameraRef.current),
                    -1,
                    1,
                ),
                FRONT_VISIBILITY_START,
                FRONT_VISIBILITY_END,
            );
            const isActive = activeLabel === TECH_STACK_ITEMS[index].label;
            const visibility = MathUtils.lerp(0.04, 1, frontVisibility);
            const scale = isActive
                ? MathUtils.lerp(1.12, 1.42, frontVisibility)
                : MathUtils.lerp(0.98, 1.16, frontVisibility);
            const grayscale = MathUtils.lerp(1, 0, frontVisibility);
            const brightness = MathUtils.lerp(0.42, 1.04, frontVisibility);
            const x =
                (projectedPositionRef.current.x * 0.5 + 0.5) * state.size.width;
            const y =
                (-projectedPositionRef.current.y * 0.5 + 0.5) *
                state.size.height;

            element.style.opacity = visibility.toFixed(3);
            element.style.transform =
                `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) ` +
                `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
            element.style.filter = `grayscale(${grayscale.toFixed(3)}) brightness(${brightness.toFixed(3)})`;
            element.style.pointerEvents =
                frontVisibility > 0.56 || isActive ? 'auto' : 'none';
            element.style.zIndex = `${isActive ? 50 : Math.round(frontVisibility * 20)}`;
        });
    });

    return null;
}
