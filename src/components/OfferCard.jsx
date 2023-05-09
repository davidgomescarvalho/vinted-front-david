import { Link } from "react-router-dom";

const OfferCard = ({ offerData }) => {
  const { owner, product_image, product_price, product_details } = offerData;

  return (
    <Link className="decoRemove" to={`/offer/${offerData._id}`}>
      <article>
        <div className="productInfo">
          {owner.account.avatar && (
            <img src={owner.account.avatar.secure_url} alt="avatar" />
          )}
          <span>{owner.account.username}</span>
        </div>
        <img
          className="productPhoto"
          src={product_image.secure_url}
          alt="productPhoto"
        />
        <p>{product_price} €</p>
        <div>
          {product_details.reverse().map((detail, index) => {
            console.log(detail);

            if (detail.MARQUE) {
              return <p key={index}>{detail.MARQUE}</p>;
            } else if (detail.TAILLE) {
              return <p key={index}>{detail.TAILLE}</p>;
            } else {
              return null;
            }
          })}
        </div>
      </article>
    </Link>
  );
};

export default OfferCard;
