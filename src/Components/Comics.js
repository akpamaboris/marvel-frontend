import { useState, useEffect } from "react";
import axios from "axios";

const Comics = ({ setCookie, cookies }) => {
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
    localStorage.setItem("favoriteComics", JSON.stringify(favComics));
  }, [favComics]);
  return (
    <div>
      {isLoading ? (
        <span>is loading</span>
      ) : (
        <div>
          <input
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
            <div>
              <h2>Ready to search</h2>
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
              <span>
                Une fois ta recherche lancée, Clique dans la barre de recherche
                pour afficher / Cacher les suggestions
              </span>
            </>
          )}
          <h1> Marvel App</h1>
          {search.length > 0 ? (
            <>
              {dataSearch.map((x, index) => {
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
            </>
          ) : (
            <>
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
