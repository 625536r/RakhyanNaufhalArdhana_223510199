import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, IconButton, Checkbox } from 'react-native-paper';

export default function TaskItem({ task, onDelete, onToggleDone, onEdit }) {
  return (
    <List.Item
      title={task.text}
      titleStyle={task.done ? styles.doneText : styles.text}
      left={() => (
        <Checkbox
          status={task.done ? 'checked' : 'unchecked'}
          onPress={onToggleDone}
        />
      )}
      right={() => (
        <View style={styles.actions}>
          <IconButton icon="pencil" onPress={onEdit} />
          <IconButton icon="delete" onPress={onDelete} />
        </View>
      )}
      style={styles.item}
    />
  );
}

const styles = StyleSheet.create({
  item: { backgroundColor: '#fff', marginVertical: 4, padding: 8 },
  text: { fontSize: 16 },
  doneText: { fontSize: 16, textDecorationLine: 'line-through', color: 'gray' },
  actions: { flexDirection: 'row' },
});
