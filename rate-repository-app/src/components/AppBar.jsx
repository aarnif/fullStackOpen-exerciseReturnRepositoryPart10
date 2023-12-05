import { View, StyleSheet, Pressable, ScrollView } from "react-native";
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

const AppBar = () => {
  return (
    <View style={styles.navContainer}>
      <ScrollView horizontal>
        <View style={styles.navItem}>
          <Link to="/">
            <Text color={"header"} fontWeight={"bold"} fontSize={"navheading"}>
              Repositories
            </Text>
          </Link>
        </View>
        <View style={styles.navItem}>
          <Link to="/signin">
            <Text color={"header"} fontWeight={"bold"} fontSize={"navheading"}>
              Sign in
            </Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
