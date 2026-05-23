// VideoPost.js
import React, { useRef, useState } from 'react';

export default function VideoPost({ videoUrl, title, description, tags }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{
      backgroundColor: '#000',
      borderRadius: '12px',
      overflow: 'hidden',
      marginBottom: '20px',
      position: 'relative',
      boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
    }}>
      {/* HTML5 Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        onClick={togglePlay}
        loop
        style={{ width: '100%', display: 'block', cursor: 'pointer' }}
      />

      {/* Play/Pause Text Overlay Indicator */}
      {!isPlaying && (
        <div 
          onClick={togglePlay}
          style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', padding: '15px 20px',
            borderRadius: '50%', cursor: 'pointer', fontSize: '20px'
          }}
        >
          ▶
        </div>
      )}

      {/* Text Context Content Information Container */}
      <div style={{ padding: '15px', backgroundColor: '#111', color: '#fff' }}>
        <h3 style={{ margin: '0 0 5px 0' }}>{title}</h3>
        <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#aaa' }}>{description}</p>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          {tags.map((tag, i) => (
            <span key={i} style={{ backgroundColor: '#333', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
