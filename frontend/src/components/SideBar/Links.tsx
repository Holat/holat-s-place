import useCart from "../../hooks/useCart";
import { LinkType } from "../../types/types";
import { Link, useLocation } from "react-router-dom";

const links = [
  {
    name: "Home",
    linkUrl: "/",
    iconUrl: "/icons/home.svg",
  },
  {
    name: "Profile",
    linkUrl: "/profile",
    iconUrl: "/icons/profile.svg",
  },
  {
    name: "Cart",
    linkUrl: "/cart",
    iconUrl: "/icons/cart.svg",
  },
  {
    name: "Orders",
    linkUrl: "/orders",
    iconUrl: "/icons/order.svg",
  },
  {
    name: "Admin",
    linkUrl: "/admin",
    iconUrl: "/icons/admin.svg",
  },
];

export default function Links() {
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
  // console.log(current);
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
