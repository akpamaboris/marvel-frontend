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

export default Favorites;
