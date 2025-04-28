
import Logo from "./Logo";
import Menu from "./Menu";
import "./Navbar.css";
export default function Navbar() {
  return (
    <nav className="navbar-container">
      <Logo />
      <Menu />
    </nav>
  );
}
