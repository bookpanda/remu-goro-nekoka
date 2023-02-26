import { useEffect } from "react";

import { MyPage } from "$core/@types";
import { Video } from "$modules/Video";

const IndexPage: MyPage = () => {
  return (
    <main className="h-screen w-screen">
      <Video />
    </main>
  );
};

export default IndexPage;
