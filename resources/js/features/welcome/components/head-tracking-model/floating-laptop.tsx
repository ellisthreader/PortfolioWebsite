import type { RefObject } from 'react';
import { Color, DoubleSide, type MeshBasicMaterial } from 'three';

import {
    KEY_ROWS,
    LAPTOP_SCREEN_HEIGHT,
    LAPTOP_SCREEN_WIDTH,
} from './layout-constants';
import { keyXOffset } from './helpers';

export function FloatingLaptop({
    screenMaterialRef,
}: {
    screenMaterialRef: RefObject<MeshBasicMaterial | null>;
}) {
    return (
        <group>
            <mesh position={[0, 0, 0.005]} rotation={[-0.035, 0, 0]}>
                <boxGeometry args={[0.92, 0.045, 0.55]} />
                <meshStandardMaterial
                    color={new Color('#28242d')}
                    metalness={0.64}
                    roughness={0.19}
                />
            </mesh>
            <mesh position={[0, 0.031, 0.004]} rotation={[-0.035, 0, 0]}>
                <boxGeometry args={[0.82, 0.01, 0.45]} />
                <meshStandardMaterial
                    color={new Color('#33293a')}
                    metalness={0.35}
                    roughness={0.38}
                />
            </mesh>
            <mesh position={[0, 0.056, -0.258]} rotation={[-0.035, 0, 0]}>
                <boxGeometry args={[0.9, 0.035, 0.045]} />
                <meshStandardMaterial
                    color={new Color('#3a3042')}
                    metalness={0.62}
                    roughness={0.24}
                />
            </mesh>
            <mesh position={[0, 0.084, -0.271]} rotation={[-0.16, 0, 0]}>
                <boxGeometry args={[0.88, 0.055, 0.038]} />
                <meshStandardMaterial
                    color={new Color('#463a4f')}
                    metalness={0.62}
                    roughness={0.23}
                />
            </mesh>
            <mesh position={[0, 0.037, 0.014]} rotation={[-0.035, 0, 0]}>
                <boxGeometry args={[0.81, 0.006, 0.39]} />
                <meshStandardMaterial
                    color={new Color('#251f2b')}
                    metalness={0.18}
                    roughness={0.46}
                />
            </mesh>

            {KEY_ROWS.map((row, rowIndex) => {
                const isFunctionRow = rowIndex === 0;

                return (
                    <group key={rowIndex}>
                        {row.map((keyWidth, keyIndex) => (
                            <mesh
                                key={`${rowIndex}-${keyIndex}`}
                                position={[
                                    keyXOffset(
                                        row,
                                        keyIndex,
                                        isFunctionRow ? 0.009 : 0.01,
                                    ),
                                    0.044 + rowIndex * 0.001,
                                    -0.154 + rowIndex * 0.062,
                                ]}
                                rotation={[-0.035, 0, 0]}
                            >
                                <boxGeometry
                                    args={[
                                        keyWidth,
                                        isFunctionRow ? 0.007 : 0.009,
                                        isFunctionRow ? 0.025 : 0.036,
                                    ]}
                                />
                                <meshStandardMaterial
                                    color={
                                        rowIndex === KEY_ROWS.length - 1 &&
                                        keyIndex === 3
                                            ? new Color('#82748c')
                                            : new Color('#74667d')
                                    }
                                    metalness={0.2}
                                    roughness={0.38}
                                />
                            </mesh>
                        ))}
                    </group>
                );
            })}

            <mesh position={[0, 0.047, 0.23]} rotation={[-0.035, 0, 0]}>
                <boxGeometry args={[0.32, 0.011, 0.065]} />
                <meshStandardMaterial
                    color={new Color('#7f7188')}
                    metalness={0.28}
                    roughness={0.3}
                />
            </mesh>
            <mesh position={[0, 0.074, -0.278]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.024, 0.024, 0.94, 32]} />
                <meshStandardMaterial
                    color={new Color('#52445b')}
                    metalness={0.68}
                    roughness={0.2}
                />
            </mesh>
            {[-0.34, 0.34].map((x) => (
                <mesh
                    key={x}
                    position={[x, 0.086, -0.267]}
                    rotation={[-0.24, 0, 0]}
                >
                    <boxGeometry args={[0.12, 0.078, 0.056]} />
                    <meshStandardMaterial
                        color={new Color('#44394d')}
                        metalness={0.58}
                        roughness={0.24}
                    />
                </mesh>
            ))}

            <group position={[0, 0.037, -0.258]} rotation={[-0.3, 0, 0]}>
                <mesh position={[0, 0.37, -0.018]}>
                    <boxGeometry args={[0.92, 0.64, 0.044]} />
                    <meshStandardMaterial
                        color={new Color('#261f2d')}
                        metalness={0.54}
                        roughness={0.24}
                    />
                </mesh>
                <mesh position={[0, 0.054, 0.004]}>
                    <boxGeometry args={[0.9, 0.05, 0.035]} />
                    <meshStandardMaterial
                        color={new Color('#3b3144')}
                        metalness={0.58}
                        roughness={0.23}
                    />
                </mesh>
                <mesh position={[0, 0.37, 0.009]}>
                    <boxGeometry args={[0.83, 0.535, 0.012]} />
                    <meshStandardMaterial
                        color={new Color('#100719')}
                        metalness={0.1}
                        roughness={0.18}
                    />
                </mesh>
                <mesh position={[0, 0.37, 0.017]}>
                    <planeGeometry
                        args={[LAPTOP_SCREEN_WIDTH, LAPTOP_SCREEN_HEIGHT]}
                    />
                    <meshBasicMaterial
                        ref={screenMaterialRef}
                        color={new Color('#ffffff')}
                        side={DoubleSide}
                        toneMapped={false}
                    />
                </mesh>
                <mesh position={[0, 0.69, 0.018]}>
                    <boxGeometry args={[0.11, 0.014, 0.012]} />
                    <meshStandardMaterial
                        color={new Color('#55445e')}
                        metalness={0.32}
                        roughness={0.32}
                    />
                </mesh>
            </group>
        </group>
    );
}
