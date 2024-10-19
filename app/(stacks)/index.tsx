import { useTodoContext } from "@/src/context/toDoContext";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Pressable,
  Button,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
export default function index() {
  // const [newTodo, setNewTodo] = useState("New Todo");
  const { state, dispatch } = useTodoContext();
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]);
  const handleAddTodo = () => {
    console.log(state);

    dispatch({ type: "ADD_TODO", payload: "newTodo" });
  };

  const renderTodoItem = ({
    item,
  }: {
    item: { id: number; title: string; desc: string; done: boolean };
  }) => (
    <View>
      <TouchableOpacity
        onLongPress={() => handleLongPress(item.id)}
        onPress={() =>
          router.push({
            pathname: "/todo/[id]",
            params: { id: item.id },
          })
        }
      >
        <Text>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  const handleLongPress = (id: number) => {
    setSelectedTodos(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((selectedId) => selectedId !== id) // Deselect if already selected
          : [...prevSelected, id] // Select if not selected
    );
  };

  const handleMarkDone = () => {
    selectedTodos.forEach((id) =>
      dispatch({ type: "TOGGLE_TODO", payload: id })
    );
    setSelectedTodos([]); // Clear selections after the action
  };

  const handleDeleteSelected = () => {
    selectedTodos.forEach((id) =>
      dispatch({ type: "DELETE_TODO", payload: id })
    );
    setSelectedTodos([]); // Clear selections after deletion
  };
  return (
    <SafeAreaView className="">
      <View className="divide-y">
        <View className=" pt-4 px-2">
          <Text className="text-2xl font-semibold">My To do list</Text>
          <AntDesign
            name="plussquareo"
            size={24}
            color="black"
            onPress={handleAddTodo}
          />
        </View>

        {selectedTodos.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 16,
            }}
          >
            <Text>{selectedTodos.length}</Text>
            <View>
              <Feather name="check" size={24} color="black" />
              <Feather name="trash" size={24} color="black" />
            </View>
          </View>
        )}

        {state.todos.length > 0 ? (
          <FlatList
            data={state.todos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTodoItem}
          />
        ) : (
          <Pressable onPress={handleAddTodo}>
            <Text>you dont have a Todo's Yet</Text>
            <Text>click to Create new Todo's</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}
