import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Group as ThreeGroup, type Group } from 'three';

import type { MutableNumberRef } from '../types';
import { updateHeadTrackingScene } from './head-tracking-model/head-tracking-motion';
import {
    MODEL_START_ROTATION_Y,
    MODEL_START_SCALE,
    MODEL_START_X,
    MODEL_START_Y,
    MODEL_START_Z,
    PORTFOLIO_HERO_DESK_POSITION,
    PORTFOLIO_HERO_DESK_SCALE,
    PORTFOLIO_HERO_MODEL_URL,
    PORTFOLIO_HERO_STAGE_SCALE,
    PORTFOLIO_HERO_STAGE_X,
    PORTFOLIO_HERO_STAGE_Y,
    PORTFOLIO_HERO_STAGE_Z,
    PORTFOLIO_HERO_SUBJECT_ROTATION_Y,
    SCROLL_ALL_IN_ONE_POSITION,
} from './head-tracking-model/layout-constants';
import { useHeadTrackingScene } from './head-tracking-model/use-head-tracking-scene';
import { useLaptopVideoTexture } from './head-tracking-model/use-laptop-video-texture';

const ROTATING_MODEL_CHILD_NAMES = new Set(['Armature', 'floating_laptop']);

export function HeadTrackingModel({
    onLaptopVideoEnded,
    presentation = 'scroll',
    scrollProgressRef,
}: {
    onLaptopVideoEnded?: () => void;
    presentation?: 'scroll' | 'portfolioHero';
    scrollProgressRef: MutableNumberRef;
}) {
    const { texture: laptopVideoTexture, video: laptopVideo } =
        useLaptopVideoTexture();
    const { rig, scene, screenMaterial } = useHeadTrackingScene({
        laptopVideo,
        modelUrl: PORTFOLIO_HERO_MODEL_URL,
        onLaptopVideoEnded,
    });
    const stageGroupRef = useRef<Group | null>(null);
    const modelRotationGroupRef = useRef<Group | null>(null);
    const laptopVideoStartedRef = useRef(false);
    const deskScene = useMemo(() => {
        const deskScene = new ThreeGroup();

        deskScene.name = 'fixed_desk_scene';

        for (const child of scene.children) {
            if (ROTATING_MODEL_CHILD_NAMES.has(child.name)) continue;

            const fixedChild = child.clone(true);

            child.visible = false;
            fixedChild.visible = true;
            deskScene.add(fixedChild);
        }

        deskScene.traverse((object) => {
            object.castShadow = true;
            object.receiveShadow = true;
            object.frustumCulled = false;
        });

        return deskScene;
    }, [scene]);

    useFrame((state, delta) => {
        updateHeadTrackingScene({
            delta,
            elapsedTime: state.clock.elapsedTime,
            laptopGroup: null,
            modelRotationGroup: modelRotationGroupRef.current,
            laptopVideo,
            laptopVideoStartedRef,
            laptopVideoTexture,
            presentation,
            rawScrollProgress:
                presentation === 'portfolioHero'
                    ? 0.88
                    : scrollProgressRef.current,
            rig,
            screenMaterial: presentation === 'scroll' ? screenMaterial : null,
            stageGroup: stageGroupRef.current,
        });
    });

    return (
        <group
            ref={stageGroupRef}
            position={
                presentation === 'portfolioHero'
                    ? [
                          PORTFOLIO_HERO_STAGE_X,
                          PORTFOLIO_HERO_STAGE_Y,
                          PORTFOLIO_HERO_STAGE_Z,
                      ]
                    : [MODEL_START_X, MODEL_START_Y, MODEL_START_Z]
            }
            rotation={[0, 0, 0]}
            scale={
                presentation === 'portfolioHero'
                    ? PORTFOLIO_HERO_STAGE_SCALE
                    : MODEL_START_SCALE
            }
        >
            <primitive
                object={deskScene}
                position={
                    presentation === 'portfolioHero'
                        ? PORTFOLIO_HERO_DESK_POSITION
                        : SCROLL_ALL_IN_ONE_POSITION
                }
                scale={
                    presentation === 'portfolioHero'
                        ? PORTFOLIO_HERO_DESK_SCALE
                        : 1
                }
            />
            <group
                ref={modelRotationGroupRef}
                rotation={
                    presentation === 'portfolioHero'
                        ? [0, PORTFOLIO_HERO_SUBJECT_ROTATION_Y, 0]
                        : [0, MODEL_START_ROTATION_Y, 0]
                }
            >
                <primitive
                    object={scene}
                    position={
                        presentation === 'portfolioHero'
                            ? PORTFOLIO_HERO_DESK_POSITION
                            : SCROLL_ALL_IN_ONE_POSITION
                    }
                    scale={
                        presentation === 'portfolioHero'
                            ? PORTFOLIO_HERO_DESK_SCALE
                            : 1
                    }
                />
            </group>
        </group>
    );
}
