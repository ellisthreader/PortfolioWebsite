import {
    useEffect,
    useRef,
    useState,
    type PointerEvent as ReactPointerEvent,
} from 'react';

type DragState = {
    isDragging: boolean;
    pointerX: number;
    scrollLeft: number;
};

export function useTimelineDrag() {
    const [isDraggingTimeline, setIsDraggingTimeline] = useState(false);
    const dragStateRef = useRef<DragState | null>(null);
    const suppressTimelineClickRef = useRef(false);
    const timelineViewportRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleWindowPointerMove = (event: PointerEvent) => {
            if (!timelineViewportRef.current || !dragStateRef.current) return;

            const deltaX = event.clientX - dragStateRef.current.pointerX;

            if (!dragStateRef.current.isDragging && Math.abs(deltaX) > 6) {
                dragStateRef.current.isDragging = true;
                suppressTimelineClickRef.current = true;
                setIsDraggingTimeline(true);
            }

            if (!dragStateRef.current.isDragging) {
                return;
            }

            timelineViewportRef.current.scrollTo({
                behavior: 'auto',
                left: dragStateRef.current.scrollLeft - deltaX,
            });
        };

        const handleWindowPointerEnd = () => {
            dragStateRef.current = null;
            setIsDraggingTimeline(false);

            window.setTimeout(() => {
                suppressTimelineClickRef.current = false;
            }, 0);
        };

        window.addEventListener('pointermove', handleWindowPointerMove);
        window.addEventListener('pointerup', handleWindowPointerEnd);
        window.addEventListener('pointercancel', handleWindowPointerEnd);

        return () => {
            window.removeEventListener('pointermove', handleWindowPointerMove);
            window.removeEventListener('pointerup', handleWindowPointerEnd);
            window.removeEventListener('pointercancel', handleWindowPointerEnd);
        };
    }, []);

    const handleTimelinePointerDown = (
        event: ReactPointerEvent<HTMLDivElement>,
    ) => {
        if (!timelineViewportRef.current) return;

        dragStateRef.current = {
            isDragging: false,
            pointerX: event.clientX,
            scrollLeft: timelineViewportRef.current.scrollLeft,
        };
    };

    return {
        handleTimelinePointerDown,
        isDraggingTimeline,
        suppressTimelineClickRef,
        timelineViewportRef,
    };
}
