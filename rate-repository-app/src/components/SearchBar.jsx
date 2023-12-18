import { Searchbar } from "react-native-paper";

const SearchBar = ({ searchWord, setSearchWord }) => {
  const onChangeSearch = (word) => setSearchWord(word);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchWord}
    />
  );
};

export default SearchBar;
