import React from "react";

function Wrapper({ children }) {
  return <div className="max-w-[1400px] mx-auto">{children}</div>;
}

export default Wrapper;
