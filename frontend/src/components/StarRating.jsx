import { FaStar, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating = 0, reviews = 0 }) => {

  return (
    <div className="d-flex align-items-center">
      {[1,2,3,4,5].map((star) => (
        star <= rating
          ? <FaStar key={star} color="gold" size={20} />
          : <FaRegStar key={star} color="gold" size={20} />
      ))}

      <span className="ms-2">
        ({reviews} Reviews)
      </span>
    </div>

  );
};

export default StarRating;