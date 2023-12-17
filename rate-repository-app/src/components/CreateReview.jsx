import { useNavigate } from "react-router-native";
import Text from "./Text";
import { Pressable, View } from "react-native";
import { Formik, useField } from "formik";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";
import { useMutation, useApolloClient } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const initialValues = {
  repositoryOwnerName: "",
  repositoryName: "",
  repositoryRating: "",
  repositoryReview: "",
};

const validationSchema = yup.object().shape({
  repositoryOwnerName: yup
    .string()
    .required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  repositoryRating: yup.number().min(0).max(100).required("Rating is required"),
  repositoryReview: yup.string(),
});

const CreateReviewForm = ({ onSubmit }) => {
  const [
    repositoryOwnerNameField,
    repositoryOwnerNameMeta,
    repositoryOwnerNameHelpers,
  ] = useField("repositoryOwnerName");
  const [repositoryNameField, repositoryNameMeta, repositoryNameHelpers] =
    useField("repositoryName");
  const [repositoryRatingField, repositoryRatingMeta, repositoryRatingHelpers] =
    useField("repositoryRating");
  const [repositoryReviewField, repositoryReviewMeta, repositoryReviewHelpers] =
    useField("repositoryReview");

  const styles = {
    formContainer: {
      display: "flex",
      padding: 20,
      backgroundColor: "white",
    },
    formButton: {
      padding: 15,
      backgroundColor: "#0366d6",
      borderRadius: 5,
      display: "flex",
      alignItems: "center",
    },
  };

  return (
    <View style={styles.formContainer}>
      <FormikTextInput
        name="repositoryOwnerName"
        placeholder="Repository owner name"
        value={repositoryOwnerNameField.value}
        onChangeText={(text) => repositoryOwnerNameHelpers.setValue(text)}
        style={styles.formField}
      ></FormikTextInput>

      <FormikTextInput
        name="repositoryName"
        placeholder="Repository name"
        value={repositoryNameField.value}
        onChangeText={(text) => repositoryNameHelpers.setValue(text)}
        style={styles.formField}
      ></FormikTextInput>

      <FormikTextInput
        name="repositoryRating"
        placeholder="Rating between 0 and 100"
        value={repositoryRatingField.value}
        onChangeText={(text) => repositoryRatingHelpers.setValue(text)}
        style={styles.formField}
      ></FormikTextInput>

      <FormikTextInput
        name="repositoryReview"
        placeholder="Review"
        multiline={true}
        value={repositoryReviewField.value}
        onChangeText={(text) => repositoryReviewHelpers.setValue(text)}
        style={styles.formField}
      ></FormikTextInput>

      <Pressable onPress={onSubmit} style={styles.formButton}>
        <Text fontWeight={"bold"} color={"header"}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {
  const navigate = useNavigate();

  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
    const {
      repositoryOwnerName,
      repositoryName,
      repositoryRating,
      repositoryReview,
    } = values;
    try {
      const review = {
        review: {
          ownerName: repositoryOwnerName,
          rating: Number(repositoryRating),
          repositoryName: repositoryName,
          text: repositoryReview,
        },
      };
      const { data } = await mutate({ variables: review });
      console.log(data);
      const id = data.createReview.repository.id;
      navigate(`/repositories/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
