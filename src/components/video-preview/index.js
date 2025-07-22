import React, { useRef } from 'react';
import "./styles.scss";

export default function VideoPreview({ src }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    // videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    // videoRef.current?.pause();
    videoRef.current.currentTime = 0; // reset về đầu nếu cần
  };

  return (
    <video
      ref={videoRef}
      src={"https://edge-hls.doppiocdn.net/hls/164906240/master/164906240.m3u8"}
      muted
      preload="metadata"
      style={{ width: '300px', height: 'auto', objectFit: 'cover' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

