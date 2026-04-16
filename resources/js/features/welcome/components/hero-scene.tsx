import { Canvas } from '@react-three/fiber';

import type { MutableNumberRef } from '../types';
import { HeadTrackingModel } from './head-tracking-model';

export function HeroScene({
    scrollProgressRef,
}: {
    scrollProgressRef: MutableNumberRef;
}) {
    return (
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
                    <HeadTrackingModel scrollProgressRef={scrollProgressRef} />
                </Canvas>
            </div>
        </section>
    );
}
