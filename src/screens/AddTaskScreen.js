import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';

export default function AddTaskScreen({ route, navigation }) {
  const [task, setTask] = useState('');
  const { setTasks, taskToEdit, taskIndex } = route.params || {};

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit.text);
    }
  }, [taskToEdit]);

  const handleSaveTask = () => {
    if (task.trim()) {
      if (taskToEdit) {
        // Edit existing task
        setTasks((prevTasks) =>
          prevTasks.map((t, i) =>
            i === taskIndex ? { ...t, text: task } : t
          )
        );
      } else {
        // Add new task
        setTasks((prevTasks) => [...prevTasks, { text: task, done: false }]);
      }
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={taskToEdit ? 'Edit Task' : 'Add Task'} />
      </Appbar.Header>
      <TextInput
        label="Task"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSaveTask} style={styles.button}>
        {taskToEdit ? 'Save Changes' : 'Add Task'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: { marginBottom: 16 },
  button: { marginTop: 16 },
});
