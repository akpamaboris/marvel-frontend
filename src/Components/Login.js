const Login = () => {
  return (
    <div>
      <h1>Login Form</h1>
      <form>
        <label htmlFor="email">
          <input type="email" placeholder="email" name="email" />
        </label>
        <label htmlFor="password">
          <input type="password" name="password" placeholder="password" />
        </label>
        <label htmlFor="submit">
          <input type="submit" name="submit" />
        </label>
      </form>
    </div>
  );
};

export default Login;
