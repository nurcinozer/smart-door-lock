import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ImageBackground,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth, firestore } from "../firebase";
import { useEffect, useState } from "react";
import firebase from "../firebase";
import { styles1 } from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ProfileStack.Navigator
          screenOptions={{ headerShown: false, headerBackVisible: true }}
        >
          <ProfileStack.Screen name="Login" component={LoginScreen} />
          <ProfileStack.Screen
            name="LoginWithCode"
            component={LoginWithCodeScreen}
          />
          <ProfileStack.Screen name="Profile" component={Profile} />
        </ProfileStack.Navigator>
      </ImageBackground>
    </View>
  );
}

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Profile");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
        return firestore.collection("users").doc(userCredentials.uid).set({
          displayName: displayName,
          email: email,
          createdAt: new Date().toUTCString(),
        });
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <KeyboardAvoidingView style={styles1.container} behavior="padding">
          <View style={styles1.inputContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles1.input}
            />
            <TextInput
              placeholder="Display Name"
              value={displayName}
              onChangeText={(text) => setDisplayName(text)}
              style={styles1.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles1.input}
              secureTextEntry
            />
          </View>

          <View style={styles1.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles1.button}>
              <Text style={styles1.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSignUp}
              style={[styles1.button, styles1.buttonOutline]}
            >
              <Text style={styles1.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginWithCode")}
              style={[styles1.button, styles1.buttonOutline]}
            >
              <Text style={styles1.buttonOutlineText}>
                Login with Access Code
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

function LoginWithCodeScreen({ navigation }) {
  const [code, setCode] = useState("");

  const confirmCode = async () => {
    const value = await AsyncStorage.getItem('token');
    const credential = firebase.auth.PhoneAuthProvider.credential(
      JSON.parse(value),
      code
    );
    auth.signInWithCredential(credential).then((result) => {
      // Do something with the results here
      console.log(result);
      navigation.replace("Login");
    });
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View style={styles1.inputContainer}>
            {/* Verification Code Input */}
            <TextInput
              placeholder="Confirmation Code"
              onChangeText={setCode}
              keyboardType="number-pad"
              style={styles1.input}
            />
            <TouchableOpacity onPress={confirmCode} style={styles1.button}>
              <Text style={styles1.buttonText}>Send Verification</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

function Profile({ navigation }) {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View style={styles1.container}>
          <View style={styles1.inputContainer}>
            {auth.currentUser?.email && (
              <Text>Email: {auth.currentUser?.email}</Text>
            )}
            {auth.currentUser?.phoneNumber && (
              <Text>Phone Number: {auth.currentUser?.phoneNumber}</Text>
            )}
            <TouchableOpacity onPress={handleSignOut} style={styles1.button}>
              <Text style={styles1.buttonText}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default ProfileStackScreen;
