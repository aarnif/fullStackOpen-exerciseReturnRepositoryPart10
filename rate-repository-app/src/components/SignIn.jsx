import Text from "./Text";
import { Pressable, View } from "react-native";
import { Formik, useField } from "formik";
import FormikTextInput from "./FormikTextInput";

const initialValues = {
  username: "",
  password: "",
};

const SignInForm = ({ onSubmit }) => {
  const [usernameField, usernameMeta, usernameHelpers] = useField("username");
  const [passowordField, passwordMeta, passwordHelpers] = useField("password");

  const styles = {
    formContainer: {
      display: "flex",
      padding: 20,
      backgroundColor: "white",
    },
    formField: {
      padding: 15,
      borderStyle: "solid",
      borderColor: "darkgrey",
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20,
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
  const onSubmit = () => {
    console.log("Clicked Sign in!");
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
