import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Quaternion, Vector3, type Object3D } from 'three';
import { useEffect, useRef } from 'react';

import type { MutableNumberRef } from '../types';
import { useWelcomePageContext } from '../context/welcome-page-context';

const HEAD_PITCH_AXIS = new Vector3(1, 0, 0);
const HEAD_YAW_AXIS = new Vector3(0, 1, 0);

export function HeadTrackingModel({
    scrollProgressRef,
}: {
    scrollProgressRef: MutableNumberRef;
}) {
    const { modelUrl } = useWelcomePageContext();
    const { scene } = useGLTF(modelUrl);
    const headBoneRef = useRef<Object3D | null>(null);
    const modelGroupRef = useRef<Object3D | null>(null);
    const baseQuaternionRef = useRef<Quaternion | null>(null);
    const pointerRef = useRef({ x: 0, y: 0 });

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
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [scene]);

    useFrame((_, delta) => {
        const headBone = headBoneRef.current;
        const modelGroup = modelGroupRef.current;
        const baseQuaternion = baseQuaternionRef.current;

        if (!headBone || !modelGroup || !baseQuaternion) return;

        const scrollProgress = MathUtils.smootherstep(scrollProgressRef.current, 0, 1);
        const targetY = MathUtils.clamp(pointerRef.current.x * 0.95, -0.85, 0.85);
        const targetX = MathUtils.clamp(-pointerRef.current.y * 0.9, -0.95, 0.95);
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
            MathUtils.lerp(0, 0.32, scrollProgress),
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
