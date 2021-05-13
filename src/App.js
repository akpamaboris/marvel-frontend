import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useParams,
  useHistory,
} from "react-router-dom";

const CardCharacter = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(
        // `http://localhost:4000/characters/${id}`
        `https://marvel-backend-z.herokuapp.com/characters/${id}`
      )
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <h1> data is loadloading ... </h1>
      ) : (
        <>
          <h2>More information about what you ask</h2>
          {data.name}
          <img
            src={data.thumbnail.path + "." + data.thumbnail.extension}
            alt="comic visual detail"
          />

          {data.comics.map((x, index) => {
            return (
              <div key={x._id}>
                <h3>Title</h3> : {x.title}
                {x.description ? (
                  <div>
                    <h3>description </h3> : {x.description}
                  </div>
                ) : null}
                <h3>Thumbnail :</h3>
                <img
                  src={x.thumbnail.path + "." + x.thumbnail.extension}
                  alt=""
                />
              </div>
            );
          })}

          {console.log(data)}
        </>
      )}
    </div>
  );
};

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
      <Link to="/characters">Click here to access the characters</Link>
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
      `https://marvel-backend-z.herokuapp.com/comics?page=${currentPage + 1}`
      // `http://localhost:4000/comics?page=${currentPage + 1}`
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
      `https://marvel-backend-z.herokuapp.com/comics?page=${currentPage - 1}`
      // `http://localhost:4000/comics?page=${currentPage - 1}`
    );
    const dataReceived = res.data;
    // For displaying Data
    setData(dataReceived);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://marvel-backend-z.herokuapp.com/comics?page=${currentPage}`
        // `http://localhost:4000/comics?page=${currentPage}`
      )
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
              <div key={x._id}>
                <h2>{x.title}</h2>
                <img
                  src={x.thumbnail.path + "." + x.thumbnail.extension}
                  alt="visual description of the comics"
                />
                <p>{x.description}</p>
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
  let history = useHistory();

  const getNextPage = async () => {
    setIsLoading(true);
    setCurrentPage((prevState) => prevState + 1);
    const res = await axios.get(
      `https://marvel-backend-z.herokuapp.com/characters?page=${
        currentPage + 1
      }`

      // `http://localhost:4000/characters?page=${currentPage + 1}`
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
      `https://marvel-backend-z.herokuapp.com/characters?page=${
        currentPage - 1
      }`
      // `http://localhost:4000/characters?page=${currentPage - 1}`
    );
    const dataReceived = res.data;
    // For displaying Data
    setData(dataReceived);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://marvel-backend-z.herokuapp.com/characters?page=${currentPage}`
        // `http://localhost:4000/characters?page=${currentPage}`
      )
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
              <div
                key={x._id}
                onClick={() => history.push(`characters${x._id}`)}
              >
                <h2>{x.name}</h2>
                <img
                  src={x.thumbnail.path + "." + x.thumbnail.extension}
                  alt=""
                />
                <p>{x.description}</p>
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
          <Route path="/characters:id" component={CardCharacter} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
