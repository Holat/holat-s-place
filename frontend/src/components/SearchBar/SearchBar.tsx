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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setInputSearchTerm(searchTerm ?? "");
  }, [searchTerm]);

  const search = async () => {
    inputSearchTerm ? navigate("/search/" + inputSearchTerm) : navigate("/");
  };

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
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
            onClick={() => setIsOpen((prev) => !prev)}
            style={{
              display: tags ? "block" : "none",
            }}
          >
            <img src="/icons/filter.svg" alt="filter" />
            <div className={`tags ${isOpen ? "isOpen" : ""}`}>
              <div
                className="mClBtn"
                onClick={handleOpen}
                style={{
                  width: "100%",
                  textAlign: "start",
                  border: "none",
                  zIndex: 1009,
                }}
              >
                <p
                  style={{
                    padding: "4px",
                    backgroundColor: "#f0f0f0",
                    width: "50px",
                    textAlign: "center",
                    borderRadius: "4px",
                  }}
                >
                  Close
                </p>
              </div>
              {tags?.map((tag) => (
                <Link
                  key={tag.name}
                  to={`/tag/${tag.name}`}
                  style={{
                    border:
                      tag.name === currentTag ? "1px solid #FA6400" : "none",
                    backgroundColor: tag.name === currentTag ? "#ffe9d9" : "",
                  }}
                  onClick={handleOpen}
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
