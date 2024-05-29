import React from "react";
import "./Input.css";

interface InputProps {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  value,
  onChange,
  isError = false,
  errorMessage = "",
}) => {
  return (
    <div className="input-container">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={isError ? "input-error" : ""}
      />
      {isError && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Input;
