import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

export default CardCharacter;
