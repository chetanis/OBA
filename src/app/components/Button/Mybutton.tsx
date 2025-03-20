import React from 'react';

interface MyButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export const Mybutton = (props: MyButtonProps) => {
  return (
    <button 
      className={`bg-blue-700 rounded-sm px-2 py-2 text-white ${props.className || ''}`} 
      onClick={props.onClick}
    >
      {props.text || "Click me"}
    </button>
  );
};
