import Cookies from "js-cookie";

const Logout = ({ userToken }) => {
  return (
    <div>
      <h1>Logout</h1>
      <button
        onClick={() => {
          Cookies.remove("marvelAuth");
        }}
      >
        Logout
      </button>

      {userToken ? (
        <span>
          <h1>Connected</h1>
        </span>
      ) : null}
    </div>
  );
};

export default Logout;
