import { StyleSheet, View } from "react-native";
import { Route, Routes, useMatch, Navigate } from "react-router-native";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SingleRepository from "./SingleRepository";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews";
import CreateReview from "./CreateReview";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const matchRepo = useMatch("/repositories/:id");
  const findRepo = matchRepo
    ? repositoryNodes.find(
        (repository) => repository.id === matchRepo.params.id
      )
    : null;

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/repositories/:id"
          element={<SingleRepository repositoryId={findRepo?.id} />}
        />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
