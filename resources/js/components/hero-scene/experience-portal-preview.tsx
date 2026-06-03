import { useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const MODEL_URL = '/assets/AllIn1.glb';

function PortalModel() {
    const { scene } = useGLTF(MODEL_URL);

    return <primitive object={scene} />;
}

const ExperiencePortalPreview = () => {
    return (
        <Canvas>
            <PortalModel />
        </Canvas>
    );
};

useGLTF.preload(MODEL_URL);

export default ExperiencePortalPreview;
