import { useState } from "react";
import {
  createAuthWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassowrd: "",
};
const SignUpForm = () => {
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
      resetFormFields();
    } catch (e) {
      console.log("Error creating user", e.message);
    }
  };

  return (
    <div>
      <h1> Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          type="text"
          required
          onChange={handleChange}
          value={displayName}
          name="displayName"
        />

        <label>Email</label>
        <input type="email" required onChange={handleChange} value={email} name="email" />

        <label>Password</label>
        <input type="password" required onChange={handleChange} value={password} name="password" />

        <label>Confirm Passowrd</label>
        <input
          type="password"
          required
          onChange={handleChange}
          value={confirmPassowrd}
          name="confirmPassowrd"
        />

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};
export default SignUpForm;
