
import React, { useState } from 'react';
import './forms.css';

interface FloatingLabelInputProps {
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ 
  label, 
  type = "text", 
  required = false,
  defaultValue = ""
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const isActive = isFocused || value.length > 0;

  return (
    <div className="floating-label-container">
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="floating-input"
        required={required}
      />
      <label
        className={`floating-label ${isActive ? 'active' : ''}`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
