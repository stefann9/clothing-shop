import { useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.style.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
      resetFormFields();
    } catch (e) {
      if (e.code === "auth/invalid-login-credentials") alert("Invalid login credentials ");
      console.log(e);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
    } catch (e) {
      if (e.code === "auth/popup-closed-by-user") console.log("Sign in failed");
      console.log(e);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span> Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          value={email}
          name="email"
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          value={password}
          name="password"
        />
        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
