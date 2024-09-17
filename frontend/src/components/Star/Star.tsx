import { starEmpty, starFull, starHalf } from "../../assets/icons";

const StarRating = ({ stars, size = 18 }: { stars: number; size?: number }) => {
  const styles = {
    width: size + "px",
    height: size + "px",
    marginRight: size / 6 + "px",
  };

  const renderStar = (number: number) => {
    const halfNumber = number - 0.5;
    const starType =
      stars >= number
        ? "full"
        : stars >= halfNumber
        ? "half"
        : "empty";

    
    const url = starType === "full" ? starFull : starType === "half" ? starHalf : starEmpty;
    return (
      <img
        key={number}
        src={url}
        alt={starType}
        style={styles}
      />
    );
  };

  return <div className="stars">{[1, 2, 3, 4, 5].map(renderStar)}</div>;
};

export default StarRating;
