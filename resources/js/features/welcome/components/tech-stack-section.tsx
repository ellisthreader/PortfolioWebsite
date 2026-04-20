import { OrbitControls } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Color, PerspectiveCamera as ThreePerspectiveCamera } from 'three';
import type { Group } from 'three';

import { TECH_STACK_ITEMS } from '../data/tech-stack-items';
import type { TechStackItem } from '../data/tech-stack-items';

const GLOBE_RADIUS = 5.6;
const GLOBE_SCALE = 1.05;
const CAMERA_FOV = 42;
const CAMERA_VERTICAL_FILL = 0.82;
const CAMERA_HORIZONTAL_FILL = 0.8;
const GLOBE_FRAMING_RADIUS = (GLOBE_RADIUS * 1.12 + 0.115) * GLOBE_SCALE;

function calculateCameraDistance(aspect: number) {
    const safeAspect = Math.max(aspect, 0.1);
    const verticalFov = (CAMERA_FOV * Math.PI) / 180;
    const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * safeAspect);
    const verticalDistance =
        GLOBE_FRAMING_RADIUS / (CAMERA_VERTICAL_FILL * Math.tan(verticalFov / 2));
    const horizontalDistance =
        GLOBE_FRAMING_RADIUS /
        (CAMERA_HORIZONTAL_FILL * Math.tan(horizontalFov / 2));

    return Math.max(verticalDistance, horizontalDistance);
}

