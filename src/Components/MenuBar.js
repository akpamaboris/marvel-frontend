import { Link } from "react-router-dom";

const MenuBar = ({ userToken }) => {
  return (
    <div>
      <Link to="/">Home</Link>
      <br />
      <Link to="/characters">Characters</Link>
      <br />
      <Link to="/comics">Comics</Link>
      <br />
      <Link to="/favorites">Favorites</Link>
      <br />
      <Link to="/register">Register</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/Logout">Logout</Link>

      {userToken ? (
        <span>
          <h1>Connected</h1>
        </span>
      ) : (
        <span>
          <h2>Not Connected</h2>
        </span>
      )}
    </div>
  );
};

export default MenuBar;
