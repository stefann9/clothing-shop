import { useState } from "react";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassowrd: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassowrd } = formFields;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1> Sign up with your email and password</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formFields);
        }}
      >
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
