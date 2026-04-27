import { Color, DoubleSide, Vector2 } from 'three';

import { DeskSetTextureMaterial } from './desk-set-texture-material';
import {
    LEAF_PLACEMENTS,
    PORTFOLIO_HERO_DESKTOP_SET_POSITION,
} from './layout-constants';
import { useDeskSetTextures } from './use-desk-set-textures';

export function DesktopSet({
    presentation,
}: {
    presentation: 'scroll' | 'portfolioHero';
}) {
    const textures = useDeskSetTextures();
    const isPortfolioHero = presentation === 'portfolioHero';
    const deskTopPosition = isPortfolioHero
        ? ([1.52, 1.76, 2.1] as const)
        : ([0.18, 1.88, 2.04] as const);
    const deskTopSize = isPortfolioHero
        ? ([3.58, 0.1, 1.82] as const)
        : ([4.9, 0.1, 2.58] as const);
    const deskFrontPosition = isPortfolioHero
        ? ([1.52, 1.54, 2.94] as const)
        : ([0.18, 1.52, 3.26] as const);
    const deskFrontSize = isPortfolioHero
        ? ([3.56, 0.52, 0.14] as const)
        : ([4.88, 0.52, 0.12] as const);
    const deskRailPosition = isPortfolioHero
        ? ([1.52, 1.72, 2.76] as const)
        : ([0.18, 1.8, 2.88] as const);
    const deskRailSize = isPortfolioHero
        ? ([3.54, 0.08, 0.18] as const)
        : ([4.88, 0.08, 0.26] as const);
    const plantPosition = isPortfolioHero
        ? ([2.46, 1.82, 1.88] as const)
        : ([-1.38, 1.91, 2.12] as const);
    const plantRotation = isPortfolioHero
        ? ([0, -0.28, 0] as const)
        : ([0, 0.24, 0] as const);
    const plantScale = isPortfolioHero ? 0.36 : 1.2;
    const plantPositionScaleX = isPortfolioHero ? 0.5 : 1;
    const plantPositionScaleY = isPortfolioHero ? 0.58 : 1;
    const plantLeafScaleX = isPortfolioHero ? 0.64 : 1;
    const plantLeafScaleY = isPortfolioHero ? 0.62 : 1;
    const stemScale = isPortfolioHero ? 0.56 : 1;
    const stemHeightScale = isPortfolioHero ? 0.66 : 1;

    return (
        <group
            position={
                isPortfolioHero
                    ? PORTFOLIO_HERO_DESKTOP_SET_POSITION
                    : [0, 0, 0]
            }
        >
            <mesh position={deskTopPosition} receiveShadow>
                <boxGeometry args={deskTopSize} />
                <meshStandardMaterial
                    color={new Color('#09080a')}
                    map={textures.desk ?? undefined}
                    metalness={0.08}
                    normalMap={textures.deskNormal ?? undefined}
                    normalScale={new Vector2(0.42, 0.42)}
                    roughness={0.54}
                    roughnessMap={textures.deskRoughness ?? undefined}
                />
            </mesh>
            <mesh position={deskFrontPosition} receiveShadow>
                <boxGeometry args={deskFrontSize} />
                <meshStandardMaterial
                    color={new Color('#060507')}
                    metalness={0.18}
                    roughness={0.46}
                />
            </mesh>
            <mesh position={deskRailPosition} receiveShadow>
                <boxGeometry args={deskRailSize} />
                <meshStandardMaterial
                    color={new Color('#0d0b10')}
                    metalness={0.14}
                    roughness={0.42}
                />
            </mesh>

            <group
                position={plantPosition}
                rotation={plantRotation}
                scale={plantScale}
            >
                <mesh castShadow receiveShadow position={[0, 0.075, 0]}>
                    <cylinderGeometry args={[0.18, 0.23, 0.23, 24]} />
                    <DeskSetTextureMaterial
                        color="#0d0a0e"
                        map={textures.pot}
                        metalness={0.22}
                        roughness={0.5}
                    />
                </mesh>
                <mesh position={[0, 0.19, 0]}>
                    <cylinderGeometry args={[0.21, 0.18, 0.04, 24]} />
                    <meshStandardMaterial
                        color={new Color('#181119')}
                        metalness={0.26}
                        roughness={0.36}
                    />
                </mesh>
                <mesh position={[0, 0.215, 0]}>
                    <cylinderGeometry args={[0.15, 0.15, 0.02, 18]} />
                    <meshStandardMaterial
                        color={new Color('#211914')}
                        metalness={0}
                        roughness={0.92}
                    />
                </mesh>

                {LEAF_PLACEMENTS.map(
                    ([
                        x,
                        y,
                        z,
                        rotationZ,
                        rotationY,
                        rotationX,
                        scaleX,
                        scaleY,
                    ]) => (
                        <mesh
                            key={`${x}-${y}-${rotationZ}`}
                            castShadow
                            position={[
                                x * plantPositionScaleX,
                                y * plantPositionScaleY,
                                z,
                            ]}
                            rotation={[rotationX, rotationY, rotationZ]}
                            scale={[
                                scaleX * plantLeafScaleX,
                                scaleY * plantLeafScaleY,
                                1,
                            ]}
                        >
                            <planeGeometry args={[1, 1.4]} />
                            <meshStandardMaterial
                                alphaMap={textures.leafAlpha ?? undefined}
                                color={new Color('#4bb172')}
                                map={textures.leaf ?? undefined}
                                metalness={0}
                                normalMap={textures.leafNormal ?? undefined}
                                normalScale={new Vector2(0.52, 0.52)}
                                roughness={0.74}
                                alphaTest={0.45}
                                side={DoubleSide}
                            />
                        </mesh>
                    ),
                )}
                {[-0.07, 0.02, 0.1].map((x, index) => (
                    <mesh
                        key={x}
                        castShadow
                        position={[
                            x * stemScale,
                            (0.39 + index * 0.05) * stemHeightScale,
                            0,
                        ]}
                        rotation={[0.18, 0, -0.18 + index * 0.18]}
                    >
                        <cylinderGeometry args={[0.012, 0.018, 0.36, 12]} />
                        <meshStandardMaterial
                            color={new Color('#31543b')}
                            metalness={0}
                            roughness={0.7}
                        />
                    </mesh>
                ))}
            </group>
        </group>
    );
}
