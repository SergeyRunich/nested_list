import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./modal";
import { saveToIndexedDB, loadFromIndexedDB } from "../utils/db";

interface ListItem {
  id: string;
  name: string;
  children: ListItem[];
}

const initialList: ListItem = {
  id: "1",
  name: "Root element",
  children: [],
};

const Container = styled.div`
  font-family: Arial, sans-serif;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
  color: #e0e0e0;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px 120px;
  gap: 10px;
  padding: 10px 20px;
  font-weight: bold;
  background-color: #2d2d2d;
  border-bottom: 2px solid #4a4a4a;
`;

const ScrollableList = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  padding: 0 20px;
`;

const ListItemContainer = styled.div<{ level: number }>`
  display: grid;
  grid-template-columns: 1fr 120px 120px;
  gap: 10px;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #333;
`;

const ItemContent = styled.div<{ level: number }>`
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

const ItemName = styled.span`
  font-weight: bold;
  color: #e0e0e0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

const Button = styled.button`
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

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const RemoveButton = styled(Button)`
  background-color: #9b2c2c;

  &:hover {
    background-color: #c53030;
  }
`;

const NestedList: React.FC = () => {
  const [list, setList] = useState<ListItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentParent, setCurrentParent] = useState<ListItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{
    parent: ListItem;
    item: ListItem;
  } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const savedData = await loadFromIndexedDB("nestedListData");
      setList(savedData || initialList);
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (list && !isLoading) {
      saveToIndexedDB("nestedListData", list);
    }
  }, [list, isLoading]);

  const addChild = (parent: ListItem) => {
    setCurrentParent(parent);
    setIsAddModalOpen(true);
  };

  const handleAddChild = (name: string) => {
    if (currentParent && name.trim() !== "") {
      const newChild: ListItem = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        children: [],
      };
      currentParent.children.push(newChild);
      setList({ ...list! });
    }
    setIsAddModalOpen(false);
  };

  const openDeleteModal = (parent: ListItem, item: ListItem) => {
    setItemToDelete({ parent, item });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteItem = () => {
    if (itemToDelete) {
      const { parent, item } = itemToDelete;
      parent.children = parent.children.filter((child) => child.id !== item.id);
      setList({ ...list! });
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const renderListItem = (
    item: ListItem,
    level: number,
    parent: ListItem | null
  ) => (
    <React.Fragment key={item.id}>
      <ListItemContainer level={level}>
        <ItemContent level={level}>
          <ItemName>{item.name}</ItemName>
        </ItemContent>
        <Button onClick={() => addChild(item)}>Add Child</Button>
        {parent && (
          <RemoveButton onClick={() => openDeleteModal(parent, item)}>
            Remove
          </RemoveButton>
        )}
      </ListItemContainer>
      {item.children.map((child) => renderListItem(child, level + 1, item))}
    </React.Fragment>
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <ListContainer>
        <ListHeader>
          <div>Name</div>
          <div>Add Child</div>
          <div>Remove</div>
        </ListHeader>
        <ScrollableList>{list && renderListItem(list, 0, null)}</ScrollableList>
      </ListContainer>
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddChild}
        title='Add new item'
        showInput={true}
      />
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSubmit={handleDeleteItem}
        title='Delete Item'
      >
        <p>Are you sure you want to delete "{itemToDelete?.item.name}"?</p>
        <p>This action cannot be undone.</p>
      </Modal>
    </Container>
  );
};

export default NestedList;
