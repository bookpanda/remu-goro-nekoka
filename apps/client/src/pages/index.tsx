import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

import { MyPage } from "$core/@types";

const IndexPage: MyPage = () => {
  const [hasWindow, setHasWindow] = useState(false);
  const [mouseMove, setMouseMove] = useState(false);
  // const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  // const [mousePrevPos, setMousePrevPos] = useState({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });
  const [mouseSpeed, setMouseSpeed] = useState({
    speedX: 0,
    speedY: 0,
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // setMousePos({ x: event.clientX, y: event.clientY });
      mousePos.current = { x: event.clientX, y: event.clientY };
    };
    const mouseInterval = setInterval(() => {
      calculateMouseSpeed();
    }, 100);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(mouseInterval);
    };
  }, []);

  let timer: ReturnType<typeof setTimeout>;
  // let mouseTimer: ReturnType<typeof setTimeout>;
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
    console.log(mousePos.current.x, lastMouseX);

    const dx = mousePos.current.x - lastMouseX;
    const dy = mousePos.current.y - lastMouseY;
    const speedX = Math.round((dx / dt) * 100);
    const speedY = Math.round((dy / dt) * 100);
    setMouseSpeed({ speedX, speedY });

    timestamp = now;
    lastMouseX = mousePos.current.x;
    lastMouseY = mousePos.current.y;
    // setMousePrevPos(mousePos);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // calculateMouseSpeed(e);

    setMouseMove(true);
    clearTimeout(timer);
    // clearTimeout(mouseTimer);
    // mouseTimer = setTimeout(() => {
    //   calculateMouseSpeed(e);
    // }, 500);
    timer = setTimeout(() => {
      if (mouseSpeed.speedX === 0 && mouseSpeed.speedY === 0)
        setMouseMove(false);
    }, 500);
  };
  return (
    <main className="h-screen w-screen bg-red-100">
      {hasWindow && <ReactPlayer playing={mouseMove} url="goro.mp4" />}
      <div
        className="h-20 bg-green-100"
        onBlur={() => setMouseMove(false)}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseOut={() => setMouseMove(false)}
      ></div>
      <div>
        <p>
          {mouseSpeed.speedX}, {mouseSpeed.speedY}
        </p>
        <p>
          {mousePos.current.x}, {mousePos.current.y}
        </p>
        {/* <p>
          {mousePrevPos.x}, {mousePrevPos.y}
        </p> */}
      </div>
    </main>
  );
};

export default IndexPage;
