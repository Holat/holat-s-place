import Title from "../Title/Title";
import "./searchBar.scss";
import { TagTypes } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SearchBar({ tags }: { tags: TagTypes[] }) {
  const { tag: currentTag, searchTerm } = useParams();
  const [inputSearchTerm, setInputSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setInputSearchTerm(searchTerm ?? "");
  }, [searchTerm]);

  const search = async () => {
    inputSearchTerm ? navigate("/search/" + inputSearchTerm) : navigate("/");
  };

  return (
    <div className="header">
      <div className="searchContainer">
        <div className="inputCont">
          <img src="/icons/lens.svg" alt="search" />
          <input
            value={inputSearchTerm}
            type="text"
            placeholder="What would you like to eat"
            onChange={(e) => setInputSearchTerm(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && search()}
          />
          <button onClick={search}>Search</button>
        </div>
        <div className="profile">
          <Title title="Holat" fontSize="20px" fontWeight={600} />
          <div className="img">
            <img src="/icon.jpeg" alt="profile picture" />
          </div>
        </div>
      </div>
      <div className="tags">
        {tags?.map((tag) => (
          <Link
            key={tag.name}
            to={`/tag/${tag.name}`}
            style={{
              border: tag.name === currentTag ? "1px solid #FA6400" : "none",
              backgroundColor: tag.name === currentTag ? "#ffe9d9" : "",
            }}
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
