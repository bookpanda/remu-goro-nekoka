import { useEffect, useRef, useState } from "react";

import videojs from "video.js";
import Player from "video.js/dist/types/player";

import { MyPage } from "$core/@types";
import VideoPlayer from "$modules/VideoPlayer/VideoPlayer";

const TestPage: MyPage = () => {
  const playerRef = useRef<Player | null>(null);
  const [mouseMove, setMouseMove] = useState(false);
  //   videojs.getPlayer("player", null, function () {
  //     playerRef.current = videojs.getPlayer("player");
  //   });
  // playerRef.current = videojs.getPlayer("player");
  // const player = (playerRef.current = videojs("myplayer", null, () => {
  //   videojs.log("player is ready");
  //   // onReady && onReady(player);
  // }));

  return (
    <main className="h-screen w-screen bg-red-100">
      <div>
        <button onClick={() => setMouseMove(!mouseMove)}>click me</button>
      </div>
      <video
        className="video-js"
        controls
        data-setup="{}"
        id="myplayer"
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
    </main>
  );
};

export default TestPage;
