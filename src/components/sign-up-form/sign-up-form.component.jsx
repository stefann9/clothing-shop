import { useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import {
  createAuthWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up-form.style.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassowrd: "",
};
const SignUpForm = () => {
  const {setCurrentUser} = useContext(UserContext)
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassowrd } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassowrd) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const { user } = await createAuthWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      setCurrentUser(user)
      resetFormFields();
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else {
        console.log("Error creating user", e.message);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span> Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          value={displayName}
          name="displayName"
        />

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

        <FormInput
          label="Confirm Passowrd"
          type="password"
          required
          onChange={handleChange}
          value={confirmPassowrd}
          name="confirmPassowrd"
        />

        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};
export default SignUpForm;
