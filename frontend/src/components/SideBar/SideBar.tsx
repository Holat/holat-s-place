import useAuth from "../../hooks/useAuth";
import Links, { LinkComp } from "./Links";
import "./sideBar.scss";

export default function SideBar() {
  const { user, logout } = useAuth();
  return (
    <div className="container">
      <div className="content">
        <div>
          <LinkComp name="Holat's Place" linkUrl="/" iconUrl="/logo.png" />
        </div>
        <Links />
      </div>
      <div>
        {user ? (
          <button onClick={() => logout()} className="link">
            <img src="/icons/logout.svg" alt="logout" />
          </button>
        ) : (
          <LinkComp name="Login" linkUrl="/login" iconUrl="/icons/login.svg" />
        )}
      </div>
    </div>
  );
}
