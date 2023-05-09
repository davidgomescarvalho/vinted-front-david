import "./offer.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // console.log(params.id);
  // Je récupère l'id présent dans l'url
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <section className="productInfo">
      <div className="offer-container">
        {/* left side */}
        <div>
          <img
            className="productPic"
            src={data.product_image.secure_url}
            alt=""
          />
        </div>
        {/* right side */}
        <div className="productDetailsSide">
          <div>
            <p className="priceProduct">{data.product_price} €</p>
          </div>
          <div className="allInformation">
            {data.product_details.map((detail, index) => {
              const keyName = Object.keys(detail)[0];
              return (
                <div key={index}>
                  <span>{keyName} : </span>
                  <span>{detail[keyName]}</span>
                </div>
              );
            })}
          </div>
          <div className="justProductInfo">
            <h2>{data.product_name}</h2>
            <p>{data.product_description}</p>
            <div className="userInformation">
              <img
                className="userAvatar"
                src={data.owner.account.avatar.secure_url}
                alt="avatar"
              />
              <p>{data.owner.account.username}</p>
            </div>
          </div>
          <button className="buyButton">Acheter</button>
        </div>
      </div>
    </section>
  );
};

export default Offer;
