import { View, Text, TextInput, Switch, Button } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useTodoContext } from "@/src/context/toDoContext";

export default function TodoPage() {
  const { id } = useLocalSearchParams();
  const { state, dispatch } = useTodoContext();

  const todo = state.todos.find((t) => t.id === Number(id));
  const [newData, setNewData] = useState({
    title: todo?.title || "",
    desc: todo?.desc || "",
    done: todo?.done || false,
  });

  if (!todo) {
    return <Text>Todo not found</Text>;
  }

  const handleSave = () => {
    dispatch({
      type: "EDIT_TODO",
      payload: {
        id: todo.id,
        title: newData.title,
        desc: newData.desc,
        done: newData.done,
      },
    });
    // Optionally, navigate back or show confirmation
  };

  return (
    <View>
      <TextInput
        value={newData.title}
        onChangeText={(text) => setNewData({ ...newData, title: text })}
      />
      <TextInput
        value={newData.desc}
        placeholder="Description"
        onChangeText={(text) => setNewData({ ...newData, desc: text })}
      />
      <Switch
        value={newData.done}
        onValueChange={(value) => setNewData({ ...newData, done: value })}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
