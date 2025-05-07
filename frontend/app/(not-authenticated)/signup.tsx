import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Signup = () => {
  const [formDetails, setFormDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;
  const router = useRouter();

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={[
          styles.container,
          { paddingBottom: Math.max(20, insets.bottom) },
        ]}
      >
        <View
          style={[
            styles.card,
            screenWidth > 500 ? styles.cardWide : styles.cardFull,
          ]}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/spotify-banner.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Sign up for Spotify</Text>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                value={formDetails.username}
                onChangeText={(e) =>
                  setFormDetails({ ...formDetails, username: e })
                }
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#727272"
                autoCapitalize="none"
                keyboardType="default"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                value={formDetails.email}
                onChangeText={(e) =>
                  setFormDetails({ ...formDetails, email: e })
                }
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#727272"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                value={formDetails.password}
                onChangeText={(e) =>
                  setFormDetails({ ...formDetails, password: e })
                }
                secureTextEntry={true}
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#727272"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity style={styles.loginButton} activeOpacity={0.8}>
              <Text style={styles.loginButtonText}>SIGN UP</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <View style={styles.divider} />
              <Text style={styles.noAccountText}>Already have an account?</Text>
              <TouchableOpacity
                style={styles.signupButton}
                onPress={() => {
                  router.push("/(not-authenticated)");
                }}
              >
                <Text style={styles.signupButtonText}>LOG IN TO SPOTIFY</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    paddingTop: 32,
  },
  card: {
    backgroundColor: "#121212",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  cardWide: {
    maxWidth: 400,
    width: "100%",
  },
  cardFull: {
    width: "100%",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 144,
    height: 48,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  formContainer: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  input: {
    width: "100%",
    backgroundColor: "#181818",
    color: "#fff",
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  forgotPassword: {
    color: "#1db954",
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#1db954",
    borderRadius: 50,
    paddingVertical: 12,
    marginTop: 8,
  },
  loginButtonText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  signupContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#333333",
    marginVertical: 16,
  },
  noAccountText: {
    color: "#fff",
    marginBottom: 16,
  },
  signupButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#727272",
    borderRadius: 50,
    paddingVertical: 12,
  },
  signupButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Signup;
