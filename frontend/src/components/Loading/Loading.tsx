import { Grid } from "react-loader-spinner";
import "./loading.scss";
import useLoading from "../../hooks/useLoading";

const Loading = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return;

  return (
    <div className="loadingCont">
      <div className="items">
        <Grid
          visible={true}
          height="80"
          width="80"
          color="#FA6400"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperClass="grid-wrapper"
        />
      </div>
    </div>
  );
};

export default Loading;
