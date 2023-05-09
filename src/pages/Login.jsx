import "./signup.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  return (
    <div className="signup1">
      <h2>Se connecter</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/user/login",
              { email: email, password: password }
            );
            if (response.data.token) {
              handleToken(response.data.token);
              navigate("/");
            }
          } catch (error) {
            console.log(error.message);
            console.log(error.response.data);
            if (error.response.status === 401) {
              if (error.response.data.message === "Unauthorized") {
                console.log(error.response.data.message);
                setErrorMessage("Email ou mot de passe incorrect");
              } else if (error.response.data.message === "User not found") {
                console.log(error.response.data.message);
                setErrorMessage("Utilisateur introuvable");
              } else {
                console.log(error.response.data.message);
                setErrorMessage(
                  "Une erreur s'est produite. Veuillez réessayer."
                );
              }
            } else {
              console.log(error.response.data.message);
              setErrorMessage("Adresse mail ou mot de passe incorrects");
            }
          }
        }}
      >
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
      {errorMessage && (
        <p style={{ color: "red", fontSize: 14, marginTop: 15 }}>
          {errorMessage}
        </p>
      )}
      <Link to="/signup">
        {" "}
        <div className="texte">Pas encore de compte ? Inscris-toi !</div>{" "}
      </Link>
    </div>
  );
};

export default Login;
