
// src/components/ExerciseVideo.jsx
import React from 'react';

const ExerciseVideo = ({ videoUrl, title }) => {
  return (
    <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex flex-col items-center justify-center h-96">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <video src={videoUrl} controls autoPlay className="w-full h-full object-cover rounded-xl" />
    </div>
  );
};

export default ExerciseVideo;
