import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Auth } from "aws-amplify";
import { SafeAreaView } from "react-native-safe-area-context";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function signUp() {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email },
      });
      navigation.navigate("ConfirmSignUp");
    } catch (error) {
      alert(error, "Error signing up. Please try again.")
    }
  }
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Image source={require("../images/kklogo2.png")} style={styles.logo} />
        <Text style={styles.title}>
          Sign Up to make reservations, purchase memberships, receive news of
          upcoming events and more!
        </Text>
        <AppTextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          leftIcon="account"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppTextInput
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          leftIcon="account"
          placeholder="Enter full name"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="name"
        />
        <AppTextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
        />
        <AppTextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon="email"
          placeholder="Confirm email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppButton title="Sign Up" onPress={signUp} />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.forgotPasswordButtonText}>
              Already have an Kweens Klub account?
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "grey",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    color: "grey",
    fontWeight: "500",
    marginVertical: 15,
    padding: 10,
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordButtonText: {
    color: "grey",
    fontSize: 16,
    fontWeight: "600",
  },
  logo: {
    width: 80,
    height: 80,
    tintColor: "white",
    alignSelf: "center",
  },
});
