// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import { Auth } from "aws-amplify";

// function SignOut({ updateAuthState }) {
  
//   async function signOut() {
//     try {
//       await Auth.signOut();
//       updateAuthState("loggedOut");
//     } catch (error) {
//       alert(error);
//       console.log("Error signing out: ", error);
//     }
//   }

//   return (
//     <View style={styles.body} independent={true}>
//       <Text style={styles.text}>Confirm Sign Out</Text>
//       <TouchableOpacity onPress={signOut} style={styles.buttonStyle}>
//         <Text style={styles.btntext}>Sign Out</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   body: {
//     flex: 1,
//     backgroundColor: "black",
//     // height: "100%",
//     // margin: "auto",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     color: "white",
//     fontSize: 30,
//     fontWeight: "bold",
//     marginVertical: 15,
//   },
//   buttonStyle: {
//     backgroundColor: "red",
//     padding: 10,
//     borderRadius: 5,
//   },
//   btntext: {
//     fontSize: 20,
//     color: "white",
//   },
// });

// export default SignOut;
