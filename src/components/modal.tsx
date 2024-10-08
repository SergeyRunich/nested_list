import React, { ReactNode, useState, useEffect } from "react";
import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  title: string;
  children?: ReactNode;
  showInput?: boolean;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #2d2d2d;
  padding: 20px;
  border-radius: 3px;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
  font-size: 18px;
  color: #e0e0e0;
  border-bottom: 1px solid #4a4a4a;
  padding-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  border: 1px solid #4a4a4a;
  border-radius: 3px;

  &:focus {
    outline: none;
    border-color: #3182ce;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #2c5282;
  color: #e0e0e0;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #3182ce;
  }
`;

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  showInput = false,
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (isOpen) {
      setInputValue("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (showInput) {
      onSubmit(inputValue);
    } else {
      (onSubmit as () => void)();
    }
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>{title}</ModalTitle>
        {children}
        {showInput && (
          <Input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Enter name'
            autoFocus
          />
        )}
        <ButtonGroup>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={showInput && inputValue.trim() === ""}
          >
            {showInput ? "Add" : "Confirm"}
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
