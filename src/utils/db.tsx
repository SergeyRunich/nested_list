import { openDB, DBSchema } from "idb";

interface MyDB extends DBSchema {
  nestedList: {
    key: string;
    value: any;
  };
}

const dbPromise = openDB<MyDB>("NestedListDB", 1, {
  upgrade(db) {
    db.createObjectStore("nestedList");
  },
});

export async function saveToIndexedDB(key: string, value: any) {
  const db = await dbPromise;
  await db.put("nestedList", value, key);
}

export async function loadFromIndexedDB(key: string) {
  const db = await dbPromise;
  return db.get("nestedList", key);
}
