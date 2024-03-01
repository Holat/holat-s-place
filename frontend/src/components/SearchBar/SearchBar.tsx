import Title from "../Title/Title";
import "./searchBar.scss";
import { TagTypes } from "../../types/types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";

export default function SearchBar({
  tags,
  toggleOrderBar,
}: {
  tags?: TagTypes[];
  toggleOrderBar: () => void;
}) {
  const { tag: currentTag, searchTerm } = useParams();
  const [inputSearchTerm, setInputSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { totalCount } = useCart().cart;

  useEffect(() => {
    setInputSearchTerm(searchTerm ?? "");
  }, [searchTerm]);

  const search = async () => {
    inputSearchTerm ? navigate("/search/" + inputSearchTerm) : navigate("/");
  };

  return (
    <div className="header">
      <div className="searchContainer">
        <div className="filterCont">
          <div className="inputCont">
            <img src="/icons/lens.svg" alt="search" />
            <input
              value={inputSearchTerm}
              type="text"
              placeholder="What would you like to eat"
              onChange={(e) => setInputSearchTerm(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && search()}
            />
            <button onClick={search}>
              <p className="dtxt">Search</p>
              <img src="/icons/lens.svg" alt="search" />
            </button>
          </div>
          <button
            type="button"
            className="filter"
            style={{
              display: tags ? "block" : "none",
            }}
          >
            <img src="/icons/filter.svg" alt="filter" />
            <div className="tags">
              {tags?.map((tag) => (
                <Link
                  key={tag.name}
                  to={`/tag/${tag.name}`}
                  style={{
                    border:
                      tag.name === currentTag ? "1px solid #FA6400" : "none",
                    backgroundColor: tag.name === currentTag ? "#ffe9d9" : "",
                  }}
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </button>
        </div>
        <div className="profile">
          <Title
            title={`${user ? user.name : "Hello!"}`}
            fontSize="20px"
            fontWeight={600}
          />
          <div className="img">
            <img src="/icon.jpeg" alt="profile picture" />
          </div>
          <div className="cart">
            <button onClick={toggleOrderBar} id="pctbtn">
              {totalCount > 0 && (
                <div className="item">
                  <p>{totalCount}</p>
                </div>
              )}
              <img src="/icons/cart.svg" alt="cart" />
            </button>
            <button onClick={() => navigate("/cart")} id="mpbtn">
              {totalCount > 0 && (
                <div className="item">
                  <p>{totalCount}</p>
                </div>
              )}
              <img src="/icons/cart.svg" alt="cart" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
