import React, { FC } from "react";

interface ButtonProps {
  name: string;
}
const Button: FC<ButtonProps> = ({ name }) => {
  return (
    <div>
      <button className="btn btn-active btn-primary">{name}</button>
    </div>
  );
};

export default Button;
