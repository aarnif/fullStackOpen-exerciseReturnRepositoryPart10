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
  searchWord,
  setSearchWord,
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
      renderItem={({ item }) => {
        return <RepositoryItem item={item} showLinkToGitHubPage={false} />;
      }}
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

  let queryArgs = null;

  switch (selectedSorting) {
    case "LATEST":
      queryArgs = {
        searchKeyword: debouncedSearchWord,
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
      };
      break;
    case "HIGHEST_RATED":
      queryArgs = {
        searchKeyword: debouncedSearchWord,
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
      };
      break;
    case "LOWEST_RATED":
      queryArgs = {
        searchKeyword: debouncedSearchWord,
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC",
      };
      break;
  }

  const { repositories } = useRepositories(queryArgs);

  return (
    <RepositoryListContainer
      repositories={repositories}
      searchWord={searchWord}
      setSearchWord={setSearchWord}
      selectedSorting={selectedSorting}
      setSelectedSorting={setSelectedSorting}
    />
  );
};

export default RepositoryList;