function ResponsiveTechGlobeCamera() {
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

function createSpherePosition(index: number, total: number, radius: number) {
    const offset = 2 / total;
    const increment = Math.PI * (3 - Math.sqrt(5));
    const y = index * offset - 1 + offset / 2;
    const radial = Math.sqrt(1 - y * y);
    const phi = index * increment;

    return [Math.cos(phi) * radial * radius, y * radius, Math.sin(phi) * radial * radius] as const;
}

function TechMarker({
    isActive,
    item,
    onFocus,
    position,
}: {
    isActive: boolean;
    item: TechStackItem;
    onFocus: (item: TechStackItem) => void;
    position: readonly [number, number, number];
}) {
    return (
        <group position={position}>
            <mesh onPointerEnter={() => onFocus(item)} onPointerDown={() => onFocus(item)}>
                <sphereGeometry args={[isActive ? 0.07 : 0.052, 10, 10]} />
                <meshBasicMaterial color={item.accent} />
            </mesh>
            {isActive && (
                <mesh>
                    <sphereGeometry args={[0.115, 12, 12]} />
                    <meshBasicMaterial color={item.accent} opacity={0.18} transparent />
                </mesh>
            )}
        </group>
    );
}

function GlobeRings() {
    const latitudeOffsets = [-0.72, -0.42, 0, 0.42, 0.72];
    const longitudeRotations = [0, Math.PI / 6, Math.PI / 3, Math.PI / 2, (2 * Math.PI) / 3];

    return (
        <>
            {latitudeOffsets.map((offset) => {
                const ringRadius = Math.sqrt(GLOBE_RADIUS ** 2 - offset ** 2);

                return (
                    <mesh key={`lat-${offset.toFixed(2)}`} position={[0, offset, 0]}>
                        <torusGeometry args={[ringRadius, 0.006, 8, 72]} />
                        <meshBasicMaterial color="#7c72ff" opacity={0.22} transparent />
                    </mesh>
                );
            })}
            {longitudeRotations.map((rotation) => (
                <mesh key={`lng-${rotation.toFixed(2)}`} rotation={[Math.PI / 2, rotation, 0]}>
                    <torusGeometry args={[GLOBE_RADIUS, 0.006, 8, 72]} />
                    <meshBasicMaterial color="#8f86ff" opacity={0.14} transparent />
                </mesh>
            ))}
        </>
    );
}

function TechGlobe({
    activeItem,
    onActiveItemChange,
}: {
    activeItem: TechStackItem;
    onActiveItemChange: (item: TechStackItem) => void;
}) {
    const globeGroupRef = useRef<Group | null>(null);
    const itemPositions = useMemo(
        () =>
            TECH_STACK_ITEMS.map((item, index) => ({
                item,
                position: createSpherePosition(
                    index,
                    TECH_STACK_ITEMS.length,
                    GLOBE_RADIUS + 0.04,
                ),
            })),
        [],
    );

    return (
        <group ref={globeGroupRef} scale={GLOBE_SCALE}>
            <mesh>
                <sphereGeometry args={[GLOBE_RADIUS * 1.12, 24, 24]} />
                <meshBasicMaterial color="#7c3aed" opacity={0.08} transparent />
            </mesh>

            <mesh>
                <sphereGeometry args={[GLOBE_RADIUS * 1.05, 24, 24]} />
                <meshBasicMaterial color="#60a5fa" opacity={0.04} transparent />
            </mesh>

            <mesh>
                <sphereGeometry args={[GLOBE_RADIUS, 40, 40]} />
                <meshStandardMaterial
                    color="#0d1022"
                    emissive={new Color('#172554')}
                    emissiveIntensity={0.4}
                    metalness={0.12}
                    roughness={0.58}
                />
            </mesh>

            <GlobeRings />

            {itemPositions.map(({ item, position }) => (
                <TechMarker
                    key={item.label}
                    isActive={activeItem.label === item.label}
                    item={item}
                    onFocus={onActiveItemChange}
                    position={position}
                />
            ))}
        </group>
    );
}

export function TechStackSection() {
    const [activeItem, setActiveItem] = useState<TechStackItem>(TECH_STACK_ITEMS[0]);

    return (
        <section className="relative overflow-hidden bg-[#03020b] px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(76,29,149,0.36),transparent_30%),linear-gradient(180deg,#03020b_0%,#08041a_38%,#03020b_100%)]" />
            <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(196,181,253,0.38)_1px,transparent_1.5px)] [background-size:2.9rem_2.9rem]" />
            <div className="absolute left-1/2 top-28 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-fuchsia-500/14 blur-[120px]" />

            <div className="relative mx-auto max-w-[110rem]">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm uppercase tracking-[0.42em] text-fuchsia-200/70">
                        Explore The Stack
                    </p>
                    <h2 className="mt-4 bg-[linear-gradient(180deg,#ffffff_0%,#e9d5ff_40%,#a78bfa_100%)] bg-clip-text text-5xl font-semibold tracking-[-0.08em] text-transparent sm:text-6xl lg:text-[5.25rem]">
                        Tech Globe
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
                        Drag the globe to explore the stack wrapped around it. Each marker
                        sits on the surface of a spinning 3D world and reveals a different
                        part of the build.
                    </p>
                </div>

                <div className="relative mt-10 h-[32rem] overflow-hidden sm:h-[38rem] lg:h-[44rem]">
                    <Canvas
                        camera={{ fov: CAMERA_FOV, position: [0, 0, calculateCameraDistance(1)] }}
                        dpr={1}
                        gl={{ antialias: true, powerPreference: 'high-performance' }}
                    >
                        <ResponsiveTechGlobeCamera />
                        <ambientLight intensity={1.15} />
                        <directionalLight color="#f5d0fe" intensity={1.65} position={[5, 6, 4]} />
                        <pointLight color="#60a5fa" intensity={8} position={[-5, -1, 5]} />
                        <pointLight color="#a855f7" intensity={9} position={[4, 3, 4]} />
                        <TechGlobe
                            activeItem={activeItem}
                            onActiveItemChange={setActiveItem}
                        />
                        <OrbitControls
                            autoRotate
                            autoRotateSpeed={0.7}
                            enablePan={false}
                            enableZoom={false}
                            maxPolarAngle={Math.PI * 0.72}
                            makeDefault
                            minPolarAngle={Math.PI * 0.28}
                        />
                    </Canvas>
                </div>
            </div>
        </section>
    );
}
