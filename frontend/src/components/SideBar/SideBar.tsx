import useAuth from "../../hooks/useAuth";
import Links, { LinkComp } from "./Links";
import "./sideBar.scss";
import { logoutIcon, loginIcon } from "../../assets/icons";
import logoImg from "../../assets/images/logo.png";

export default function SideBar() {
  const { user, logout } = useAuth();
  return (
    <div className="container">
      <div className="content">
        <div>
          <LinkComp name="Holat's Place" linkUrl="/" iconUrl={logoImg} />
        </div>
        <Links isAdmin={user?.isAdmin} />
      </div>
      <div>
        {user ? (
          <button onClick={() => logout("n")} className="link">
            <img src={logoutIcon} alt="logout" />
          </button>
        ) : (
          <LinkComp name="Login" linkUrl="/login" iconUrl={loginIcon} />
        )}
      </div>
    </div>
  );
}
