import styled from "styled-components";

const baseFontSize = 16;
const pxToRem = (px: number) => `${px / baseFontSize}rem`;

// Styles for NestedList component
export const Container = styled.div`
  font-family: Arial, sans-serif;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
  color: #e0e0e0;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
`;

export const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 7.5rem 7.5rem;
  gap: ${pxToRem(10)};
  padding: ${pxToRem(10)} ${pxToRem(20)};
  font-weight: bold;
  background-color: #2d2d2d;
  border-bottom: ${pxToRem(2)} solid #4a4a4a;
`;

export const ScrollableList = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  padding: 0 ${pxToRem(20)};
`;

export const ListItemContainer = styled.div<{ level: number }>`
  display: grid;
  grid-template-columns: 1fr 7.5rem 7.5rem;
  gap: ${pxToRem(10)};
  align-items: center;
  padding: ${pxToRem(8)} 0;
  border-bottom: ${pxToRem(1)} solid #333;
`;

export const ItemContent = styled.div<{ level: number }>`
  display: flex;
  align-items: center;
  padding-left: ${(props) => props.level * 1.25}rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: ${(props) => (props.level - 1) * 1.25 + 0.3125}rem;
    top: 50%;
    width: ${pxToRem(10)};
    height: ${pxToRem(1)};
    background-color: #4a4a4a;
  }

  &::after {
    content: "";
    position: absolute;
    left: ${(props) => (props.level - 1) * 1.25 + 0.3125}rem;
    top: 0;
    bottom: 50%;
    width: ${pxToRem(1)};
    background-color: #4a4a4a;
  }
`;

export const ItemName = styled.span`
  font-weight: bold;
  color: #e0e0e0;
`;

// Styles for Modal component
export const ModalOverlay = styled.div`
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

export const ModalContent = styled.div`
  background-color: #2d2d2d;
  padding: ${pxToRem(24)};
  border-radius: ${pxToRem(4)};
  width: ${pxToRem(400)};
  max-width: 90%;
  box-shadow: 0 0 ${pxToRem(10)} rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  margin-top: 0;
  font-size: ${pxToRem(20)};
  color: #e0e0e0;
  border-bottom: 1px solid #4a4a4a;
  padding-bottom: ${pxToRem(12)};
  width: 100%;
  text-align: center;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: ${pxToRem(20)};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${pxToRem(10)};
  background-color: #1e1e1e;
  color: #e0e0e0;
  border: 1px solid #4a4a4a;
  border-radius: ${pxToRem(4)};
  font-size: ${pxToRem(16)};

  &:focus {
    outline: none;
    border-color: #3182ce;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${pxToRem(12)};
  width: 100%;
`;

export const BaseButton = styled.button`
  padding: ${pxToRem(8)} ${pxToRem(16)};
  color: #e0e0e0;
  border: none;
  border-radius: ${pxToRem(4)};
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: ${pxToRem(16)};

  &:disabled {
    background-color: #4a5568;
    cursor: not-allowed;
  }
`;
