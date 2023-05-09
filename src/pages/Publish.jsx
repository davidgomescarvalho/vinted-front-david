import "./publish.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Publish = ({ handleToken }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [brand, setBrand] = useState();
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [condition, setCondition] = useState();
  const [city, setCity] = useState();
  const [price, setPrice] = useState();

  const [picture, setPicture] = useState({});
  const [imgFromCloudinary, setImgFromCloudinary] = useState();

  //   const token = useState(Cookies.get("vintedToken"));
  const token = { handleToken };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setImgFromCloudinary(response.data.secure_url);
      //   console.log(response.data._id);
      navigate(`/offer/${response.data._id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="publish-main">
      <div className="publish-container">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmit}>
          <div className="file-select">
            <div className="file-select-sans">
              <div className="input-design">
                <label htmlFor="">+ Ajoute une photo</label>
                <input
                  type="file"
                  onChange={(event) => {
                    setPicture(event.target.files[0]);
                  }}
                />
              </div>
            </div>
          </div>

          {/* DIV TITRE ET DESCRIPTION */}

          <div className="text-input-area">
            <div className="text-input">
              <h4>Titre</h4>
              <input
                placeholder="Ex : Chemise Sézane verte"
                type="text"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>

            <div className="text-input">
              <h4>Décris ton article</h4>
              <textarea
                cols="30"
                rows="10"
                placeholder="ex: porté quelquefois, taille correctement"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>

          {/* DIV MARQUE, DETAILS ETC */}

          <div className="text-input-area">
            <div className="text-input">
              <label htmlFor="">Marque</label>
              <input
                placeholder="ex: Zara"
                type="text"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <label htmlFor="">Taille</label>
              <input
                placeholder="ex: L / 40 / 12"
                type="text"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <label htmlFor="">Couleur</label>
              <input
                placeholder="ex: Fushia"
                type="text"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <label htmlFor="">Etat</label>
              <input
                placeholder="Neuf avec étiquette"
                type="text"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <label htmlFor="">Lieu</label>
              <input
                placeholder="ex: Paris"
                type="text"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>

          {/* DIV PRIX */}

          <div className="text-input-area">
            <div className="text-input">
              <h4>Prix</h4>
              <div className="checkbox-area">
                <input
                  placeholder="0,00 €"
                  type="number"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
                <div className="checkbox-input">
                  <label htmlFor="echange" className="checkbox-design"></label>
                  <input
                    type="checkbox"
                    name="echange"
                    id="exchange"
                    value="false"
                  />
                  <span>Je suis intéressé(e) par les échanges</span>
                </div>
              </div>
            </div>
          </div>

          <input type="submit" value="Poster une offre" />
        </form>
        {imgFromCloudinary && <img src={imgFromCloudinary} alt="" />}
      </div>
    </div>
  );
};

export default Publish;
