export function HeroCanvasLights({
    presentation,
}: {
    presentation: 'scroll' | 'portfolioHero';
}) {
    return (
        <>
            {presentation === 'scroll' && (
                <color attach="background" args={['#0f4bff']} />
            )}
            <ambientLight
                intensity={presentation === 'portfolioHero' ? 0.92 : 0.78}
            />
            <hemisphereLight
                color={presentation === 'portfolioHero' ? '#fff4e7' : '#ffffff'}
                groundColor={
                    presentation === 'portfolioHero' ? '#16071d' : '#0f4bff'
                }
                intensity={presentation === 'portfolioHero' ? 1.55 : 0.72}
            />
            <directionalLight
                castShadow
                color={presentation === 'portfolioHero' ? '#ffe0c2' : '#fff1dc'}
                position={[1.55, 4.9, 3.15]}
                intensity={presentation === 'portfolioHero' ? 3.45 : 3.2}
                shadow-bias={-0.00012}
                shadow-camera-far={12}
                shadow-camera-left={-4}
                shadow-camera-right={4}
                shadow-camera-top={4}
                shadow-camera-bottom={-4}
                shadow-mapSize-height={1536}
                shadow-mapSize-width={1536}
                shadow-normalBias={0.015}
            />
            <directionalLight
                color={presentation === 'portfolioHero' ? '#b94cff' : '#7fa5ff'}
                position={[-3.4, 2.45, 1.6]}
                intensity={presentation === 'portfolioHero' ? 1.8 : 1.45}
            />
            <spotLight
                castShadow={presentation === 'portfolioHero'}
                color="#fff1de"
                position={[0.35, 3.95, 2.15]}
                intensity={presentation === 'portfolioHero' ? 16 : 11.2}
                angle={0.46}
                penumbra={0.72}
                distance={9}
                shadow-bias={-0.00018}
                shadow-mapSize-height={1024}
                shadow-mapSize-width={1024}
            />
            <pointLight
                color="#87d7ff"
                intensity={presentation === 'portfolioHero' ? 2.2 : 1.55}
                position={[-1.72, 1.3, 2.36]}
            />
            <pointLight
                color="#f335d5"
                intensity={presentation === 'portfolioHero' ? 3.2 : 1.2}
                position={[1.7, 0.52, 2.28]}
            />
            <pointLight
                color="#ffd7ae"
                intensity={presentation === 'portfolioHero' ? 0 : 1.1}
                position={[0.15, 1.68, 3.4]}
            />
        </>
    );
}
