import { useEffect, useRef, useState } from "react";

interface TiltState {
  x: number; // -1 to 1
  y: number; // -1 to 1
}

export function useDeviceTilt() {
  const [tilt, setTilt] = useState<TiltState>({ x: 0, y: 0 });
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const permissionRef = useRef(false);

  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
      window.matchMedia("(pointer: coarse)").matches;

    /* ---- Gyroscope (mobile) ---- */
    if (isMobile && typeof DeviceOrientationEvent !== "undefined") {
      const requestPermission = async () => {
        if (
          typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> })
            .requestPermission === "function"
        ) {
          try {
            const res = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission();
            permissionRef.current = res === "granted";
          } catch {
            permissionRef.current = false;
          }
        } else {
          permissionRef.current = true;
        }
      };
      requestPermission();

      const handleOrientation = (e: DeviceOrientationEvent) => {
        if (!permissionRef.current && !/Android/i.test(navigator.userAgent)) return;
        const beta = e.beta ?? 0;   // front-back tilt -180 to 180
        const gamma = e.gamma ?? 0; // left-right tilt -90 to 90

        const x = Math.max(-1, Math.min(1, gamma / 25));
        const y = Math.max(-1, Math.min(1, (beta - 45) / 25));
        setTilt({ x, y });
      };

      window.addEventListener("deviceorientation", handleOrientation, true);
      return () => window.removeEventListener("deviceorientation", handleOrientation, true);
    }

    /* ---- Touch drag fallback (mobile without gyro) ---- */
    if (isMobile) {
      const handleTouch = (e: TouchEvent) => {
        const t = e.touches[0];
        const x = (t.clientX / window.innerWidth - 0.5) * 2;
        const y = -(t.clientY / window.innerHeight - 0.5) * 2;
        setTilt({ x, y });
        touchRef.current = { x, y };
      };
      const resetTouch = () => {
        setTilt({ x: 0, y: 0 });
        touchRef.current = null;
      };

      window.addEventListener("touchmove", handleTouch, { passive: true });
      window.addEventListener("touchend", resetTouch);
      return () => {
        window.removeEventListener("touchmove", handleTouch);
        window.removeEventListener("touchend", resetTouch);
      };
    }

    /* ---- Mouse (desktop) ---- */
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = -(e.clientY / window.innerHeight - 0.5) * 2;
      setTilt({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return tilt;
}
