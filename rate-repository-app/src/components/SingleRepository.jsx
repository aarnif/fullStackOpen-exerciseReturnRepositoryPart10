import RepositoryItem from "./RepositoryItem";
import { FlatList, View, StyleSheet } from "react-native";
import Text from "./Text";
import { format } from "date-fns";
import useSingleRepository from "../hooks/useSingleRepository";

export const ratingContainerHeight = 50;

export const styles = StyleSheet.create({
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

export const ItemSeparator = () => <View style={styles.separator} />;

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
  const variables = { repositoryId: repositoryId };

  const { repository, fetchMore, loading } = useSingleRepository({
    ...variables,
    first: 4,
  });

  if (loading) {
    return null;
  }

  const onEndReach = () => {
    console.log("You have reached the end of the current review list");
    fetchMore();
    console.log(repository.reviews);
  };

  const reviewNodes = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  console.log(reviewNodes);

  return (
    <FlatList
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default SingleRepository;
