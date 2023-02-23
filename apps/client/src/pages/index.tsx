import { MyPage } from "$core/@types";

const IndexPage: MyPage = () => {
  return (
    <main className="h-screen w-screen bg-red-100">
      <video
        className="video-js"
        controls
        data-setup="{}"
        id="my-player"
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

export default IndexPage;
