import { List } from "react-native-paper";

const SortingMenu = ({ selectedSorting, setSelectedSorting }) => (
  <List.AccordionGroup>
    <List.Accordion title="Sort Repositories By" id="1">
      <List.Item
        title="Latest repositories"
        onPress={() => setSelectedSorting("LATEST")}
      />
      <List.Item
        title="Highest rated repositories"
        onPress={() => setSelectedSorting("HIGHEST_RATED")}
      />
      <List.Item
        title="Lowest rated repositories"
        onPress={() => setSelectedSorting("LOWEST_RATED")}
      />
    </List.Accordion>
  </List.AccordionGroup>
);

export default SortingMenu;
