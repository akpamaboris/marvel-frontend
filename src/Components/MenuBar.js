import { Link } from "react-router-dom";

const MenuBar = () => {
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
    </div>
  );
};

export default MenuBar;
