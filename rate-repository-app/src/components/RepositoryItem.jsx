import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";

const RepositoryItem = ({ item }) => {
  const styles = StyleSheet.create({
    profileContainer: {
      paddingTop: 15,
      paddingLeft: 15,
      paddingRight: 15,
      backgroundColor: "white",
    },
    detailsAndImageContainer: {
      display: "flex",
      flexDirection: "row",
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 5,
      marginRight: 20,
    },
    detailsContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      flex: 1,
    },
    detailsItem: {
      paddingTop: 10,
    },
    languageContainer: {
      padding: 5,
      backgroundColor: "#0366d6",
      borderRadius: 5,
    },
    statsContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    statsItem: {
      display: "flex",
      alignItems: "center",
      padding: 20,
    },
  });

  const displayNumber = (number) => {
    return number >= 1000
      ? Number.parseFloat(number / 1000).toFixed(1) + "k"
      : number;
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.detailsAndImageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: item.ownerAvatarUrl,
          }}
        />
        <View style={styles.detailsContainer}>
          <View style={styles.detailsItem}>
            <Text fontSize={"subheading"} fontWeight={"bold"}>
              {item.fullName}
            </Text>
          </View>
          <View style={styles.detailsItem}>
            <Text fontSize={"textSecondary"} color={"textSecondary"}>
              {item.description}
            </Text>
          </View>
          <View style={styles.detailsItem}>
            <View style={styles.languageContainer}>
              <Text color={"header"}>{item.language}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <Text fontWeight={"bold"}>{displayNumber(item.stargazersCount)}</Text>
          <Text color={"textSecondary"}>Stars</Text>
        </View>
        <View style={styles.statsItem}>
          <Text fontWeight={"bold"}>{displayNumber(item.forksCount)}</Text>
          <Text color={"textSecondary"}>Forks</Text>
        </View>
        <View style={styles.statsItem}>
          <Text fontWeight={"bold"}>{displayNumber(item.reviewCount)}</Text>
          <Text color={"textSecondary"}>Reviews</Text>
        </View>
        <View style={styles.statsItem}>
          <Text fontWeight={"bold"}>{displayNumber(item.ratingAverage)}</Text>
          <Text color={"textSecondary"}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
