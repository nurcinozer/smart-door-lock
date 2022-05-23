import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ListItem, Avatar, Button } from "@rneui/themed";
import { Input } from "react-native-elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "normal",
          textAlign: "center",
          lineHeight: 24,
          marginBottom: 50,
        }}
      >
        The easiest way to lock/unlock door with this amazing application.
      </Text>
      <View>
        <Button
          title="Login"
          buttonStyle={{
            borderColor: "rgba(78, 116, 289, 1)",
            backgroundColor: "rgba(78, 116, 289, 1)",
          }}
          type="outline"
          titleStyle={{ color: "white" }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate("Login")}
        />
        <Button
          title="Register"
          buttonStyle={{
            borderColor: "rgba(78, 116, 289, 1)",
          }}
          type="outline"
          titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
}

function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Input placeholder="Email" />
      <Input placeholder="Password" secureTextEntry={true} />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
        // onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button
        title="Login"
        buttonStyle={{
          borderColor: "rgba(78, 116, 289, 1)",
          backgroundColor: "rgba(78, 116, 289, 1)",
        }}
        type="outline"
        titleStyle={{ color: "white" }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
      />
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function RegisterScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Input placeholder="Name" />
      <Input placeholder="Email" />
      <Input placeholder="Password" secureTextEntry={true} />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
        // onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button
        title="Register"
        buttonStyle={{
          borderColor: "rgba(78, 116, 289, 1)",
        }}
        type="outline"
        titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={() => navigation.navigate("Register")}
      />
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function AccessLogScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView>
        {list.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{ uri: l.avatar_url }} />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.date}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
}
function ShareKeyScreen() {
  return (
    <View
      style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }}
    >
      <Button title="share key" style={styless.button} />
    </View>
  );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{ headerShown: false, headerBackVisible: true }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Login" component={LoginScreen} />
      <ProfileStack.Screen name="Register" component={RegisterScreen} />
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
    backgroundColor: "#fff",
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
});
