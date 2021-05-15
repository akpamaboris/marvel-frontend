import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to my App</h1>
      <br />
      <Link to="/characters">Click here to access the characters</Link>
    </div>
  );
};

export default Home;
