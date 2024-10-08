import React, { ReactNode, useState, useEffect } from "react";
import Button from "../button";
import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  InputContainer,
  Input,
  ButtonGroup,
} from "../../styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  title: string;
  children?: ReactNode;
  showInput?: boolean;
}

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
          <InputContainer>
            <Input
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='Enter name'
              autoFocus
            />
          </InputContainer>
        )}
        <ButtonGroup>
          <Button onClick={onClose} variant='secondary'>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={showInput && inputValue.trim() === ""}
            variant='primary'
          >
            {showInput ? "Add" : "Confirm"}
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
