import { useEffect, useRef, useState } from "react";

import videojs from "video.js";
import Player from "video.js/dist/types/player";

import { MyPage } from "$core/@types";
import VideoPlayer from "$modules/VideoPlayer/VideoPlayer";

const TestPage: MyPage = () => {
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "goro.mp4",
        type: "video/mp4",
      },
    ],
  };
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <main className="h-screen w-screen bg-red-100">
      <div>Rest of app here</div>
      <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      <div>Rest of app here</div>
    </main>
  );
};

export default TestPage;
