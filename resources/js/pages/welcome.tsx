import { Head } from '@inertiajs/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Euler, MathUtils, type Object3D } from 'three';
import { useEffect, useRef } from 'react';

function HeadTrackingModel({ modelUrl }: { modelUrl: string }) {
    const { scene } = useGLTF(modelUrl);
    const headBoneRef = useRef<Object3D | null>(null);
    const baseRotationRef = useRef<Euler | null>(null);
    const pointerRef = useRef({ x: 0, y: 0 });
    const verticalCenterOffset = -0.18;

    useEffect(() => {
        const headBone = scene.getObjectByName('Bone006L');

        headBoneRef.current = headBone ?? null;
        baseRotationRef.current = headBone
            ? new Euler(headBone.rotation.x, headBone.rotation.y, headBone.rotation.z)
            : null;

        const handleMouseMove = (event: MouseEvent) => {
            pointerRef.current = {
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: (event.clientY / window.innerHeight) * 2 - 1,
            };
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [scene]);

    useFrame((_, delta) => {
        const headBone = headBoneRef.current;
        const baseRotation = baseRotationRef.current;

        if (!headBone || !baseRotation) {
            return;
        }

        const targetY = MathUtils.clamp(pointerRef.current.x * 0.6, -0.55, 0.55);
        const targetX = MathUtils.clamp(
            (pointerRef.current.y + verticalCenterOffset) * 0.35,
            -0.3,
            0.3,
        );
        const easing = 1 - Math.exp(-6 * delta);

        headBone.rotation.y = MathUtils.lerp(
            headBone.rotation.y,
            baseRotation.y + targetY,
            easing,
        );
        headBone.rotation.x = MathUtils.lerp(
            headBone.rotation.x,
            baseRotation.x + targetX,
            easing,
        );
    });

    return (
        <primitive
            object={scene}
            position={[-0.03, -3.65, -0.06]}
            rotation={[0, 0.12, 0]}
            scale={1}
        />
    );
}

export default function Welcome({ modelUrl }: { modelUrl: string }) {
    return (
        <>
            <Head title="Home" />

            <div className="h-screen w-screen bg-white" style={{ touchAction: 'none' }}>
                <Canvas
                    camera={{ position: [0, 2.55, 3], fov: 19 }}
                    style={{ pointerEvents: 'none' }}
                >
                    <color attach="background" args={['#ffffff']} />
                    <ambientLight intensity={1.8} />
                    <directionalLight position={[2, 3, 4]} intensity={2.2} />
                    <directionalLight position={[-2, 2, 3]} intensity={1.2} />
                    <HeadTrackingModel modelUrl={modelUrl} />
                </Canvas>
            </div>
        </>
    );
}
