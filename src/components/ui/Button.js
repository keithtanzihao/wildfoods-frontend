import React from "react";

export default function Button(props) {
  return (
    <button
      style={{ backgroundColor: props.bgColor }}
      className={props.className}
      onClick={props.onClick}
    >
      {props.content}
      {props.children}
    </button>
  );
}
