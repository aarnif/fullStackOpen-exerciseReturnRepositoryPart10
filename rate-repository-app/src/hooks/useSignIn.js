import { useMutation } from "@apollo/client";
import { AUTHENTICATE_USER } from "../graphql/mutations";
import AuthStorage from "../utils/authStorage";
import { ApolloClient } from "@apollo/client";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE_USER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const authStorage = new AuthStorage();

  const signIn = async ({ username, password }) => {
    const credentials = {
      credentials: { username: username, password: password },
    };
    const { data } = await mutate({ variables: credentials });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    return result;
  };

  return [signIn, result];
};

export default useSignIn;
