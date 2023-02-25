import { useEffect, useRef, useState } from "react";

import videojs from "video.js";
import Player from "video.js/dist/types/player";

import { MyPage } from "$core/@types";
import VideoPlayer from "$modules/VideoPlayer/VideoPlayer";

const IndexPage: MyPage = () => {
  // const playerRef = useRef<null | Player>(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "./goro.mp4",
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };
  const videoRef = useRef<undefined | HTMLElement>(undefined);
  const playerRef = useRef<undefined | Player>(undefined);
  const [mouseMove, setMouseMove] = useState(false);
  useEffect(() => {
    if (!playerRef.current) {
      playerRef.current = videojs("player");
      // const videoElement = document.createElement("video-js");

      // videoElement.classList.add("vjs-big-play-centered");
      // videoRef.current = videoElement;

      // const player = (playerRef.current = videojs(videoElement, () => {
      //   videojs.log("player is ready");
      //   // onReady && onReady(player);
      // }));
    } else {
      const player = playerRef.current;
      // player.autoplay();
      // if (mouseMove) {
      //   playerRef.current.play();
      // } else {
      //   playerRef.current.pause();
      // }
    }
  }, []);

  return (
    <main className="h-screen w-screen bg-red-100">
      <div>
        <button onClick={() => setMouseMove(!mouseMove)}>click me</button>
      </div>
      <video
        className="video-js"
        controls
        data-setup="{}"
        id="player"
        poster="//vjs.zencdn.net/v/oceans.png"
        preload="auto"
      >
        <track
          kind="captions"
          label="english_captions"
          src="goro.mp4"
          srcLang="en"
        />
        <source src="/goro.mp4" type="video/mp4"></source>
      </video>
      {/* <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} /> */}
    </main>
  );
};

export default IndexPage;
