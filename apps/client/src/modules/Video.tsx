import { FC, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

export const Video: FC = () => {
  const [hasWindow, setHasWindow] = useState(false);
  const [mouseMove, setMouseMove] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const screenSize = useRef({ width: 500, height: 500 });
  const videoRef = useRef<ReactPlayer>(null);
  const [mouseSpeed, setMouseSpeed] = useState({
    speedX: 0,
    speedY: 0,
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
      screenSize.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }

    const mouseInterval = setInterval(() => {
      calculateMouseSpeed();
    }, 100);
    const checkInterval = setInterval(() => {
      if (mouseSpeed.speedX === 0 && mouseSpeed.speedY === 0)
        setMouseMove(false);
      if (typeof window !== "undefined") {
        screenSize.current = {
          width: window.innerWidth,
          height: window.innerHeight,
        };
      }
    }, 500);

    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(mouseInterval);
      clearInterval(checkInterval);
    };
  }, []);

  let timestamp: number | null = null;
  let lastMouseX = 0;
  let lastMouseY = 0;
  const calculateMouseSpeed = () => {
    if (timestamp === null) {
      timestamp = Date.now();
      lastMouseX = mousePos.current.x;
      lastMouseY = mousePos.current.y;
      return;
    }
    const now = Date.now();
    const dt = now - timestamp;

    const dx = mousePos.current.x - lastMouseX;
    const dy = mousePos.current.y - lastMouseY;
    const speedX = Math.round((dx / dt) * 100);
    const speedY = Math.round((dy / dt) * 100);
    setMouseSpeed({ speedX, speedY });

    timestamp = now;
    lastMouseX = mousePos.current.x;
    lastMouseY = mousePos.current.y;
  };

  return (
    <div className="relative h-screen w-screen">
      {hasWindow && (
        <ReactPlayer
          ref={videoRef}
          height={screenSize.current.height}
          playing={mouseMove}
          progressInterval={5}
          url="goro_cutx2.mp4"
          width={screenSize.current.width}
          onProgress={({ playedSeconds }) => {
            if (playedSeconds >= 2.5) videoRef.current?.seekTo(0);
          }}
        />
      )}
      <div
        className="absolute top-[50vh] left-[40vw] z-10 h-[20vh] w-[20vh]"
        onBlur={() => () => setMouseMove(false)}
        onMouseMove={() => setMouseMove(true)}
        onMouseOut={() => setMouseMove(false)}
      />
    </div>
  );
};
