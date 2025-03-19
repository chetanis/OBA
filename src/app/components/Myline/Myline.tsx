import React from "react";

interface MyLineProps {
  name: string;
}

const MyLine = ({ name }: MyLineProps) => {
  return (
    <div className="relative flex items-center mt-3 mb-5">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="px-2 text-gray-600 text-sm">{name}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};

export default MyLine;
