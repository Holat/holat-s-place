import Links, { LinkComp } from "./Links";
import "./sideBar.scss";

export default function SideBar() {
  return (
    <div className="container">
      <div className="content">
        <div>
          <LinkComp name="Holat's Place" linkUrl="/" iconUrl="/logo.png" />
        </div>
        <Links />
      </div>
      <div>
        <LinkComp name="Login" linkUrl="/login" iconUrl="/icons/login.svg" />
      </div>
    </div>
  );
}
