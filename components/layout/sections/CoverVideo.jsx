const CoverVideo = () => {
  const videoId = Math.floor(Math.random() * 2) + 1; // 1 or 2

  return (
    <div className="w-full">
      <div className="absolute left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 text-neutral-50">
        <h1 className="text-5xl font-bold drop-shadow-lg">Jan-Willem van Bremen</h1>
        <h2 className="text-3xl drop-shadow-lg">Software engineer, Skateboarder & Model!</h2>
      </div>
      <video className="pointer-events-none h-screen w-full object-cover" autoPlay playsInline muted loop>
        {videoId &&
          [[`cover_video_${videoId}.webm`], [`cover_video_${videoId}.mp4`]].map(([src]) => (
            <source key={src} src={`/${src}`} type={`video/${src.split('.').pop()}`} />
          ))}
      </video>
    </div>
  );
};

export default CoverVideo;
