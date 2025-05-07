import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Text } from "react-native";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    >
      <Text style={{ color: "#fff" }}>Hello, World!</Text>
      <Text style={{ color: "#fff" }}>Welcome to the Explore Tab!</Text>
    </ParallaxScrollView>
  );
}
