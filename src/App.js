import React, { useState } from "react";
import reelsData from "./reelsData";
import Reel from "./Reel";

const App = () => {
  const [isMuted, setIsMuted] = useState(true); // Global mute state

  return (
    <div className="reels-container">
      {reelsData.map((reel) => (
      <Reel
      key={reel.id}
      videoUrl={reel.videoUrl}
      username={reel.username}
      profilePic={reel.profilePic}
      caption={reel.caption}
      likes={reel.likes}
      isLiked={reel.isLiked}
      comments={reel.comments}
      isMuted={isMuted}
      setIsMuted={setIsMuted}
    />
    
      ))}
    </div>
  );
};

export default App;
