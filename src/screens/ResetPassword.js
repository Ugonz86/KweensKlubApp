import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";

export default function ResetPassword({ navigation }) {
  const [userName, setUserName] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function resetPassword() {
    try {
      await Auth.forgotPasswordSubmit(userName, code, newPassword);
      navigation.navigate("SignIn");
    } catch (error) {
      alert(error, "Password Reset Action Error. Please try again.");
    }
  }

  return (
    <SafeAreaView style={styles.body}>
      <Text style={{ color: "white" }}>
        Enter the code we sent to your email and your new password
      </Text>
      <AppTextInput
        value={userName}
        onChangeText={(text) => setUserName(text)}
        leftIcon="account"
        placeholder="Enter Username"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <AppTextInput
        value={code}
        onChangeText={(text) => setCode(text)}
        leftIcon="lock"
        placeholder="Enter Code"
        keyboardType="default"
      />
      <AppTextInput
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
        leftIcon="lock"
        placeholder="Enter New Password"
        textContentType="password"
        secureTextEntry
      />

      <AppButton title="Submit" onPress={resetPassword} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 30,
    color: "white",
  },
  logo: {
    height: 150,
    width: 150,
    tintColor: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
