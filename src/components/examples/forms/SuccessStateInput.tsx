import React from "react";
import "./forms.css";

interface SuccessStateInputProps {
  success: string;
}

const SuccessStateInput: React.FC<SuccessStateInputProps> = ({ success }) => {
  return (
    <div className="success-state-container">
      <input
        type="text"
        className="success-state-input"
        placeholder="Enter value"
      />
      <p className="success-message">{success}</p>
    </div>
  );
};

export default SuccessStateInput;
