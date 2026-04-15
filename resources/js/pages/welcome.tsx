import { Head } from '@inertiajs/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { MathUtils, Quaternion, Vector3, type Object3D } from 'three';
import { useEffect, useRef, useState } from 'react';

const HEAD_PITCH_AXIS = new Vector3(1, 0, 0);
const HEAD_YAW_AXIS = new Vector3(0, 1, 0);
const EXPERIENCE_ITEMS = [
    {
        year: '2026',
        title: 'Creative Developer',
        subtitle: 'Immersive Interfaces',
        description:
            'Designing cinematic web experiences that blend motion, 3D, and sharp front-end execution into something memorable.',
    },
    {
        year: '2025',
        title: 'Front-End Engineer',
        subtitle: 'React + Three.js',
        description:
            'Building responsive product surfaces with polished interactions, clean structure, and detail-first implementation.',
    },
    {
        year: '2024',
        title: 'Experience Designer',
        subtitle: 'Neon Narrative Systems',
        description:
            'Turning brand direction into visual rhythm, layered layouts, and high-impact interfaces that feel intentionally crafted.',
    },
    {
        year: '2023',
        title: 'Independent Builder',
        subtitle: 'Concept To Launch',
        description:
            'Taking ideas from rough concept to finished release with design thinking, motion sensitivity, and production-ready code.',
    },
] as const;

