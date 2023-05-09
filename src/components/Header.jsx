import "../components/header.css";
import logo from "../assets/logo.png";

import { Link } from "react-router-dom";

const Header = ({ handleToken, token, search, setSearch }) => {
  return (
    <header className="header-container">
      <div>
        <Link to={"/"}>
          <img src={logo} alt="Logo vinted" />
        </Link>
      </div>
      <div className="searchContainer">
        <input
          className="searchBar"
          type="text"
          placeholder="Rechercher des articles"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />

        <div>
          <h1>Trier par prix</h1>
        </div>
      </div>
      <div>
        {" "}
        {token ? (
          <div className="searchContainer">
            <button
              className="logout"
              onClick={() => {
                handleToken(null);
              }}
            >
              Déconnexion
            </button>
            <button className="vendre">Vendre des articles</button>
          </div>
        ) : (
          <div>
            <Link to="/signup">
              <button>S'inscrire</button>
            </Link>
            <Link to="/login">
              <button>Se connecter</button>
            </Link>

            {token ? (
              <Link to={"/publish"}>
                <button className="vendsButton">Vends tes articles</button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button className="vendsButton">Vends tes articles</button>
              </Link>
            )}
            <Link to={"/publish"}></Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
