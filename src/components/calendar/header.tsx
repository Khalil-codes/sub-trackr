import React from "react";

const Header = () => {
  return (
    <div className="mb-4 grid grid-cols-7 gap-2">
      {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day, i) => (
        <div
          key={i}
          className="text-center text-xs font-semibold uppercase text-gray-300">
          {day}
        </div>
      ))}
    </div>
  );
};

export default Header;
