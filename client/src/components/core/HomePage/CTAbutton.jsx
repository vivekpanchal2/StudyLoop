import React from "react";
import { Link } from "react-router-dom";

function CTAbutton({ active, children, linkTo }) {
  return (
    <Link to={linkTo}>
      <div
        className={`text-center text-[13px] px-6 py-3 rounded-md font-bold ${
          active ? "bg-yellow-200 text-black" : "bg-richblack-600"
        } hover:scale-95 transition-all duration-200`}
      >
        {children}
      </div>
    </Link>
  );
}

export default CTAbutton;
