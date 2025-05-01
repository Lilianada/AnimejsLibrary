import React from "react";
import "./forms.css";

interface PlaceholderAnimationInputProps {
  placeholder: string;
}

const PlaceholderAnimationInput: React.FC<PlaceholderAnimationInputProps> = ({
  placeholder,
}) => {
  return (
    <div className="placeholder-animation-container">
      <input
        type="text"
        className="placeholder-animation-input"
        placeholder={placeholder}
      />
    </div>
  );
};

export default PlaceholderAnimationInput;
