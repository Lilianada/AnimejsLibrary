import React from "react";
import "./forms.css";

interface BorderAnimationInputProps {
  placeholder: string;
}

const BorderAnimationInput: React.FC<BorderAnimationInputProps> = ({
  placeholder,
}) => {
  return (
    <div className="border-animation-container">
      <input
        type="text"
        className="border-animation-input"
        placeholder={placeholder}
      />
    </div>
  );
};

export default BorderAnimationInput;
