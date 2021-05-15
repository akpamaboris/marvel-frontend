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
    </div>
  );
};

export default MenuBar;
