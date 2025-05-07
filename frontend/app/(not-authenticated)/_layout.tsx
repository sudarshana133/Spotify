import { Slot } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

function NotAuthenticatedLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Slot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default NotAuthenticatedLayout;
