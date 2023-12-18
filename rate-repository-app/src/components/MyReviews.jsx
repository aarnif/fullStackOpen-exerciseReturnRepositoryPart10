import Text from "./Text";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";
import { styles, ItemSeparator } from "./SingleRepository";
import { FlatList, View, Pressable, Alert } from "react-native";
import { format } from "date-fns";
import { useNavigate } from "react-router-native";

const componentSpecificStyles = {
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
  },
  buttonContainer: {
    margin: 10,
    padding: 15,
    backgroundColor: "#0366d6",
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
  },
  deleteReviewButton: {
    margin: 10,
    padding: 15,
    backgroundColor: "#0366d6",
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#D70040",
  },
};

export const ReviewItem = ({
  review,
  handleViewRepository,
  handleDeleteReview,
}) => {
  // Single review item
  const formattedDate = format(new Date(review.createdAt), "MM.dd.yyyy");

  return (
    <>
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
      <View style={componentSpecificStyles.buttonsContainer}>
        <View style={componentSpecificStyles.buttonContainer}>
          <Pressable onPress={handleViewRepository}>
            <Text color={"header"} fontWeight={"bold"} fontSize={"subheading"}>
              View Repository
            </Text>
          </Pressable>
        </View>
        <View style={componentSpecificStyles.deleteReviewButton}>
          <Pressable onPress={handleDeleteReview}>
            <Text color={"header"} fontWeight={"bold"} fontSize={"subheading"}>
              Delete Review
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const MyReviews = () => {
  const { data, error, loading, refetch } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  const [mutate, result] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const navigate = useNavigate();

  if (loading) {
    return null;
  }

  const handleViewRepository = (item) => {
    console.log("View repository");
    const repositoryID = item.repository.id;
    navigate(`/repositories/${repositoryID}`);
  };

  const deleteReview = async (item) => {
    console.log("Delete review");
    const reviewID = item.id;
    const { data } = await mutate({ variables: { deleteReviewId: reviewID } });
    console.log(data);
    refetch();
  };

  const handleDeleteReview = (item) =>
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "DELETE", onPress: () => deleteReview(item) },
      ]
    );

  const reviewNodes = data.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  console.log(reviewNodes);
  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          handleViewRepository={() => handleViewRepository(item)}
          handleDeleteReview={() => handleDeleteReview(item)}
        />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
