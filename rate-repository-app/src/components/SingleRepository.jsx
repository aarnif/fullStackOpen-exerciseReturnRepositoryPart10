import RepositoryItem from "./RepositoryItem";
import { FlatList, View, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPO } from "../graphql/queries";
import Text from "./Text";
import { format } from "date-fns";

const ratingContainerHeight = 50;

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewsContainer: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
  },
  ratingContainer: {
    width: ratingContainerHeight,
    height: ratingContainerHeight,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#0366d6",
    borderRadius: ratingContainerHeight / 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  detailsContainer: {
    display: "flex",
    flex: 1,
    paddingBottom: 10,
  },
  textParagraph: {
    paddingBottom: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  // Repository's information implemented in the previous exercise
  return <RepositoryItem item={repository} showLinkToGitHubPage={true} />;
};

const ReviewItem = ({ review }) => {
  // Single review item
  const formattedDate = format(new Date(review.createdAt), "MM.dd.yyyy");
  return (
    <View style={styles.reviewsContainer}>
      <View style={styles.ratingContainer}>
        <Text color={"primary"} fontWeight={"bold"} fontSize={"subheading"}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text fontWeight={"bold"} style={styles.textParagraph}>
          {review.user.username}
        </Text>
        <Text color={"textSecondary"} style={styles.textParagraph}>
          {formattedDate}
        </Text>
        <Text style={styles.textParagraph}>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = ({ repositoryId }) => {
  // ...
  const { data, error, loading } = useQuery(GET_SINGLE_REPO, {
    fetchPolicy: "cache-and-network",
    variables: { repositoryId: repositoryId },
  });

  if (loading) {
    return null;
  }

  const reviewNodes = data.repository.reviews
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  console.log(reviewNodes);

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryInfo repository={data.repository} />
      )}
      // ...
    />
  );
};

export default SingleRepository;
