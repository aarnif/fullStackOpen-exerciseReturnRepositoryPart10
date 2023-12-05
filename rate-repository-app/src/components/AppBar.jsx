import { View, StyleSheet, Pressable } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const styles = StyleSheet.create({
  navContainer: {
    paddingTop: 40,
    paddingLeft: 10,
    paddingBottom: 20,
    backgroundColor: "#24292e",
    display: "flex",
    flexDirection: "row",
  },
  navItem: {
    paddingRight: 10,
  },
});

const onPressRepos = () => {
  console.log("Repositories pressed!");
};

const onPressSignIn = () => {
  console.log("Sign in pressed!");
};

const AppBar = () => {
  return (
    <View style={styles.navContainer}>
      <View style={styles.navItem}>
        <Link to="/">
          <Pressable onPress={onPressRepos}>
            <Text color={"header"} fontWeight={"bold"} fontSize={"navheading"}>
              Repositories
            </Text>
          </Pressable>
        </Link>
      </View>
      <View style={styles.navItem}>
        <Link to="/signin">
          <Pressable onPress={onPressSignIn}>
            <Text color={"header"} fontWeight={"bold"} fontSize={"navheading"}>
              Sign in
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default AppBar;
