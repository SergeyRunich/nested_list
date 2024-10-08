import React, { useState, useEffect } from "react";
import Modal from "../modal";
import Button from "../button";
import { saveToIndexedDB, loadFromIndexedDB } from "../../utils/db";
import {
  Container,
  ListContainer,
  ListHeader,
  ScrollableList,
  ListItemContainer,
  ItemContent,
  ItemName,
} from "../../styles";

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
        id: Math.random().toString(36).slice(2, 11),
        name,
        children: [],
      };
      const updatedList = { ...list! };
      const parent = findItemById(updatedList, currentParent.id);
      if (parent) {
        parent.children.push(newChild);
        setList(updatedList);
      }
    }
    setIsAddModalOpen(false);
    setCurrentParent(null);
  };

  const findItemById = (item: ListItem, id: string): ListItem | null => {
    if (item.id === id) return item;
    for (const child of item.children) {
      const found = findItemById(child, id);
      if (found) return found;
    }
    return null;
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
          <Button
            onClick={() => openDeleteModal(parent, item)}
            variant='danger'
          >
            Remove
          </Button>
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
        onClose={() => {
          setIsAddModalOpen(false);
          setCurrentParent(null);
        }}
        onSubmit={handleAddChild}
        title='Add new item'
        showInput={true}
      />
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setItemToDelete(null);
        }}
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
