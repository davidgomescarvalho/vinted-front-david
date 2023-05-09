import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import "../pages/signup.css";

const Signup = ({ handleToken }) => {
  // States qui gèrent mes inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  //   State qui gère le message d'erreur
  const [errorMessage, setErrorMessage] = useState("");
  //   Permet de naviguer vers home
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <h2>S'inscrire</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          setErrorMessage("");
          try {
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/user/signup",
              {
                email: email,
                username: username,
                password: password,
                newsletter: newsletter,
              }
            );
            //   Si je reçois bien un token
            if (response.data.token) {
              // Je l'enregistre dans mon state et mes cookies
              handleToken(response.data.token);
              // Et je redirige vers Home
              navigate("/");
            }
          } catch (error) {
            if (error.response.status === 409) {
              setErrorMessage(
                "Cet email est déjà utilisé, veuillez en choisir un autre :)"
              );
            } else if (error.response.data.message === "Missing parameters") {
              setErrorMessage("Veuillez remplir tous les champs :)");
            }
          }
        }}
      >
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          value={username}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          //   value={password}
        />
        <div className="newsletter">
          <input
            id="newsletter"
            type="checkbox"
            onChange={() => {
              setNewsletter(!newsletter);
            }}
            checked={newsletter}
          />
          <label htmlFor="newsletter">S'inscrire à notre newsletter</label>
        </div>
        <button type="submit">S'inscrire </button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
    </div>
  );
};

export default Signup;
