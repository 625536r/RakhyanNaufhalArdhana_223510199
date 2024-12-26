import React, { useState } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { FAB, Appbar, Snackbar } from "react-native-paper";
import TaskItem from "../components/TaskItem";

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleDeleteTask = (index) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
          setSnackbarVisible(true);
        },
      },
    ]);
  };

  const handleToggleDone = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    navigation.navigate("AddTask", {
      setTasks,
      taskToEdit,
      taskIndex: index,
    });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="My Task" />
      </Appbar.Header>
      <FlatList
        data={tasks}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item, index }) => (
          <TaskItem
            task={item}
            onDelete={() => handleDeleteTask(index)}
            onToggleDone={() => handleToggleDone(index)}
            onEdit={() => handleEditTask(index)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Appbar.Content title="No tasks yet!" />
          </View>
        }
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("AddTask", { setTasks })}
      />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        Task deleted!
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  fab: { position: "absolute", right: 16, bottom: 16 },
  empty: { alignItems: "center", justifyContent: "center", marginTop: 20 },
});
