import useCart from "../../hooks/useCart";
import { LinkType } from "../../types/types";
import { Link, useLocation } from "react-router-dom";
import {
  homeIcon,
  profileIcon,
  cartIcon,
  orderIcon,
  adminIcon,
} from "../../assets/icons";

const links = [
  {
    name: "Home",
    linkUrl: "/",
    iconUrl: homeIcon,
  },
  {
    name: "Profile",
    linkUrl: "/profile",
    iconUrl: profileIcon,
  },
  {
    name: "Cart",
    linkUrl: "/cart",
    iconUrl: cartIcon,
  },
  {
    name: "Orders",
    linkUrl: "/orders",
    iconUrl: orderIcon,
  },
];

export default function Links({ isAdmin }: { isAdmin?: boolean }) {
  const location = useLocation();
  const { cart } = useCart();

  return (
    <div className="links">
      {links.map(({ name, linkUrl, iconUrl }) => {
        const item =
          linkUrl === "/cart" && cart.totalCount !== 0 ? cart.totalCount : null;
        const currentPath = location.pathname === linkUrl;

        return (
          <LinkComp
            key={linkUrl + iconUrl + name}
            name={name}
            linkUrl={linkUrl}
            iconUrl={iconUrl}
            items={item}
            currentPath={currentPath}
          />
        );
      })}
      {isAdmin && (
        <LinkComp
          name="Admin"
          linkUrl="/admin"
          iconUrl={adminIcon}
          currentPath={location.pathname === "/admin"}
        />
      )}
    </div>
  );
}

export function LinkComp({
  name,
  linkUrl,
  iconUrl,
  items,
  currentPath,
}: LinkType) {
  return (
    <Link
      to={linkUrl}
      className={`link ${currentPath ? "active" : ""}`}
      title={name}
    >
      {/* <p>{name}</p> */}
      {items && <div className="item">{items}</div>}
      <img src={iconUrl} alt={name} />
    </Link>
  );
}
