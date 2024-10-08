import styled from "styled-components";

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
  grid-template-columns: 1fr 120px 120px;
  gap: 10px;
  padding: 10px 20px;
  font-weight: bold;
  background-color: #2d2d2d;
  border-bottom: 2px solid #4a4a4a;
`;

export const ScrollableList = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  padding: 0 20px;
`;

export const ListItemContainer = styled.div<{ level: number }>`
  display: grid;
  grid-template-columns: 1fr 120px 120px;
  gap: 10px;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #333;
`;

export const ItemContent = styled.div<{ level: number }>`
  display: flex;
  align-items: center;
  padding-left: ${(props) => props.level * 20}px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: ${(props) => (props.level - 1) * 20 + 5}px;
    top: 50%;
    width: 10px;
    height: 1px;
    background-color: #4a4a4a;
  }

  &::after {
    content: "";
    position: absolute;
    left: ${(props) => (props.level - 1) * 20 + 5}px;
    top: 0;
    bottom: 50%;
    width: 1px;
    background-color: #4a4a4a;
  }
`;

export const ItemName = styled.span`
  font-weight: bold;
  color: #e0e0e0;
`;

export const Button = styled.button`
  width: 100%;
  padding: 5px 10px;
  background-color: #2c5282;
  color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #3182ce;
  }
`;

export const RemoveButton = styled(Button)`
  background-color: #9b2c2c;
  &:hover {
    background-color: #c53030;
  }
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
  padding: 20px;
  border-radius: 3px;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  margin-top: 0;
  font-size: 18px;
  color: #e0e0e0;
  border-bottom: 1px solid #4a4a4a;
  padding-bottom: 10px;
  width: 100%;
  text-align: center;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  width: 90%;
  padding: 8px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  border: 1px solid #4a4a4a;
  border-radius: 3px;

  &:focus {
    outline: none;
    border-color: #3182ce;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

export const ModalButton = styled(Button)`
  &:disabled {
    background-color: #4a5568;
    cursor: not-allowed;
  }
`;
