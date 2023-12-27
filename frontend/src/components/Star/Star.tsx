const StarRating = ({ stars, size }: { stars: number; size: number }) => {
  const styles = {
    width: size + "px",
    height: size + "px",
    marginRight: size / 6 + "px",
  };

  function Star({ number }: { number: number }) {
    const halfNumber = number - 0.5;
    return stars >= number ? (
      <img src="/star-full.svg" alt={`${number}`} style={styles} />
    ) : stars >= halfNumber ? (
      <img src="/star-half.svg" alt={`${number}`} style={styles} />
    ) : (
      <img src="/star-empty.svg" alt={`${number}`} style={styles} />
    );
  }

  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((number) => (
        <Star number={number} key={number} />
      ))}
    </div>
  );
};

StarRating.defaultProps = {
  size: 18,
};

export default StarRating;
