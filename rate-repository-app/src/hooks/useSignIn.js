import { useMutation } from "@apollo/client";
import { AUTHENTICATE_USER } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE_USER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const signIn = async ({ username, password }) => {
    const credentials = {
      credentials: { username: username, password: password },
    };
    await mutate({ variables: credentials });
    return result;
  };

  return [signIn, result];
};

export default useSignIn;
