import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";
import { useQuery, useApolloClient } from "@apollo/client";

import { GET_USER } from "../graphql/queries";
import { useContext } from "react";
import { useState, useEffect } from "react";

import AuthStorageContext from "../contexts/AuthStorageContext";

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
  const authStorage = useContext(AuthStorageContext);
  const { data, error, loading } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
  });

  const client = useApolloClient();

  const signOut = () => {
    console.log("Sign out!");
    authStorage.removeAccessToken();
    client.resetStore();
  };

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
          {data?.me ? (
            <Pressable onPress={signOut}>
              <Text
                color={"header"}
                fontWeight={"bold"}
                fontSize={"navheading"}
              >
                Sign out
              </Text>
            </Pressable>
          ) : (
            <Link to="/signin">
              <Text
                color={"header"}
                fontWeight={"bold"}
                fontSize={"navheading"}
              >
                Sign in
              </Text>
            </Link>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
