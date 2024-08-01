import React from "react";
import "./Container.css"
const Container = ({ children }) => {
  return <div className="bg-black min-h-screen text-white w-full">{children}</div>;
};

export default Container;
