import { Link } from "react-router-dom";
import Title from "../Title/Title";
import "./notFound.scss";
import { notFoundIcon } from "../../assets/icons";

export default function NotFound({
  title,
  showBtn,
}: {
  title: string;
  showBtn?: boolean;
}) {
  return (
    <div className="notFoundCont">
      <Title title={title} fontWeight={500} fontSize="20px" />
      <img src={ notFoundIcon } alt="notFound" />
      <Link style={{ display: showBtn ? "" : "none" }} to={"/"}>
        Go Back To HomePage
      </Link>
    </div>
  );
}
