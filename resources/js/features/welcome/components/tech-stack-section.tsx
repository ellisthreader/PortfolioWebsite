import { OrbitControls } from '@react-three/drei';
import { Canvas, type RootState, useFrame, useThree } from '@react-three/fiber';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
    AdditiveBlending,
    Color,
    MathUtils,
    type Group,
    IcosahedronGeometry,
    type Object3D,
    PerspectiveCamera as ThreePerspectiveCamera,
    Vector3,
    WireframeGeometry,
    type LineSegments,
} from 'three';

import { TECH_STACK_ITEMS } from '../data/tech-stack-items';

const SPHERE_RADIUS = 5.7;
const SPHERE_SCALE = 1.02;
const CAMERA_FOV = 38;
const CAMERA_VERTICAL_FILL = 0.8;
const CAMERA_HORIZONTAL_FILL = 0.8;
const SPHERE_FRAMING_RADIUS = SPHERE_RADIUS * 1.2 * SPHERE_SCALE;
const ICON_SPHERE_RADIUS = SPHERE_RADIUS * 0.995;
const FRONT_VISIBILITY_START = 0.18;
const FRONT_VISIBILITY_END = 0.84;
const DISABLE_RAYCAST = () => null;

function calculateCameraDistance(aspect: number) {
    const safeAspect = Math.max(aspect, 0.1);
    const verticalFov = (CAMERA_FOV * Math.PI) / 180;
    const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * safeAspect);
    const verticalDistance =
        SPHERE_FRAMING_RADIUS / (CAMERA_VERTICAL_FILL * Math.tan(verticalFov / 2));
    const horizontalDistance =
        SPHERE_FRAMING_RADIUS /
        (CAMERA_HORIZONTAL_FILL * Math.tan(horizontalFov / 2));

    return Math.max(verticalDistance, horizontalDistance);
}

function createSpherePosition(index: number, total: number, radius: number) {
    const offset = 2 / total;
    const increment = Math.PI * (3 - Math.sqrt(5));
    const y = index * offset - 1 + offset / 2;
    const radial = Math.sqrt(1 - y * y);
    const phi = index * increment;

    return [Math.cos(phi) * radial * radius, y * radius, Math.sin(phi) * radial * radius] as const;
}

