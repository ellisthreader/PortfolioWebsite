import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
    AdditiveBlending,
    Color,
    IcosahedronGeometry,
    WireframeGeometry,
    type Group,
    type LineSegments,
    type Object3D,
} from 'three';

import { TECH_STACK_ITEMS } from '../../data/tech-stack-items';
import {
    DISABLE_RAYCAST,
    ICON_SPHERE_RADIUS,
    SPHERE_RADIUS,
    SPHERE_SCALE,
    createSpherePosition,
} from './constants';

export function HolographicSphere({
    iconAnchorRefs,
}: {
    iconAnchorRefs: React.MutableRefObject<Array<Object3D | null>>;
}) {
    const sphereRef = useRef<LineSegments | null>(null);
    const outerShellRef = useRef<LineSegments | null>(null);
    const innerShellRef = useRef<LineSegments | null>(null);
    const iconLayerRef = useRef<Group | null>(null);
    const iconPositions = useMemo(
        () =>
            TECH_STACK_ITEMS.map((_, index) =>
                createSpherePosition(
                    index,
                    TECH_STACK_ITEMS.length,
                    ICON_SPHERE_RADIUS,
                ),
            ),
        [],
    );
    const baseWireframe = useMemo(
        () => new WireframeGeometry(new IcosahedronGeometry(SPHERE_RADIUS, 6)),
        [],
    );
    const outerWireframe = useMemo(
        () =>
            new WireframeGeometry(
                new IcosahedronGeometry(SPHERE_RADIUS * 1.008, 5),
            ),
        [],
    );
    const innerWireframe = useMemo(
        () =>
            new WireframeGeometry(
                new IcosahedronGeometry(SPHERE_RADIUS * 0.992, 4),
            ),
        [],
    );

    useFrame((_, delta) => {
        const rotationStep = delta * 0.08;

        if (sphereRef.current) {
            sphereRef.current.rotation.y += rotationStep;
            sphereRef.current.rotation.x += delta * 0.012;
        }

        if (outerShellRef.current) {
            outerShellRef.current.rotation.y -= delta * 0.03;
            outerShellRef.current.rotation.z += delta * 0.008;
        }

        if (innerShellRef.current) {
            innerShellRef.current.rotation.y += delta * 0.045;
            innerShellRef.current.rotation.x -= delta * 0.006;
        }

        if (iconLayerRef.current) {
            iconLayerRef.current.rotation.y += rotationStep;
            iconLayerRef.current.rotation.x += delta * 0.012;
        }
    });

    return (
        <group scale={SPHERE_SCALE}>
            <lineSegments
                geometry={outerWireframe}
                raycast={DISABLE_RAYCAST}
                ref={outerShellRef}
            >
                <lineBasicMaterial
                    blending={AdditiveBlending}
                    color={new Color('#8b5cf6')}
                    opacity={0.14}
                    toneMapped={false}
                    transparent
                />
            </lineSegments>
            <lineSegments
                geometry={baseWireframe}
                raycast={DISABLE_RAYCAST}
                ref={sphereRef}
            >
                <lineBasicMaterial
                    blending={AdditiveBlending}
                    color={new Color('#c084fc')}
                    opacity={0.32}
                    toneMapped={false}
                    transparent
                />
            </lineSegments>
            <lineSegments
                geometry={innerWireframe}
                raycast={DISABLE_RAYCAST}
                ref={innerShellRef}
            >
                <lineBasicMaterial
                    blending={AdditiveBlending}
                    color={new Color('#6d28d9')}
                    opacity={0.11}
                    toneMapped={false}
                    transparent
                />
            </lineSegments>
            <group ref={iconLayerRef}>
                {iconPositions.map((position, index) => (
                    <group
                        key={TECH_STACK_ITEMS[index].label}
                        position={position}
                        ref={(node) => {
                            iconAnchorRefs.current[index] = node;
                        }}
                    />
                ))}
            </group>
        </group>
    );
}