function HeadTrackingModel({
    modelUrl,
    scrollProgressRef,
}: {
    modelUrl: string;
    scrollProgressRef: { current: number };
}) {
    const { scene } = useGLTF(modelUrl);
    const headBoneRef = useRef<Object3D | null>(null);
    const modelGroupRef = useRef<Object3D | null>(null);
    const baseQuaternionRef = useRef<Quaternion | null>(null);
    const pointerRef = useRef({ x: 0, y: 0 });
    const horizontalLookRange = 0.95;
    const verticalLookRange = 0.9;
    const bodyTurnRange = 0.32;

    useEffect(() => {
        const headBone = scene.getObjectByName('Bone006L');

        headBoneRef.current = headBone ?? null;
        baseQuaternionRef.current = headBone ? headBone.quaternion.clone() : null;

        const handleMouseMove = (event: MouseEvent) => {
            pointerRef.current = {
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: 1 - (event.clientY / window.innerHeight) * 2,
            };
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [scene]);

    useFrame((_, delta) => {
        const headBone = headBoneRef.current;
        const modelGroup = modelGroupRef.current;
        const baseQuaternion = baseQuaternionRef.current;

        if (!headBone || !modelGroup || !baseQuaternion) {
            return;
        }

        const scrollProgress = MathUtils.smootherstep(scrollProgressRef.current, 0, 1);
        const targetY = MathUtils.clamp(
            pointerRef.current.x * horizontalLookRange,
            -0.85,
            0.85,
        );
        const targetX = MathUtils.clamp(
            -pointerRef.current.y * verticalLookRange,
            -0.95,
            0.95,
        );
        const easing = 1 - Math.exp(-8 * delta);
        const targetQuaternion = baseQuaternion
            .clone()
            .multiply(new Quaternion().setFromAxisAngle(HEAD_YAW_AXIS, targetY))
            .multiply(new Quaternion().setFromAxisAngle(HEAD_PITCH_AXIS, targetX));

        modelGroup.position.x = MathUtils.damp(
            modelGroup.position.x,
            MathUtils.lerp(0, -1.1, scrollProgress),
            7.5,
            delta,
        );
        modelGroup.rotation.y = MathUtils.damp(
            modelGroup.rotation.y,
            MathUtils.lerp(0, bodyTurnRange, scrollProgress),
            7.5,
            delta,
        );
        headBone.quaternion.slerp(targetQuaternion, easing);
    });

    return (
        <group ref={modelGroupRef} position={[0, -3.82, -0.06]} rotation={[0, 0, 0]}>
            <primitive object={scene} />
        </group>
    );
}

export default function Welcome({ modelUrl }: { modelUrl: string }) {
    const scrollProgressRef = useRef(0);
    const experienceSectionRef = useRef<HTMLElement | null>(null);
    const experienceTargetProgressRef = useRef(0);
    const experienceSmoothProgressRef = useRef(0);
    const [experienceProgress, setExperienceProgress] = useState(0);

    useEffect(() => {
        let animationFrameId = 0;
        let previousFrameTime = performance.now();

        const updateScrollTargets = () => {
            const viewportHeight = Math.max(window.innerHeight, 1);
            const scrollDistance = viewportHeight;

            scrollProgressRef.current = MathUtils.clamp(
                window.scrollY / scrollDistance,
                0,
                1,
            );

            const experienceSection = experienceSectionRef.current;

            if (!experienceSection) {
                experienceTargetProgressRef.current = 0;
                return;
            }

            const sectionTop = experienceSection.offsetTop;
            const sectionHeight = experienceSection.offsetHeight;
            const totalScrollableDistance = Math.max(
                sectionHeight - viewportHeight,
                viewportHeight,
            );
            const sectionScroll = window.scrollY - sectionTop;

            experienceTargetProgressRef.current = MathUtils.clamp(
                sectionScroll / totalScrollableDistance,
                0,
                1,
            );
        };

        const animateProgress = (now: number) => {
            const delta = Math.min((now - previousFrameTime) / 1000, 0.1);
            previousFrameTime = now;

            experienceSmoothProgressRef.current = MathUtils.damp(
                experienceSmoothProgressRef.current,
                experienceTargetProgressRef.current,
                9,
                delta,
            );

            setExperienceProgress((currentProgress) => {
                const nextProgress = experienceSmoothProgressRef.current;

                return Math.abs(currentProgress - nextProgress) > 0.0005
                    ? nextProgress
                    : currentProgress;
            });

            animationFrameId = window.requestAnimationFrame(animateProgress);
        };

        updateScrollTargets();
        animationFrameId = window.requestAnimationFrame(animateProgress);
        window.addEventListener('scroll', updateScrollTargets, { passive: true });
        window.addEventListener('resize', updateScrollTargets);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('scroll', updateScrollTargets);
            window.removeEventListener('resize', updateScrollTargets);
        };
    }, []);

    return (
        <>
            <Head title="Home" />

            <div className="bg-black">
                <section className="relative h-[200vh] w-screen">
                    <div
                        className="sticky top-0 h-screen w-screen overflow-hidden"
                        style={{ touchAction: 'none' }}
                    >
                        <Canvas
                            camera={{ position: [0, 2.45, 3.8], fov: 19 }}
                            style={{ pointerEvents: 'none' }}
                        >
                            <color attach="background" args={['#000000']} />
                            <ambientLight intensity={1.8} />
                            <directionalLight position={[2, 3, 4]} intensity={2.2} />
                            <directionalLight position={[-2, 2, 3]} intensity={1.2} />
                            <HeadTrackingModel
                                modelUrl={modelUrl}
                                scrollProgressRef={scrollProgressRef}
                            />
                        </Canvas>
                    </div>
                </section>

                <section
                    ref={experienceSectionRef}
                    className="relative min-h-[220vh] overflow-hidden bg-[#020104] text-white"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(185,58,255,0.14),_transparent_30%),radial-gradient(circle_at_85%_30%,_rgba(255,72,145,0.09),_transparent_24%),linear-gradient(180deg,_#040108_0%,_#020104_42%,_#010103_100%)]" />
                    <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_center,_rgba(217,70,239,0.12),_transparent_68%)] blur-3xl" />

                    <div className="relative mx-auto max-w-7xl px-6 pb-36 pt-28 sm:px-10 lg:px-16">
                        <div className="flex justify-center text-center">
                            <h2 className="font-sans text-6xl font-semibold tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
                                My Experience
                            </h2>
                        </div>

                        <div className="relative mt-28">
                            <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden -translate-x-1/2 lg:block">
                                <div
                                    className="absolute left-1/2 top-0 w-1.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-fuchsia-200 via-fuchsia-400 to-pink-500 shadow-[0_0_24px_rgba(217,70,239,1),0_0_56px_rgba(217,70,239,0.98),0_0_140px_rgba(236,72,153,0.72)]"
                                    style={{ height: `${experienceProgress * 100}%` }}
                                />
                                <div
                                    className="absolute left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2"
                                    style={{
                                        top:
                                            experienceProgress > 0
                                                ? `calc(${experienceProgress * 100}%)`
                                                : '-9999px',
                                    }}
                                >
                                    <div className="absolute inset-0 rounded-full border border-fuchsia-100/95 bg-white shadow-[0_0_34px_rgba(255,255,255,1),0_0_86px_rgba(217,70,239,1),0_0_160px_rgba(236,72,153,0.82)] animate-[timeline-star-pulse_2.8s_ease-in-out_infinite]" />
                                    <div className="absolute inset-[-2.4rem] rounded-full bg-[radial-gradient(circle,_rgba(217,70,239,0.68),_rgba(217,70,239,0.22)_38%,_transparent_72%)] blur-md" />
                                    <div className="absolute inset-[-4.5rem] rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.34),_transparent_72%)] blur-2xl" />
                                </div>
                            </div>

                            <div className="space-y-16 lg:space-y-24">
                                {EXPERIENCE_ITEMS.map((item) => (
                                    <article
                                        key={item.year}
                                        className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_5.5rem_minmax(0,1fr)] lg:items-center"
                                    >
                                        <div className="px-2 py-5 lg:px-0">
                                            <h3 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                                                {item.title}
                                            </h3>
                                            <p className="mt-3 text-lg uppercase tracking-[0.32em] text-white/42 sm:text-xl">
                                                {item.subtitle}
                                            </p>
                                        </div>

                                        <div className="relative hidden h-full items-center justify-center lg:flex">
                                            <span className="absolute right-[calc(50%+2rem)] top-1/2 -translate-y-1/2 text-4xl font-semibold tracking-[0.2em] text-fuchsia-100/95">
                                                {item.year}
                                            </span>
                                        </div>

                                        <div className="px-2 py-5 lg:px-0">
                                            <div className="mb-4 flex items-center justify-between lg:hidden">
                                                <span className="text-2xl font-semibold tracking-[0.24em] text-fuchsia-100/92">
                                                    {item.year}
                                                </span>
                                                <span className="h-px flex-1 bg-gradient-to-r from-fuchsia-400/0 via-fuchsia-400/45 to-fuchsia-400/0" />
                                            </div>
                                            <p className="text-lg leading-8 text-white/70">
                                                {item.description}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
