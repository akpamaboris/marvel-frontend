const Register = () => {
  return (
    <div>
      <h1>Register</h1>
      <form>
        <label htmlFor="email">
          <input type="email" placeholder="email" />
        </label>
        <label htmlFor="password">
          <input type="password" placeholder="password" />
        </label>
        <label htmlFor="submit">
          <input type="submit" name="submit" />
        </label>
      </form>
    </div>
  );
};

export default Register;
