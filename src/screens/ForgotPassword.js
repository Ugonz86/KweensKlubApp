import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";

export default function ForgotPassword({ navigation }) {
  const [userName, setUserName] = useState("");

  async function forgotPassword() {
    try {
      await Auth.forgotPassword(userName);
      navigation.navigate("ResetPassword");
    } catch (error) {
      alert(error.code, "There was an error. Please try again.");
    }
  }

  return (
    <SafeAreaView style={styles.body}>
      <AppTextInput
        value={userName}
        onChangeText={(text) => setUserName(text)}
        leftIcon="account"
        placeholder="Enter Username"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <AppButton title="Submit" onPress={forgotPassword} />
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
