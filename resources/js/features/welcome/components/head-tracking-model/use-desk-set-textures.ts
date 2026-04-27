import { useMemo } from 'react';

import { buildDeskSurfaceTextures } from './build-desk-textures';
import { buildPlantSurfaceTextures } from './build-plant-textures';

export function useDeskSetTextures() {
    return useMemo(
        () => ({
            ...buildDeskSurfaceTextures(),
            ...buildPlantSurfaceTextures(),
        }),
        [],
    );
}
