import { useEffect, useState } from "react";
import axios from "axios";
import hero from "../assets/hero.jpg";
import tear from "../assets/tear.svg";

// Components
import OfferCard from "../components/OfferCard";

const Home = ({ search }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search]);
  // search est dans le tabelau de dépendance du useEffect, dès que search change de valeur, c'est à dire dès que j'écris dans l'input dans mon header, la requête est refaite avec un query contenant search.

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div>
      <section className="hero">
        <div>
          <img src={hero} alt="hero" />
          <img src={tear} alt="tear" />
        </div>
      </section>
      <main className="main">
        {/* <p>Nombre d'offres : {data.count}</p> */}
        {data.offers.map((offer) => {
          return <OfferCard key={offer._id} offerData={offer} />;
        })}
      </main>
      <p>Nombre d'offres : {data.count}</p>
    </div>
  );
};

export default Home;
