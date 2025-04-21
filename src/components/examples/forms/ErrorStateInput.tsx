
import React from 'react';
import './forms.css';

interface ErrorStateInputProps {
  error: string;
}

const ErrorStateInput: React.FC<ErrorStateInputProps> = ({ error }) => {
  return (
    <div className="error-state-container">
      <input type="text" className="error-state-input" placeholder="Enter value" />
      <p className="error-message">{error}</p>
    </div>
  );
};

export default ErrorStateInput;
