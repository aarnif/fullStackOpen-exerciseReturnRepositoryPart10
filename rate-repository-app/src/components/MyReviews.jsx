import Text from "./Text";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import {
  ratingContainerHeight,
  styles,
  ItemSeparator,
} from "./SingleRepository";
import { FlatList, View, StyleSheet } from "react-native";
import { format } from "date-fns";

export const ReviewItem = ({ review }) => {
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
          {review.repository.fullName}
        </Text>
        <Text color={"textSecondary"} style={styles.textParagraph}>
          {formattedDate}
        </Text>
        <Text style={styles.textParagraph}>{review.text}</Text>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { data, error, loading } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  if (loading) {
    return null;
  }

  const reviewNodes = data.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  console.log(reviewNodes);
  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
