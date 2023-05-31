import React from "react";
import Button from "./Button";

const Buttons = () => {
  const buttonList = ["Adding a new Todo", "Adding new tags"];
  return (
    <div className="flex justify-end gap-10">
      {buttonList.map((name, index) => (
        <Button key={index} name={name} />
      ))}
    </div>
  );
};

export default Buttons;
