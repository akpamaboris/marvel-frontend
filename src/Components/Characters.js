import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Characters = () => {
  const [data, setData] = useState();
  //some state for react-ReactPaginate
  const [favCharacters, setFavCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState();

  // _--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  let history = useHistory();

  // _--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--
  //auto search
  // _--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--
  const [searchState, setSearchState] = useState(false);

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
    if (localStorage.getItem("favoriteCharacters") === null) {
      localStorage.setItem("favoriteCharacters", JSON.stringify(favCharacters));
    } else {
      let favStoredCharacters = JSON.parse(
        localStorage.getItem("favoriteCharacters")
      );

      let copy = [];

      for (let i = 0; i < favStoredCharacters.length; i++) {
        copy.push(favStoredCharacters[i]);
      }
      for (let i = 0; i < favCharacters.length; i++) {
        copy.push(favCharacters[i]);
      }
      const seen = new Set();
      let o = copy.filter((el) => {
        const duplicate = seen.has(el.title);
        seen.add(el.title);
        return !duplicate;
      });

      localStorage.setItem("favoriteCharacters", JSON.stringify(o));
    }
  }, [favCharacters]);

  return (
    <div>
      {isLoading ? (
        <span>is loading</span>
      ) : (
        <div>
          <input
            className="searchInputCharacter"
            placeholder="type to search"
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              let newArr = [];
              for (let x = 0; x < data.length; x++) {
                if (data[x].name.toLowerCase().includes(search.toLowerCase())) {
                  newArr.push(data[x]);
                }
              }
              setDataSearch(newArr);
            }}
            onClick={() => {
              setSearchState(!searchState);
            }}
          />
          {searchState && dataSearch ? (
            <div className="suggestionSearchInputCharacter">
              {dataSearch.map((x, index) => {
                return (
                  <div
                    onClick={() => {
                      setSearch(x.name);
                    }}
                  >
                    {x.name}
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <br />
              <span className="suggestionSearchInputCharacter">
                Une fois ta recherche lancée, Clique dans la barre de recherche
                pour afficher / Cacher les suggestions
              </span>
            </>
          )}
          <h1 className="titleCharacters"> Marvel App</h1>

          {search.length > 0 ? (
            <>
              {dataSearch.map((x, index) => {
                return (
                  <div key={x._id} className="characterPagePresent">
                    <h2 className="titleCharacter">{x.name}</h2>
                    <img
                      src={x.thumbnail.path + "." + x.thumbnail.extension}
                      alt=""
                    />
                    <p className="titleCharacter">{x.description}</p>
                    <div onClick={() => history.push(`characters${x._id}`)}>
                      <span className="titleCharacter">Click for more ✚</span>
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
                      <span className="titleCharacter">
                        Add to favorites<span>⭐️</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {data.map((x, index) => {
                return (
                  <div key={x._id} className="characterPagePresent">
                    <h2 className="titleCharacter">{x.name}</h2>
                    <img
                      src={x.thumbnail.path + "." + x.thumbnail.extension}
                      alt=""
                    />
                    <p className="titleCharacter">{x.description}</p>
                    <div onClick={() => history.push(`characters${x._id}`)}>
                      <span className="titleCharacter">Click for more ✚</span>
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
                      <span className="titleCharacter">
                        Add to favorites<span>⭐️</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {search.length > 0 ? null : (
            <>
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Characters;
