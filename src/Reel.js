import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import {
  AiOutlineHeart,
  AiFillHeart
} from "react-icons/ai";
import {
  FaRegCommentDots,
  FaCommentDots
} from "react-icons/fa";
import {
  BsSend,
  BsSendFill,
  BsBookmark,
  BsBookmarkFill,
  BsThreeDots,
  BsThreeDotsVertical,
  BsVolumeMute,
  BsVolumeUp
} from "react-icons/bs";

const Reel = ({
  videoUrl,
  username,
  profilePic,
  caption,
  isMuted,
  setIsMuted,
  likes,
  isLiked: initiallyLiked,
  comments
}) => {
  const videoRef = useRef(null);
  const reelRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(initiallyLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [isCommented, setIsCommented] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (video) {
          if (entry.isIntersecting) {
            video.play().then(() => setIsPlaying(true)).catch(console.error);
          } else {
            video.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.9 }
    );

    if (reelRef.current) observer.observe(reelRef.current);
    return () => reelRef.current && observer.unobserve(reelRef.current);
  }, []);

  const handleLike = () => {
    setIsLiked((prev) => {
      const newLiked = !prev;
      setLikeCount((count) => count + (newLiked ? 1 : -1));
      return newLiked;
    });
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(console.error);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="reel" ref={reelRef}>
      <video
        ref={videoRef}
        className="reel-video"
        src={videoUrl}
        muted={isMuted}
        loop
        playsInline
        controls={false}
        onClick={togglePlayPause}
      />

      {/* 🔇 Global Mute Button */}
      <div className="mute-btn" onClick={() => setIsMuted(!isMuted)}>
        {isMuted ? <BsVolumeMute /> : <BsVolumeUp />}
      </div>

      <div className="reel-overlay">
        {/* 👤 Left Panel */}
        <div className="reel-left">
          <div className="profile-row">
            <img src={profilePic} alt="profile" />
            <span className="username">@{username}</span>
            <button
              className={`follow-btn ${isFollowing ? "following" : ""}`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
          <p className="reel-caption">{caption}</p>
          <p className="music">🎵 Trending Sound</p>
        </div>

        {/* ➕ Right Panel */}
        <div className="reel-right">
          <button
            className={`icon-btn ${isLiked ? "active" : ""}`}
            onClick={handleLike}
          >
            {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
            <span>{(likes / 1000).toFixed(1)}K</span>
          </button>

          <button
            className={`icon-btn ${isCommented ? "active" : ""}`}
            onClick={() => setIsCommented(!isCommented)}
          >
            {isCommented ? <FaCommentDots /> : <FaRegCommentDots />}
            <span>{comments}</span>
          </button>

          <button
            className={`icon-btn ${isShared ? "active" : ""}`}
            onClick={() => setIsShared(!isShared)}
          >
            {isShared ? <BsSendFill /> : <BsSend />}
          </button>

          <button
            className={`icon-btn ${isSaved ? "active" : ""}`}
            onClick={() => setIsSaved(!isSaved)}
          >
            {isSaved ? <BsBookmarkFill /> : <BsBookmark />}
          </button>

          <button
            className={`icon-btn ${isMenuOpen ? "active" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <BsThreeDotsVertical /> : <BsThreeDots />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reel;
