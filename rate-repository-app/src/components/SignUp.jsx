import { useNavigate } from "react-router-native";
import Text from "./Text";
import { Pressable, View } from "react-native";
import { Formik, useField } from "formik";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "../hooks/useSignIn";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must be no more than 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .max(30, "Password must be no more than 50 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Password confirmation is required"),
});

const SignUpForm = ({ onSubmit }) => {
  const [usernameField, usernameMeta, usernameHelpers] = useField("username");
  const [passowordField, passwordMeta, passwordHelpers] = useField("password");
  const [
    passwordConfirmationField,
    passwordConfirmationMeta,
    passwordConfirmationHelpers,
  ] = useField("passwordConfirmation");

  const styles = {
    formContainer: {
      display: "flex",
      padding: 20,
      backgroundColor: "white",
    },
    formButton: {
      padding: 15,
      backgroundColor: "#0366d6",
      borderRadius: 5,
      display: "flex",
      alignItems: "center",
    },
  };

  return (
    <View style={styles.formContainer}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        value={usernameField.value}
        onChangeText={(text) => usernameHelpers.setValue(text)}
        style={styles.formField}
      ></FormikTextInput>

      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
        value={passowordField.value}
        onChangeText={(text) => passwordHelpers.setValue(text)}
        style={styles.formField}
      ></FormikTextInput>

      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry={true}
        value={passwordConfirmationField.value}
        onChangeText={(text) => passwordConfirmationHelpers.setValue(text)}
        style={styles.formField}
      ></FormikTextInput>

      <Pressable onPress={onSubmit} style={styles.formButton}>
        <Text fontWeight={"bold"} color={"header"}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const [mutate, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
    const { username, password } = values;
    try {
      const newUser = {
        user: {
          password: password,
          username: username,
        },
      };
      const { data } = await mutate({ variables: newUser });
      console.log(data);
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
