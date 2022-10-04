import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Auth } from "aws-amplify";
import { SafeAreaView } from "react-native-safe-area-context";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";

export default function SignIn({ navigation, updateAuthState }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function signIn() {
    try {
      await Auth.signIn(username, password);
      console.log("✅ Success");
      updateAuthState("loggedIn");
    } catch (error) {
      console.log("❌ Error signing in...", error);
      alert("Error. Please try again.");
    }
  }
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
      <Image
                source={require("../images/kklogo2.png")}
                // color={focused ? "red" : "#999999"}
                style={styles.logo}
              />
        <Text style={styles.title}>Sign in to your Kweens Klub account</Text>
        <AppTextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          leftIcon="account"
          placeholder="Enter username"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
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
        <AppButton title="Login" onPress={signIn} />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.forgotPasswordButtonText}>
              Don't have a Kweens account?
            </Text>
            <Text style={{fontWeight: 'bold', color: 'grey', fontSize: 18, textAlign: 'center'}}>Sign Up Now</Text>
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
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordButtonText: {

    color: "grey",
    fontSize: 16,
 
  },
  logo: {
    width: 80,
    height: 80,
    tintColor: "white",
    marginVertical: 15,
    // marginBottom: 20,
    alignSelf: "center",
  }
});