import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const Buttons = () => {
  const buttonList = [
    { name: "Adding a new Todo", path: "/todos/create" },
    { name: "Adding new tags", path: "/tags/create" },
  ];
  return (
    <div className="flex justify-end gap-10">
      {buttonList.map((button, index) => (
        <Link to={button.path} key={index}>
          <Button name={button.name} />
        </Link>
      ))}
    </div>
  );
};

export default Buttons;
