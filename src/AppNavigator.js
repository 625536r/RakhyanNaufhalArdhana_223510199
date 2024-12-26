import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'To-Do List' }} />
      <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Add Task' }} />
    </Stack.Navigator>
  );
}
