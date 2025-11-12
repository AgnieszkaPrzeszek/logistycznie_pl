import React from 'react';

function LogisticsVideo() {
  return (
    <div className="hidden lg:flex relative">
      <video
        autoPlay
        loop
        muted
        className="fillWidth fadeIn animated w-full h-72 object-cover"
        id="video-background"
      >
        <source src="/video/intro_video.mp4" type="video/mp4" />
        Your browser does not support the video tag. I suggest you upgrade your browser.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-30"></div>
      <div className="absolute bottom-10 pl-2 left-10 border-l-8">
        <h1 className="relative w-[400px] text-balance text-3xl font-bold leading-tight! tracking-tight text-white md:text-3xl lg:text-4xl">
          Logistyczne wsparcie dla Twojego biznezu.
        </h1>
        <p className="mt-8 w-[400px] text-balance text-center text-lg md:text-wrap lg:pr-10 lg:text-left text-white">
          Ogłoszenia o dostępnych powierzchniach magazynowych i burowych, usługach logistycznych
          oraz ofertach pracy.
        </p>
      </div>
    </div>
  );
}

export default LogisticsVideo;
