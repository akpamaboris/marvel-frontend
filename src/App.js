import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const MenuBar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <br />
      <Link to="/characters">Characters</Link>
      <br />
      <Link to="/comics">Comics</Link>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <h1>Welcome to my App</h1>
      <br />
      <Link Link to="/characters">
        Click here to access the characters
      </Link>
    </div>
  );
};

const Comics = () => {
  const [data, setData] = useState();
  //some state for react-ReactPaginate

  // _--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const getNextPage = async () => {
    setIsLoading(true);
    setCurrentPage((prevState) => prevState + 1);
    const res = await axios.get(
      `http://localhost:4000/comics?page=${currentPage + 1}`
    );
    const dataReceived = res.data;
    // For displaying Data
    setData(dataReceived);
    setIsLoading(false);
  };

  const getPreviousPage = async () => {
    setIsLoading(true);
    setCurrentPage((prevState) => prevState - 1);
    const res = await axios.get(
      `http://localhost:4000/comics?page=${currentPage - 1}`
    );
    const dataReceived = res.data;
    // For displaying Data
    setData(dataReceived);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:4000/comics?page=${currentPage}`)
      .then((response) => {
        const dataReceived = response.data;
        // For displaying Data
        setData(dataReceived);
        setIsLoading(false);
      });
  }, [currentPage]);

  return (
    <div>
      {isLoading ? (
        <span>is loading</span>
      ) : (
        <div>
          <h1> Marvel App</h1>
          {console.log(data)}
          {data.map((x, index) => {
            return (
              <div>
                <h1>Titre</h1>
                {x.title}
              </div>
            );
          })}
          {currentPage === 0 ? (
            <button onClick={getPreviousPage} disabled>
              Previous Page
            </button>
          ) : (
            <button onClick={getPreviousPage}>Previous Page</button>
          )}
          {currentPage}
          {currentPage === 474 ? (
            <button onClick={getNextPage} disabled>
              Next Page
            </button>
          ) : (
            <button onClick={getNextPage}>Next Page</button>
          )}
        </div>
      )}
    </div>
  );
};

const Characters = () => {
  const [data, setData] = useState();
  //some state for react-ReactPaginate

  // _--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const getNextPage = async () => {
    setIsLoading(true);
    setCurrentPage((prevState) => prevState + 1);
    const res = await axios.get(
      `http://localhost:4000/characters?page=${currentPage + 1}`
    );
    const dataReceived = res.data;
    // For displaying Data
    setData(dataReceived);
    setIsLoading(false);
  };

  const getPreviousPage = async () => {
    setIsLoading(true);
    setCurrentPage((prevState) => prevState - 1);
    const res = await axios.get(
      `http://localhost:4000/characters?page=${currentPage - 1}`
    );
    const dataReceived = res.data;
    // For displaying Data
    setData(dataReceived);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:4000/characters?page=${currentPage}`)
      .then((response) => {
        const dataReceived = response.data;
        // For displaying Data
        setData(dataReceived);
        setIsLoading(false);
      });
  }, [currentPage]);

  return (
    <div>
      {isLoading ? (
        <span>is loading</span>
      ) : (
        <div>
          <h1> Marvel App</h1>
          {console.log(data)}
          {data.map((x, index) => {
            return (
              <div>
                <h1>Name</h1>
                {x.name}
              </div>
            );
          })}
          {currentPage === 0 ? (
            <button onClick={getPreviousPage} disabled>
              Previous Page
            </button>
          ) : (
            <button onClick={getPreviousPage}>Previous Page</button>
          )}
          {currentPage}
          {currentPage === 14 ? (
            <button onClick={getNextPage} disabled>
              Next Page
            </button>
          ) : (
            <button onClick={getNextPage}>Next Page</button>
          )}
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <MenuBar />
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/characters" component={Characters} />
          <Route path="/comics" component={Comics} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
