import { useMutation, useApolloClient } from "@apollo/client";
import { AUTHENTICATE_USER } from "../graphql/mutations";
import { useContext } from "react";

import AuthStorageContext from "../contexts/AuthStorageContext";

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const client = useApolloClient();

  const [mutate, result] = useMutation(AUTHENTICATE_USER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const signIn = async ({ username, password }) => {
    const credentials = {
      credentials: { username: username, password: password },
    };
    const { data } = await mutate({ variables: credentials });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    client.resetStore();
    return { data };
  };

  return [signIn, result];
};

export default useSignIn;
