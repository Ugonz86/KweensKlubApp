import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import Amplify, { Auth } from "aws-amplify";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import awsmobile from "./aws-exports";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import ConfirmSignUp from "./src/screens/ConfirmSignUp";
import Home from "./src/screens/Home";
import Landing from "./src/screens/Landing";
import "react-native-gesture-handler";

Amplify.configure(awsmobile);

const AuthenticationStack = createStackNavigator();
const AppStack = createStackNavigator();

const AuthenticationNavigator = (props) => {
  return (
    <AuthenticationStack.Navigator headerShown={false}>
      <AuthenticationStack.Screen
        name="SignIn"
        options={{
          title: "Sign In",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {(screenProps) => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: "Sign Up",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <AuthenticationStack.Screen
        name="ConfirmSignUp"
        component={ConfirmSignUp}
      />
    </AuthenticationStack.Navigator>
  );
};

const AppNavigator = (props) => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AppStack.Screen name="Home">
        {(screenProps) => (
          <Home {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
};

const Initializing = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 100000);
    return () => clearTimeout(timer);
  }, []);

  console.log("initializing...");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      {show ? <Landing /> : <ActivityIndicator size="large" color="red" />}
    </View>
  );
};

function App({ username }) {
  const [isUserLoggedIn, setUserLoggedIn] = useState("initializing");

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    // const user = Auth.currentAuthenticatedUser();
    try {
      await Auth.currentAuthenticatedUser();
      console.log("✅ User is signed in");
      setUserLoggedIn("loggedIn");
    } catch (err) {
      console.log("❌ User is not signed in");
      setUserLoggedIn("loggedOut");
    }
  }

  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  }

  return (
    <NavigationContainer>
      {isUserLoggedIn === "initializing" && <Initializing />}
      {isUserLoggedIn === "loggedIn" && (
        <AppNavigator updateAuthState={updateAuthState} />
      )}
      {isUserLoggedIn === "loggedOut" && (
        <AuthenticationNavigator updateAuthState={updateAuthState} />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