function ResponsiveSphereCamera() {
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

function ProjectedTechIcons({
    activeLabel,
    iconAnchorRefs,
    iconElementRefs,
}: {
    activeLabel: string | null;
    iconAnchorRefs: React.MutableRefObject<Array<Object3D | null>>;
    iconElementRefs: React.MutableRefObject<Array<HTMLDivElement | null>>;
}) {
    const worldPositionRef = useRef(new Vector3());
    const projectedPositionRef = useRef(new Vector3());
    const outwardNormalRef = useRef(new Vector3());
    const toCameraRef = useRef(new Vector3());

    useFrame((state: RootState) => {
        iconAnchorRefs.current.forEach((anchor, index) => {
            const element = iconElementRefs.current[index];

            if (!anchor || !element) return;

            anchor.getWorldPosition(worldPositionRef.current);
            projectedPositionRef.current.copy(worldPositionRef.current).project(state.camera);

            const isInsideClipSpace =
                projectedPositionRef.current.z > -1 && projectedPositionRef.current.z < 1;

            if (!isInsideClipSpace) {
                element.style.opacity = '0';
                element.style.pointerEvents = 'none';
                return;
            }

            outwardNormalRef.current.copy(worldPositionRef.current).normalize();
            toCameraRef.current
                .copy(state.camera.position)
                .sub(worldPositionRef.current)
                .normalize();

            const frontness = MathUtils.clamp(
                outwardNormalRef.current.dot(toCameraRef.current),
                -1,
                1,
            );
            const frontVisibility = MathUtils.smoothstep(
                frontness,
                FRONT_VISIBILITY_START,
                FRONT_VISIBILITY_END,
            );
            const isActive = activeLabel === TECH_STACK_ITEMS[index].label;
            const visibility = MathUtils.lerp(0.04, 1, frontVisibility);
            const scale = isActive
                ? MathUtils.lerp(1.02, 1.28, frontVisibility)
                : MathUtils.lerp(0.9, 1.08, frontVisibility);
            const grayscale = MathUtils.lerp(1, 0, frontVisibility);
            const brightness = MathUtils.lerp(0.42, 1.04, frontVisibility);
            const x = (projectedPositionRef.current.x * 0.5 + 0.5) * state.size.width;
            const y = (-projectedPositionRef.current.y * 0.5 + 0.5) * state.size.height;

            element.style.opacity = visibility.toFixed(3);
            element.style.transform =
                `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) ` +
                `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
            element.style.filter =
                `grayscale(${grayscale.toFixed(3)}) brightness(${brightness.toFixed(3)})`;
            element.style.pointerEvents = frontVisibility > 0.56 || isActive ? 'auto' : 'none';
            element.style.zIndex = `${isActive ? 50 : Math.round(frontVisibility * 20)}`;
        });
    });

    return null;
}

function HolographicSphere({
    activeLabel,
    iconAnchorRefs,
}: {
    activeLabel: string | null;
    iconAnchorRefs: React.MutableRefObject<Array<Object3D | null>>;
}) {
    const sphereRef = useRef<LineSegments | null>(null);
    const outerShellRef = useRef<LineSegments | null>(null);
    const innerShellRef = useRef<LineSegments | null>(null);
    const iconLayerRef = useRef<Group | null>(null);
    const iconPositions = useMemo(
        () =>
            TECH_STACK_ITEMS.map((_, index) =>
                createSpherePosition(index, TECH_STACK_ITEMS.length, ICON_SPHERE_RADIUS),
            ),
        [],
    );

    const baseWireframe = useMemo(() => {
        const geometry = new IcosahedronGeometry(SPHERE_RADIUS, 6);
        return new WireframeGeometry(geometry);
    }, []);

    const outerWireframe = useMemo(() => {
        const geometry = new IcosahedronGeometry(SPHERE_RADIUS * 1.008, 5);
        return new WireframeGeometry(geometry);
    }, []);

    const innerWireframe = useMemo(() => {
        const geometry = new IcosahedronGeometry(SPHERE_RADIUS * 0.992, 4);
        return new WireframeGeometry(geometry);
    }, []);

    useFrame((_, delta) => {
        if (activeLabel) {
            return;
        }

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

export function TechStackSection() {
    const [activeLabel, setActiveLabel] = useState<string | null>(null);
    const iconAnchorRefs = useRef<Array<Object3D | null>>([]);
    const iconElementRefs = useRef<Array<HTMLDivElement | null>>([]);

    return (
        <section
            className="relative overflow-hidden bg-[#04010b] px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-32"
            onPointerLeave={() => setActiveLabel(null)}
        >
            <img
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-72 will-change-transform [animation:tech-space-drift_24s_ease-in-out_infinite]"
                src="/Space.png"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_34%,rgba(0,0,0,0.22)_68%,rgba(0,0,0,0.58)_100%),linear-gradient(90deg,rgba(0,0,0,0.5)_0%,transparent_14%,transparent_86%,rgba(0,0,0,0.5)_100%),linear-gradient(180deg,rgba(0,0,0,0.54)_0%,transparent_16%,transparent_84%,rgba(0,0,0,0.6)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_28%,rgba(192,132,252,0.16)_0%,transparent_34%),radial-gradient(circle_at_76%_34%,rgba(139,92,246,0.14)_0%,transparent_30%),radial-gradient(circle_at_50%_78%,rgba(217,70,239,0.12)_0%,transparent_34%)] opacity-60 will-change-transform [animation:tech-space-aurora_18s_ease-in-out_infinite]" />
            <div className="pointer-events-none absolute inset-y-0 left-[-12%] w-[44%] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.12)_48%,transparent_100%)] opacity-10 mix-blend-screen blur-3xl will-change-transform [animation:tech-space-shimmer_14s_ease-in-out_infinite]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(139,92,246,0.14),transparent_24%),linear-gradient(180deg,rgba(4,1,11,0.44)_0%,rgba(9,3,18,0.38)_40%,rgba(3,1,8,0.6)_100%)]" />

            <div className="relative mx-auto max-w-[72rem]">
                <div className="flex justify-center text-center">
                    <div className="relative inline-flex flex-col items-center">
                        <h2 className="bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(253,232,255,0.97)_28%,_rgba(240,171,252,0.82)_64%,_rgba(217,70,239,0.72)_100%)] bg-clip-text pr-[0.08em] font-sans text-6xl font-semibold tracking-[-0.075em] text-transparent drop-shadow-[0_0_18px_rgba(236,72,153,0.18)] sm:text-7xl lg:text-[5.6rem]">
                            My Tech Stack
                        </h2>
                        <div className="mt-5 h-px w-44 bg-gradient-to-r from-transparent via-fuchsia-300/65 to-transparent" />
                    </div>
                </div>

                <div className="relative mx-auto mt-12 h-[34rem] max-w-[72rem] overflow-hidden sm:h-[40rem] lg:h-[46rem]">
                    <div className="pointer-events-none absolute inset-0 z-10">
                        {TECH_STACK_ITEMS.map((item, index) => {
                            const isActive = activeLabel === item.label;

                            return (
                                <div
                                    key={item.label}
                                    className="absolute left-0 top-0 flex flex-col items-center gap-2 transition-[opacity,transform,filter] duration-150 will-change-transform"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setActiveLabel(item.label);
                                    }}
                                    onMouseEnter={() => setActiveLabel(item.label)}
                                    onMouseLeave={() => setActiveLabel(null)}
                                    ref={(node) => {
                                        iconElementRefs.current[index] = node;
                                    }}
                                    style={{
                                        opacity: 0,
                                        pointerEvents: 'none',
                                        transform: 'translate(-50%, -50%) scale(0.9)',
                                    }}
                                >
                                    <div
                                        className={`relative flex items-center justify-center rounded-full ${
                                            isActive
                                                ? 'shadow-[0_0_28px_rgba(255,255,255,0.14)]'
                                                : 'shadow-[0_0_10px_rgba(255,255,255,0.06)]'
                                        }`}
                                        style={{
                                            boxShadow: isActive
                                                ? `0 0 28px ${item.accent}33`
                                                : '0 0 10px rgba(255,255,255,0.06)',
                                        }}
                                    >
                                        <div
                                            className={`absolute rounded-full transition-all duration-150 ${
                                                isActive ? 'h-14 w-14 opacity-100' : 'h-8 w-8 opacity-0'
                                            }`}
                                            style={{
                                                background: `radial-gradient(circle, ${item.accent}33 0%, transparent 68%)`,
                                            }}
                                        />
                                        <img
                                            alt=""
                                            aria-hidden
                                            className={`relative select-none object-contain transition-all duration-150 ${
                                                isActive
                                                    ? 'h-9 w-9 sm:h-10 sm:w-10'
                                                    : 'h-7 w-7 sm:h-8 sm:w-8'
                                            }`}
                                            draggable={false}
                                            loading="lazy"
                                            src={item.logo}
                                        />
                                    </div>

                                    {isActive && (
                                        <div
                                            className="rounded-full border px-3 py-1 text-[0.54rem] font-medium uppercase tracking-[0.24em] text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-md"
                                            style={{
                                                background: `linear-gradient(180deg, ${item.accent}30 0%, rgba(15, 23, 42, 0.88) 100%)`,
                                                borderColor: `${item.accent}66`,
                                                boxShadow: `0 10px 30px rgba(0, 0, 0, 0.28), 0 0 22px ${item.accent}22`,
                                            }}
                                        >
                                            {item.label}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <Canvas
                        camera={{ fov: CAMERA_FOV, position: [0, 0, calculateCameraDistance(1)] }}
                        dpr={[1, 1.25]}
                        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
                    >
                        <ResponsiveSphereCamera />
                        <ProjectedTechIcons
                            activeLabel={activeLabel}
                            iconAnchorRefs={iconAnchorRefs}
                            iconElementRefs={iconElementRefs}
                        />
                        <HolographicSphere
                            activeLabel={activeLabel}
                            iconAnchorRefs={iconAnchorRefs}
                        />
                        <OrbitControls
                            enablePan={false}
                            enableZoom={false}
                            makeDefault
                            rotateSpeed={0.65}
                        />
                    </Canvas>
                </div>
            </div>
        </section>
    );
}
