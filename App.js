import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { ListItem, Avatar, Icon, Button } from "@rneui/themed";

const list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://gravatar.com/avatar/8a41c8482a1875f91bd972a6210432dc?s=400&d=robohash&r=x",
    subtitle: "Vice President",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://gravatar.com/avatar/aa4b04c14bb1f7f97153e2a1d5bc76a9?s=400&d=robohash&r=x",
    subtitle: "Vice Chairman",
  },
  {
    name: "Amy Farha",
    avatar_url:
      "https://gravatar.com/avatar/8a41c8482a1875f91bd972a6210432dc?s=400&d=robohash&r=x",
    subtitle: "Vice President",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://gravatar.com/avatar/aa4b04c14bb1f7f97153e2a1d5bc76a9?s=400&d=robohash&r=x",
    subtitle: "Vice Chairman",
  },
  {
    name: "Amy Farha",
    avatar_url:
      "https://gravatar.com/avatar/8a41c8482a1875f91bd972a6210432dc?s=400&d=robohash&r=x",
    subtitle: "Vice President",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://gravatar.com/avatar/aa4b04c14bb1f7f97153e2a1d5bc76a9?s=400&d=robohash&r=x",
    subtitle: "Vice Chairman",
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
          last access 7.46AM by Eylul
        </Text>
        <Text style={{ fontWeight: "bold" }}>door was unlocked</Text>
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
              <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
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

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="AccessLog" component={AccessLogScreen} />
        <Tab.Screen name="ShareKey" component={ShareKeyScreen} />
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
});
