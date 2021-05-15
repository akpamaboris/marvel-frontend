import { useState, useEffect } from "react";
import axios from "axios";

const Comics = () => {
  const [data, setData] = useState();
  //some state for react-ReactPaginate

  // _--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [favComics, setFavComics] = useState([]);
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState();

  // _--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--
  //auto search
  // _--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--
  const [searchState, setSearchState] = useState(false);

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
    if (localStorage.getItem("favoriteComics") === null) {
      localStorage.setItem("favoriteComics", JSON.stringify(favComics));
    } else {
      console.log("adding a new comics to local storage");
      let favStoredComics = JSON.parse(localStorage.getItem("favoriteComics"));
      let copy = [];

      for (let i = 0; i < favStoredComics.length; i++) {
        copy.push(favStoredComics[i]);
      }

      for (let i = 0; i < favComics.length; i++) {
        copy.push(favComics[i]);
      }
      const seen = new Set();
      let o = copy.filter((el) => {
        const duplicate = seen.has(el.id);
        seen.add(el.id);
        return !duplicate;
      });
      localStorage.setItem("favoriteComics", JSON.stringify(o));
    }
  }, [favComics]);
  return (
    <div>
      {isLoading ? (
        <span>is loading</span>
      ) : (
        <div>
          <input
            className="searchInputCharacter"
            type="text"
            placeholder="Type to search "
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              let newArr = [];
              for (let x = 0; x < data.length; x++) {
                // console.log(data[x]);
                if (
                  data[x].title.toLowerCase().includes(search.toLowerCase())
                ) {
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
                      setSearch(x.title);
                    }}
                  >
                    {x.title}
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
                    <h2 className="titleCharacter">{x.title}</h2>
                    <img
                      src={x.thumbnail.path + "." + x.thumbnail.extension}
                      alt="visual description of the comics"
                    />
                    <p className="titleCharacter">{x.description}</p>
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
                    <h2 className="titleCharacter">{x.title}</h2>
                    <img
                      src={x.thumbnail.path + "." + x.thumbnail.extension}
                      alt="visual description of the comics"
                    />
                    <p className="titleCharacter">{x.description}</p>
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
              {currentPage === 474 ? (
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

export default Comics;
