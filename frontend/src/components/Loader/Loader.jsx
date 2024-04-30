import React from "react";
import "./Loader.css";

// this loader is from https://uiverse.io/mobinkakei/pink-deer-76

function Loader({ hight = "min-h-96" }) {
  return (
    <div className={`${hight} flex items-center justify-center`}>
      <div id="wifi-loader">
        <svg className="circle-outer" viewBox="0 0 86 86">
          <circle className="back" cx="43" cy="43" r="40"></circle>
          <circle className="front" cx="43" cy="43" r="40"></circle>
          <circle className="new" cx="43" cy="43" r="40"></circle>
        </svg>
        <svg className="circle-middle" viewBox="0 0 60 60">
          <circle className="back" cx="30" cy="30" r="27"></circle>
          <circle className="front" cx="30" cy="30" r="27"></circle>
        </svg>
        <svg className="circle-inner" viewBox="0 0 34 34">
          <circle className="back" cx="17" cy="17" r="14"></circle>
          <circle className="front" cx="17" cy="17" r="14"></circle>
        </svg>
        <div className="text text-2xl" data-text="Loading"></div>
      </div>
    </div>
  );
}

export default Loader;
