import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import SearchBar from "./SearchBar";
import SortingMenu from "./SortingMenu";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  onEndReach,
  searchWord,
  setSearchWord,
  selectedSorting,
  setSelectedSorting,
}) => {
  console.log(repositories);
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  console.log(repositoryNodes);

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
          <SortingMenu
            selectedSorting={selectedSorting}
            setSelectedSorting={setSelectedSorting}
          />
        </>
      }
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => {
        return <RepositoryItem item={item} showLinkToGitHubPage={false} />;
      }}
      keyExtractor={({ id }) => id}
    />
  );
};

const RepositoryList = () => {
  const [searchWord, setSearchWord] = useState("");
  const [debouncedSearchWord, setDebouncedSearchWord] = useDebounce(
    searchWord,
    500
  );

  const [selectedSorting, setSelectedSorting] = useState("LATEST");

  let variables = null;

  switch (selectedSorting) {
    case "LATEST":
      variables = {
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
      };
      break;
    case "HIGHEST_RATED":
      variables = {
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
      };
      break;
    case "LOWEST_RATED":
      variables = {
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC",
      };
      break;
  }

  const { repositories, fetchMore } = useRepositories({
    ...variables,
    first: 3,
    searchKeyword: debouncedSearchWord,
  });

  const onEndReach = () => {
    console.log("You have reached the end of the repository list");
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      searchWord={searchWord}
      setSearchWord={setSearchWord}
      selectedSorting={selectedSorting}
      setSelectedSorting={setSelectedSorting}
    />
  );
};

export default RepositoryList;
