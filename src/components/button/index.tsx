import React from "react";
import styled from "styled-components";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
}

const StyledButton = styled.button<{
  variant: "primary" | "secondary" | "danger";
}>`
  padding: 5px 10px;
  color: #e0e0e0;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s;

  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return `
          background-color: #2c5282;
          &:hover:not(:disabled) {
            background-color: #3182ce;
          }
        `;
      case "secondary":
        return `
          background-color: #4a5568;
          &:hover:not(:disabled) {
            background-color: #718096;
          }
        `;
      case "danger":
        return `
          background-color: #9b2c2c;
          &:hover:not(:disabled) {
            background-color: #c53030;
          }
        `;
    }
  }}

  &:disabled {
    background-color: #4a5568;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  variant = "primary",
  children,
}) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} variant={variant}>
      {children}
    </StyledButton>
  );
};

export default Button;
