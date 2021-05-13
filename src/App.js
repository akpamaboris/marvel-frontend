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

import Cookies from "js-cookie";

const Favorites = ({ cookie }) => {
  const localData = localStorage.getItem("favoriteComics");
  console.log(JSON.parse(localData));
  const favComics = JSON.parse(localData);

  const localDataCharacters = localStorage.getItem("favoriteCharacters");
  const favCharacters = JSON.parse(localDataCharacters);

  return (
    <div>
      <h1>welcome to Favorites</h1>
      {favComics
        ? favComics.map((x, index) => {
            return (
              <div key={index}>
                <h2>{x.title}</h2>
                <img src={x.image} alt=" fav collection of the user" />
              </div>
            );
          })
        : null}

      {favCharacters
        ? favCharacters.map((x, index) => {
            return (
              <div key={index}>
                <h2>{x.title}</h2>
                <img src={x.image} alt=" fav collection of user character" />
              </div>
            );
          })
        : null}
    </div>
  );
};

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
      <br />
      <Link to="/favorites">Favorites</Link>
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

const Comics = ({ setCookie, cookies }) => {
  const [data, setData] = useState();
  //some state for react-ReactPaginate

  // _--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [favComics, setFavComics] = useState([]);

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
  useEffect(() => {
    localStorage.setItem("favoriteComics", JSON.stringify(favComics));
  }, [favComics]);
  return (
    <div>
      {isLoading ? (
        <span>is loading</span>
      ) : (
        <div>
          <h1> Marvel App</h1>
          {data.map((x, index) => {
            return (
              <div key={x._id}>
                <h2>{x.title}</h2>
                <img
                  src={x.thumbnail.path + "." + x.thumbnail.extension}
                  alt="visual description of the comics"
                />
                <p>{x.description}</p>
                <div
                  onClick={() => {
                    const newMovieObject = {
                      title: x.title,
                      image: x.thumbnail.path + "." + x.thumbnail.extension,
                      id: x._id,
                      description: x.description,
                    };

                    let emptyArr = [];
                    emptyArr = [...favComics];

                    emptyArr.push(newMovieObject);
                    setFavComics(emptyArr);
                  }}
                >
                  Add to favorites<span>⭐️</span>
                  {/* {favComics.title ? favComics.title : null} */}
                </div>
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

const Characters = ({ setCookie }) => {
  const [data, setData] = useState();
  //some state for react-ReactPaginate
  const [favCharacters, setFavCharacters] = useState([]);

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

  useEffect(() => {
    localStorage.setItem("favoriteCharacters", JSON.stringify(favCharacters));
  }, [favCharacters]);

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
                <h2>{x.name}</h2>
                <img
                  src={x.thumbnail.path + "." + x.thumbnail.extension}
                  alt=""
                />
                <p>{x.description}</p>
                <div onClick={() => history.push(`characters${x._id}`)}>
                  Click for more ✚
                </div>
                <div
                  onClick={() => {
                    let newObject = {
                      title: x.name,
                      image: x.thumbnail.path + "." + x.thumbnail.extension,
                    };
                    if (favCharacters.length === 0) {
                      let emptyArr = [];
                      emptyArr.push(newObject);
                      setFavCharacters(emptyArr);
                    } else {
                      let emptyArr = [...favCharacters];
                      emptyArr.push(newObject);
                      setFavCharacters(emptyArr);
                    }
                  }}
                >
                  Add to favorites<span>⭐️</span>
                </div>
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
  const [cookie, setCookie] = useState(Cookies.get("marvel"));
  return (
    <Router>
      <MenuBar />
      <div>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/characters">
            <Characters setCookie={setCookie} cookies={cookie} />
          </Route>
          <Route path="/comics">
            <Comics setCookie={setCookie} cookies={cookie} />
          </Route>
          <Route path="/characters:id">
            <CardCharacter />
          </Route>
          <Route path="/favorites">
            <Favorites cookies={cookie} setCookie={setCookie} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
