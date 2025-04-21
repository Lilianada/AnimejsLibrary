
import React, { useState } from 'react';
import './forms.css';

interface FloatingLabelInputProps {
  label: string;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ label }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="floating-label-container">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => !value && setIsFocused(false)}
        className="floating-input"
      />
      <label className={`floating-label ${isFocused || value ? 'active' : ''}`}>
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
