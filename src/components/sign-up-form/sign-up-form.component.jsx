const SignUpForm = () => {
  return (
    <div>
      <h1> Sign up with your email and password</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label>Display Name</label>
        <input type="text" required />

        <label>Email</label>
        <input type="email" required />

        <label>Password</label>
        <input type="password" required />

        <label>Confirm Passowrd</label>
        <input type="password" required />

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};
export default SignUpForm;
