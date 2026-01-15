import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/themed-view';

export default function MenuScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Menu content will go here */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
