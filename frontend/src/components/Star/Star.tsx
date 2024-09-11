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
        ? "star-full"
        : stars >= halfNumber
        ? "star-half"
        : "star-empty";

    return (
      <img
        key={number}
        src={`/${starType}.svg`}
        alt={starType}
        style={styles}
      />
    );
  };

  return <div className="stars">{[1, 2, 3, 4, 5].map(renderStar)}</div>;
};

export default StarRating;
