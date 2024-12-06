import React from "react";

const Loading = () => {
  return (
    <div className="h-screen">
      <div className="flex justify-center items-center">
        <img
          className="h-16 w-16"
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
          alt="Loading"
        />
      </div>
    </div>
  );
};

export default Loading;
