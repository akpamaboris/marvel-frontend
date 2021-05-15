import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  return (
    <div>
      <h1>Login Form</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          try {
            axios
              .post("http://localhost:4000/login", {
                email: email,
                password: password,
              })
              .then((res) => {
                console.log(res.data);
                if (res.data.token) {
                  Cookies.set("marvelAuth", res.data.token, { expires: 1 });
                  history.push("/");
                } else {
                }
              })
              .catch((err) => {
                console.log("wrong username");
              });
          } catch (err) {
            console.error(err.message);
          }
        }}
      >
        <label htmlFor="email">
          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
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

export default Login;
