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
    <View className="">
      <TouchableOpacity
        onLongPress={() => handleLongPress(item.id)}
        onPress={() =>
          router.push({
            pathname: "/todo/[id]",
            params: { id: item.id },
          })
        }
        className={`bg-neutral-300 p-4 mt-5 mx-5 border-neutral-400 
          border-2 rounded-lg flex flex-row justify-between items-center
          max-h-20 overflow-hidden ${
            selectedTodos.includes(item.id) ? "border-blue-700" : ""
          }`}
      >
        <Text className="text-lg font-medium overflow-hidden max-w-md">
          {item.title}
        </Text>
        {item.done && <Feather name="check" size={24} color="green" />}
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
    <SafeAreaView className="bg-neutral-200 min-h-full">
      <View className="divide-y pt-5 px-2">
        {selectedTodos.length > 0 ? (
          <View className="flex flex-row justify-between items-center">
            <Text className="text-2xl font-medium">
              selected: {selectedTodos.length}
            </Text>
            <View className="flex flex-row gap-2">
              <Feather
                onPress={handleMarkDone}
                name="check"
                size={24}
                color="green"
              />
              <Feather
                onPress={handleDeleteSelected}
                name="trash"
                size={24}
                color="red"
              />
            </View>
          </View>
        ) : (
          <View className="  flex flex-row justify-between">
            <Text className="text-2xl font-semibold">My To do list</Text>
            <AntDesign
              name="plussquareo"
              size={24}
              color="black"
              onPress={handleAddTodo}
            />
          </View>
        )}

        {state.todos.length > 0 ? (
          <FlatList
            data={state.todos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTodoItem}
          />
        ) : (
          <Pressable onPress={handleAddTodo} className=" ">
            <View className="bg-neutral-300 m-5 p-3 border-gray-400 border-2 rounded-xl">
              {/* <Text className="text-center">you dont have a Todo's Yet</Text> */}
              <Text className="text-center text-lg">
                click to Create new Todo's
              </Text>
            </View>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}
