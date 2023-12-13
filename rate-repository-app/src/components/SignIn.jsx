import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import Text from "./Text";
import { Pressable, View } from "react-native";
import { Formik, useField } from "formik";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

const SignInForm = ({ onSubmit }) => {
  const [usernameField, usernameMeta, usernameHelpers] = useField("username");
  const [passowordField, passwordMeta, passwordHelpers] = useField("password");

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

      <Pressable onPress={onSubmit} style={styles.formButton}>
        <Text fontWeight={"bold"} color={"header"}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
