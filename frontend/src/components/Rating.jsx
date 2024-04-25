import React from "react";
import { Star, StarHalf } from "lucide-react";

function Rating({ value, reviews, className = "" }) {
  return (
    <div className={`flex ${className} drop-shadow-md text-amber-400`}>
      <span className="mx-[0.1rem] ">
        {value >= 1 ? (
          <Star fill="currentColor" />
        ) : value >= 0.5 ? (
          <div className="relative">
            <Star className="absolute" style={{ zIndex: 1 }} />
            <StarHalf fill="currentColor" className="relative" />
          </div>
        ) : (
          <Star />
        )}
      </span>
      <span className="drop-shadow-lg mx-[0.1rem]">
        {value >= 2 ? (
          <Star fill="currentColor" />
        ) : value >= 1.5 ? (
          <div className="relative">
            <Star className="absolute" style={{ zIndex: 1 }} />
            <StarHalf fill="currentColor" className="relative" />
          </div>
        ) : (
          <Star />
        )}
      </span>
      <span className="drop-shadow-lg mx-[0.1rem]">
        {value >= 3 ? (
          <Star fill="currentColor" />
        ) : value >= 2.5 ? (
          <div className="relative">
            <Star className="absolute" style={{ zIndex: 1 }} />
            <StarHalf fill="currentColor" className="relative" />
          </div>
        ) : (
          <Star />
        )}
      </span>
      <span className="drop-shadow-lg mx-[0.1rem]">
        {value >= 4 ? (
          <Star fill="currentColor" />
        ) : value >= 3.5 ? (
          <div className="relative">
            <Star className="absolute" style={{ zIndex: 1 }} />
            <StarHalf fill="currentColor" className="relative" />
          </div>
        ) : (
          <Star />
        )}
      </span>
      <span className="drop-shadow-lg mx-[0.1rem]">
        {value >= 5 ? (
          <Star fill="currentColor" />
        ) : value >= 4.5 ? (
          <div className="relative">
            <Star className="absolute" style={{ zIndex: 1 }} />
            <StarHalf fill="currentColor" className="relative" />
          </div>
        ) : (
          <Star />
        )}
      </span>

      <span className="ml-2 mb-1">Reviews({reviews})</span>
    </div>
  );
}

export default Rating;
