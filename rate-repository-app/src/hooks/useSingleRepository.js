import { useQuery } from "@apollo/client";

import { GET_SINGLE_REPO } from "../graphql/queries";

const useSingleRepository = (variables) => {
  console.log(variables);
  const { data, loading, fetchMore, ...result } = useQuery(GET_SINGLE_REPO, {
    fetchPolicy: "cache-and-network",
    variables: variables,
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    console.log(canFetchMore);

    if (!canFetchMore) {
      console.log("Cannot fetch more reviews");
      return;
    }
    console.log("Fetching more reviews");
    console.log(data);
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repository: data?.repository,
    reviews: data?.repository.reviews,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useSingleRepository;
