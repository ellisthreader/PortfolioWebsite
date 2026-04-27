import { Color, type Texture } from 'three';

export function DeskSetTextureMaterial({
    color,
    map,
    metalness,
    roughness,
}: {
    color: string;
    map?: Texture | null;
    metalness: number;
    roughness: number;
}) {
    return (
        <meshStandardMaterial
            color={new Color(color)}
            map={map ?? undefined}
            metalness={metalness}
            roughness={roughness}
        />
    );
}
