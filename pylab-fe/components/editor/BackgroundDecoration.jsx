import React from "react";

const BackgroundDecoration = () => {
  return (
    <>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
    </>
  );
};

export default BackgroundDecoration;