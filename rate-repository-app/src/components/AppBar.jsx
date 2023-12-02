import { View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingLeft: 10,
    paddingBottom: 20,
    backgroundColor: "#24292e",
  },
  // ...
});

const onPressFunction = () => {
  console.log("Repositories pressed!");
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPressFunction}>
        <Text color={"header"} fontWeight={"bold"} fontSize={"navheading"}>
          Repositories
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
