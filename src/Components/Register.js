import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          try {
            axios
              .post(
                "https://marvel-backend-z.herokuapp.com/register",

                {
                  email: email,
                  password: password,
                }
              )
              .then((resp) => {
                // console.log(resp.data);
                console.log("user connected");
              });
          } catch (error) {
            console.log(error.message);
          }
        }}
      >
        <label htmlFor="email">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="submit">
          <input type="submit" name="submit" />
        </label>
      </form>
    </div>
  );
};

export default Register;
