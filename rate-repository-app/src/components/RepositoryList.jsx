import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import SortingMenu from "./SortingMenu";
import { useState } from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  selectedSorting,
  setSelectedSorting,
}) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  console.log(repositoryNodes);

  return (
    <FlatList
      ListHeaderComponent={
        <SortingMenu
          selectedSorting={selectedSorting}
          setSelectedSorting={setSelectedSorting}
        />
      }
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      // other props
      renderItem={({ item }) => {
        return <RepositoryItem item={item} showLinkToGitHubPage={false} />;
      }}
    />
  );
};

const RepositoryList = () => {
  const [selectedSorting, setSelectedSorting] = useState("LATEST");

  let queryArgs = null;

  switch (selectedSorting) {
    case "LATEST":
      queryArgs = {
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
      };
      break;
    case "HIGHEST_RATED":
      queryArgs = {
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
      };
      break;
    case "LOWEST_RATED":
      queryArgs = {
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC",
      };
      break;
  }

  const { repositories } = useRepositories(queryArgs);

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedSorting={selectedSorting}
      setSelectedSorting={setSelectedSorting}
    />
  );
};

export default RepositoryList;
