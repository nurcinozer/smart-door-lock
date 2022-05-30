import Tabs from "./navigation/tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ListItem, Avatar } from "@rneui/themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";

import firebase from "./firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { styles1, styles2 } from "./constants";
import React from "react";

// function RegisterScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Input placeholder="Name" />
//       <Input placeholder="Email" />
//       <Input placeholder="Password" secureTextEntry={true} />
//       <View style={styles.forgotPassword}>
//         <TouchableOpacity
//         // onPress={() => navigation.navigate('ResetPasswordScreen')}
//         >
//           <Text style={styles.forgot}>Forgot your password?</Text>
//         </TouchableOpacity>
//       </View>
//       <Button
//         title="Register"
//         buttonStyle={{
//           borderColor: "rgba(78, 116, 289, 1)",
//         }}
//         type="outline"
//         titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
//         containerStyle={{
//           width: 200,
//           marginHorizontal: 50,
//           marginVertical: 10,
//         }}
//         onPress={() => navigation.navigate("Register")}
//       />
//       <View style={styles.row}>
//         <Text>Already have an account? </Text>
//         <TouchableOpacity>
//           <Text style={styles.link}>Login</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName;

//             if (route.name === "Home") {
//               iconName = "home-outline";
//             } else if (route.name === "AccessLog") {
//               iconName = "key-outline";
//             } else if (route.name === "ShareKey") {
//               iconName = "share-social-outline";
//             } else if (route.name === "Profile") {
//               iconName = "person";
//             }

//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: "tomato",
//           tabBarInactiveTintColor: "gray",
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="AccessLog" component={AccessLogScreen} />
//         <Tab.Screen name="ShareKey" component={ShareKeyScreen} />
//         <Tab.Screen name="Profile" component={ProfileStackScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
