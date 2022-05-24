import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ListItem, Avatar, Button } from "@rneui/themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { auth, firestore } from "./firebase";
import firebase from "./firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

const list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://gravatar.com/avatar/8a41c8482a1875f91bd972a6210432dc?s=400&d=robohash&r=x",
    date: "02/05/2022",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://gravatar.com/avatar/aa4b04c14bb1f7f97153e2a1d5bc76a9?s=400&d=robohash&r=x",
    date: "01/05/2022",
  },
  {
    name: "Amy Farha",
    avatar_url:
      "https://gravatar.com/avatar/8a41c8482a1875f91bd972a6210432dc?s=400&d=robohash&r=x",
    date: "28/04/2022",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://gravatar.com/avatar/aa4b04c14bb1f7f97153e2a1d5bc76a9?s=400&d=robohash&r=x",
    date: "23/04/2022",
  },
  {
    name: "Amy Farha",
    avatar_url:
      "https://gravatar.com/avatar/8a41c8482a1875f91bd972a6210432dc?s=400&d=robohash&r=x",
    date: "20/04/2022",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://gravatar.com/avatar/aa4b04c14bb1f7f97153e2a1d5bc76a9?s=400&d=robohash&r=x",
    date: "15/04/2022",
  },
];

const styless = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    color: "#fff",
    backgroundColor: "black",
  },
  text: {
    fontSize: 32,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

function HomeScreen() {
  return (
    <View
      style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }}
    >
      <Text style={{ fontSize: 32, fontWeight: "bold" }}>front door</Text>
      <View>
        <Button title="lock" style={styless.button} />
      </View>
      <View style={{ alignItems: "center" }}>
        <Avatar
          size="medium"
          rounded
          source={{ uri: "https://i.pravatar.cc/400" }}
        />
        <Text style={{ padding: 10, fontWeight: "bold" }}>
          last access 7.46AM by Mahmut
        </Text>
        <Text style={{ fontWeight: "bold" }}>door was unlocked</Text>
      </View>
    </View>
  );
}

function ProfileScreen({ navigation }) {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {auth.currentUser?.email && (<Text>Email: {auth.currentUser?.email}</Text>)}
        {auth.currentUser?.phoneNumber && (<Text>Phone Number: {auth.currentUser?.phoneNumber}</Text>)}
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
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
        navigation.replace("ProfilePage");
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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Display Name"
          value={displayName}
          onChangeText={(text) => setDisplayName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("LoginWithCode")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Login with Access Code</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function LoginWithCodeScreen({ navigation }) {
  const [code, setCode] = useState("");

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      "AJOnW4RYF_1spolFUYh5tSstOGEC-PEPwkroN7lilK-8IZkySnSAOKL1TDSBwJLCvvdOUShek1GRsbfLXK1jDVHGjNxk2q1wTQPBW52lNVKVUG7G8m32CcM19MKC29o9vM9IpTnpOa7fnUGpsuLmrlJJN_TdivBDkuwsVgCa_mbdf-BIDIe3xl5iKDYa8k70Zg3CvSLZhhOfCnRHOBVqh2jxgojcW9O_9V3Ey_G10Q4_TziEIgIb-wE",
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
      style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }}
    >
      <View style={styles.inputContainer}>
        {/* Verification Code Input */}
        <TextInput
          placeholder="Confirmation Code"
          onChangeText={setCode}
          keyboardType="number-pad"
          style={styles.input}
        />
        <TouchableOpacity onPress={confirmCode} style={styles.button}>
          <Text style={styles.buttonText}>Send Verification</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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

function AccessLogScreen() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    firestore
      .collection("users")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          var data = element.data();
          setInfo((arr) => [...arr, data]);
        });
      });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView>
        {info &&
          info.length > 0 &&
          info.map((log) => {
            return (
              <ListItem key={log.uid} bottomDivider>
                <Avatar source={{ uri: "https://gravatar.com/avatar/8a41c8482a1875f91bd972a6210432dc?s=400&d=robohash&r=x" }} />
                <ListItem.Content>
                  <ListItem.Title>{log.displayName}</ListItem.Title>
                  <ListItem.Subtitle>{log.createdAt}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
          })}
      </ScrollView>
    </View>
  );
}
function ShareKeyScreen() {
  const [verificationId, setVerificationId] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const recaptchaVerifier = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
  };

  // const confirmCode = () => {
  //   const credential = firebase.auth.PhoneAuthProvider.credential(
  //     verificationId,
  //     code
  //   );
  //   auth.signInWithCredential(credential).then((result) => {
  //     // Do something with the results here
  //     console.log(result);
  //   });
  // };

  return (
    <View
      style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }}
    >
      {isLoggedIn && (
        <View style={styles.inputContainer}>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebase.app().options}
            attemptInvisibleVerification={true}
          />
          {/* Phone Number Input */}
          <TextInput
            placeholder="Phone Number"
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            autoCompleteType="tel"
            style={styles.input}
          />
          <TouchableOpacity onPress={sendVerification} style={styles.button}>
            <Text style={styles.buttonText}>Share Key</Text>
          </TouchableOpacity>
          {/* Verification Code Input */}
          {/* <TextInput
          placeholder="Confirmation Code"
          onChangeText={setCode}
          keyboardType="number-pad"
          style={styles.input}
        />
        <TouchableOpacity onPress={confirmCode}>
          <Text>Send Verification</Text>
        </TouchableOpacity> */}
        </View>
      )}
      {!isLoggedIn && <Text>You should login or register to share key</Text>}
    </View>
  );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{ headerShown: false, headerBackVisible: true }}
    >
      <ProfileStack.Screen name="Login" component={LoginScreen} />
      <ProfileStack.Screen
        name="LoginWithCode"
        component={LoginWithCodeScreen}
      />
      <ProfileStack.Screen name="ProfilePage" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home-outline";
            } else if (route.name === "AccessLog") {
              iconName = "key-outline";
            } else if (route.name === "ShareKey") {
              iconName = "share-social-outline";
            } else if (route.name === "Profile") {
              iconName = "person";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="AccessLog" component={AccessLogScreen} />
        <Tab.Screen name="ShareKey" component={ShareKeyScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: "rgba(78, 116, 289, 1)",
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
    marginRight: 20,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
