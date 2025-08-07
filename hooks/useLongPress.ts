import { useCallback, useEffect, useRef, useState } from "react";

const useLongPress = (
  onLongPress: any,
  onClick: any,
  { shouldPreventDefault = true, delay = 300, moveThreshold = 10 } = {}
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const target = useRef<EventTarget | null>(null);
  const startPointRef = useRef<{ x: number; y: number } | null>(null);
  const movedRef = useRef<boolean>(false);
  const moveHandlerRef = useRef<((e: any) => void) | null>(null);
  const cancelHandlerRef = useRef<((e: any) => void) | null>(null);
  const scrollHandlerRef = useRef<((e: any) => void) | null>(null);

  const start = useCallback(
    (event: any, context = undefined) => {
      movedRef.current = false;
      startPointRef.current = getPointFromEvent(event);
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener("touchend", preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      // Movement handler: cancel long press if user moves beyond threshold
      const onMove = (e: any) => {
        if (!startPointRef.current) return;
        const point = getPointFromEvent(e);
        if (!point) return;
        const dx = point.x - startPointRef.current.x;
        const dy = point.y - startPointRef.current.y;
        if (Math.hypot(dx, dy) > moveThreshold) {
          if (timeout.current) {
            clearTimeout(timeout.current);
            timeout.current = null;
          }
          movedRef.current = true;
        }
      };

      const onCancel = () => {
        if (timeout.current) {
          clearTimeout(timeout.current);
          timeout.current = null;
        }
        movedRef.current = true;
      };

      // Save refs so we can remove listeners in clear()
      moveHandlerRef.current = onMove;
      cancelHandlerRef.current = onCancel;
      scrollHandlerRef.current = onCancel;

      document.addEventListener("touchmove", onMove, { passive: true });
      document.addEventListener("mousemove", onMove);
      document.addEventListener("touchcancel", onCancel);
      // Use capture to catch scrolls from any ancestor
      window.addEventListener("scroll", onCancel, true);

      timeout.current = setTimeout(() => {
        onLongPress(event, context);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault, moveThreshold]
  );

  const clear = useCallback(
    (event: any, shouldTriggerClick = true) => {
      // Clear pending long press
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }

      // Remove listeners added on start
      if (moveHandlerRef.current) {
        document.removeEventListener(
          "touchmove",
          moveHandlerRef.current as any
        );
        document.removeEventListener(
          "mousemove",
          moveHandlerRef.current as any
        );
      }
      if (cancelHandlerRef.current) {
        document.removeEventListener(
          "touchcancel",
          cancelHandlerRef.current as any
        );
      }
      if (scrollHandlerRef.current) {
        window.removeEventListener(
          "scroll",
          scrollHandlerRef.current as any,
          true
        );
      }

      // Trigger click only if not long-pressed and not moved
      if (shouldTriggerClick && !longPressTriggered && !movedRef.current) {
        onClick();
      }
      setLongPressTriggered(false);
      movedRef.current = false;
      startPointRef.current = null;
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener("touchend", preventDefault);
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered]
  );

  return (context = undefined) => ({
    onMouseDown: (e: any) => start(e, context),
    onTouchStart: (e: any) => start(e, context),
    onMouseUp: (e: any) => clear(e),
    onMouseLeave: (e: any) => clear(e, false),
    onTouchEnd: (e: any) => clear(e),
  });
};

const isTouchEvent = (event: any) => {
  return "touches" in event;
};

const getPointFromEvent = (event: any): { x: number; y: number } | null => {
  if (isTouchEvent(event)) {
    const touch = event.touches?.[0] || event.changedTouches?.[0];
    if (!touch) return null;
    return { x: touch.clientX, y: touch.clientY };
  }
  if (typeof event.clientX === "number" && typeof event.clientY === "number") {
    return { x: event.clientX, y: event.clientY };
  }
  return null;
};

const preventDefault = (event: any) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default useLongPress;
