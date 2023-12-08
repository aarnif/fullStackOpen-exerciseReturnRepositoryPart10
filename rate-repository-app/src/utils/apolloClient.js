import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import Constants from "expo-constants";

const apolloServerUri = Constants.manifest.extra.env.APOLLO_URI;

const httpLink = createHttpLink({
  uri: apolloServerUri,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
