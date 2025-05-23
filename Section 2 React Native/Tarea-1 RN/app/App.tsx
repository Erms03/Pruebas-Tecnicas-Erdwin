import React, { useState } from "react";
import {
  Button,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface ListItems {
  id: string;
  text: string;
}

export default function App() {
  const [items, setItems] = useState<ListItems[]>([]);

  const [newItemText, setNewItemText] = useState<string>("");

  const addItem = () => {
    if (newItemText.trim() === "") return;

    const newItem = {
      id: Date.now().toString(),
      text: newItemText,
    };

    setItems([...items, newItem]);
    setNewItemText("");
  };

  const renderItem: ListRenderItem<ListItems> = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Elementos</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nuevo elemento"
          value={newItemText}
          onChangeText={setNewItemText}
          onSubmitEditing={addItem}
        />
        <Button
          title="Agregar"
          onPress={addItem}
          disabled={!newItemText.trim()}
        />
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay elementos</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  form: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  item: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000", //
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
    fontSize: 16,
  },
});
