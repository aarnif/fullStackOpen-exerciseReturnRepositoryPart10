import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });
  const [repositories, setRepositories] = useState();

  const fetchRepositories = async () => {
    if (loading) {
      console.log("Loading data...");
    } else {
      console.log("Setting repositories...");
      setRepositories(data.repositories);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, [loading]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
