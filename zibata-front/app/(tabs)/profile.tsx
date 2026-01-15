import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/themed-view';

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Profile content will go here */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
